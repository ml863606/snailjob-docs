# JobExecutor注解

## JobExecutor注解全貌

| 参数                  | 描述      | 默认值                   | 必须指定 |
| --------------------- |---------| --------------------- |------|
| name                 | 执行器名称   | 无                     | ✅    |
| method               | 执行器方法名称 | jobExecute            | ✅      |

执行器名称: 指任务的标识，同一个客户端不能有想同的执行器名称
执行器方法名称: 执行任务的方法名称

## 通过使用注解的模式执行任务

> 注解作用于类上
```java
@Component
@JobExecutor(name = "testJobExecutor")
public class TestAnnoJobExecutor {

    public ExecuteResult jobExecute(JobArgs jobArgs) {
        return ExecuteResult.success("测试成功");
    }
}
```

> 注解作用于方法上
```java
@Component
public class TestAnnoJobExecutor {

    @JobExecutor(name = "testJobExecutor")
    public ExecuteResult jobExecute(JobArgs jobArgs) {
        return ExecuteResult.success("测试成功");
    }
}
```

注意: 注解模式的参数仅支持一个参数并且是JobArgs或者无参两种模式。

## 通过使用继承执行任务

```java
@Component
public class TestClassJobExecutor extends AbstractJobExecutor {

    @Override
    protected ExecuteResult doJobExecute(JobArgs jobArgs) {
        return ExecuteResult.success("TestJobExecutor测试成功");
    }
}
```