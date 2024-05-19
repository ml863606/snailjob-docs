# 说说重试那些事

## Snail Job为解决什么样的问题而生?

### Snail Job和现有方案的对比
SnailJob上线至今,遇到最多的问题就是:这款框架和`SpringRetry`或者`GuavaRetry`有什么区别呢?
`SpringRetry`和`GuavaRetry`是由Spring和Google开发的重试框架，用于解决短期系统异常或网络抖动引起的问题。这两个框架均采用基于内存的重试策略。
相比之下，`Snail Job`是一种面向分布式系统数据一致性问题的解决方案，它以重试为核心，提供了一系列功能来处理异常数据和确保最终一致性。
SpringRetry和GuavaRetry确实无法提供数据最终一致性的保障。它们主要用于处理短期系统异常或网络抖动，尝试重新执行操作，但是在重试N次后异常仍为解决，可能会导致数据丢失。对于核心业务场景，数据丢失可能带来严重的问题。

<img src="/img/内存重试请求的缺陷.png">

### Snail Job的数据一致性解决方案
为了确保数据的完整性和一致性，目前比较好的解决方案是在系统中使用本地消息表来增加容错能力。这种解决方案的核心是将分布式事务转化为本地事务。以下是一个余额扣减和减积分的示例流程：
<img src="/img/本地消息表实现数据一致性.png">
在这个方案中，消息生产方会将消息发送到消息表中，并记录消息的发送状态。消息表通常与业务数据库在同一个事务中处理，即它们在同一数据操作中。然后，消息会通过消息队列（MQ）发送到消息的消费者。

如果消息发送失败，会进行重试发送，直到消息成功发送为止。消息的消费者需要处理这些消息，并完成相应的业务逻辑。如果本地事务处理成功，表示消息处理成功。如果处理失败，会进行重试执行，直到成功为止。

如果业务处理发生了故障，消息会持续重试，直到达到设定的重试次数上限。如果处理失败，系统会记录失败状态，以便后续手动处理。

这个消息表策略能够较好地确保数据的一致性。业务处理完成后，消费者会将处理结果发送回生产者，以确保业务数据的最终一致性。生产者和消费者会通过比对未处理消息表和业务日志来确认处理结果。

经过以上操作后，系统可以较好地保证数据一致性。然而，这种方案的缺点也很明显，首先它在数据库中增加了消息表，造成存储和I/O开销。其次，消息的重复发送和处理需要监控和管理，增加了系统复杂性。为了应对这些问题，需要对系统进行细致的设计和调整。

如果采用SnailJob来实现数据一致性方案,交互流程是这样子:

<img src="/img/采用SnailJob实现数据一致性.png">

在这个方案中，我们使用SnailJob来捕获和处理异常数据，将不同系统产生的异常数据集中到SnailJob的控制台进行配置和管理。通过SnailJob，我们可以自定义重试策略和触发时间。

当重试任务执行成功或达到系统配置的最大执行次数时，服务器会向客户端发送回调请求。在接收到回调请求后，客户端可以指定后续操作。

举例来说，当服务端发起重试且最大请求次数仍然失败时，客户端可以执行回滚操作，确保事务的完整性。通过灵活配置回调请求的处理方式，我们可以根据具体业务需求进行相应处理。

SnailJob框架通过简单接入，捕获分布式系统中的核心异常，并进行数据补偿，统一管理异常数据，降低开发成本。框架提供易用的控制台，支持数据回放、异常分析和重试限制。为防止重试风暴，SnailJob设计了多种防治手段，包括单机流量管控、跨集群链路管控和可视化数据管控。框架还提供丰富的SPI接口，允许用户自定义幂等ID、重试方法和回调结果，灵活配置以满足各种业务需求。
## 🌈一致性方案对比

## 🌈Snail Job框架的核心优势?
### 数据持久化
对于系统中核心场景的数据安全是非常重要的保障手段, 基于内存重试策略(目前业界比较比较出名的`SpringRetry`或者`GuavaRetry`都是基于内存重试实现的)数据的持久性得不到保障，
SnailJob提供了本地重试、服务端重试、本地重试和服务端重试相结合三种重试模式。
SnailJob的本地重试方案依然保留了内存重试的策略,应对短暂不可用场景下的快速补偿。服务端重试则实现了数据的持久化,支持多种数据库配置。用户可以通过控制台管理异常数据,自定义多种配置,便捷地完成数据补偿操作。

### 避免重试风暴
重试操作可以更加轻量化低成本的保障数据一致性,但是带来的风险也不容忽视，那就是重试风暴。
`SnailJob`支持多种方式防止重试风暴的产生比如单机流量管控、跨集群链接管控和可视化数据管控等
- 什么是单机流量管控?
  在重试过程中,如果重试控制不当,容易造成单机多注解循环引用问题。SnailJob对于重试流量做出了标识,单机的重试请求不会引发再次重试。

 <img src="/img/单机多注解循环引用问题.png">
  
- 什么是跨集群链接管控?
  在跨集群的多级链路场景中,SnailJob会标识重试流量,限制每层都发生重试。理想情况下,多级链路请求场景中只有最下一层发生重试。

<img src="/img/标识重试流量.png">
  
- 什么是可视化数据管控?
  SnailJob控制台给出了重试请求和回调请求的信息,包括触发时间、重试次数、错误日志等,用户可以通过控制台对每个重试请求做到实时查看和监控。

### 接入简单

`SnailJob`和`SpringRetry`一样的都是基于注解实现，只需要添加一个@Retryable即完成接入
### 配置多样化
SnailJob控制台提供了多样化的参数配置,包括路由策略、Id生成模式、分区指定、退避策略、最大重试次数、告警通知等。满足用户在不同场景下的配置需求。
### 可扩展性
SnailJob预留了大量自定义场景,如重试结果处理器、自定义方法执行器、幂等ID生成器等模块,为用户预留了可扩展空间,可根据系统需求满足不同场景下的使用需要。
## 参考阅读

[字节跳动: 如何优雅地重试](https://juejin.cn/post/6914091859463634951)

[这款分布式重试组件,治好了我的重试强迫症！](https://juejin.cn/post/7249607108043145274) 