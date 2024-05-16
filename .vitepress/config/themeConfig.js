const nav = require('./nav.js');

const socialLinks = [

  { icon: "github", link: "https://github.com/aizuda/snail-job" },
  {
    icon: {
      svg: '<svg x="5" y="5" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="18" height="18"><path d="M512 1024C229.222 1024 0 794.778 0 512S229.222 0 512 0s512 229.222 512 512-229.222 512-512 512z m259.149-568.883h-290.74a25.293 25.293 0 0 0-25.292 25.293l-0.026 63.206c0 13.952 11.315 25.293 25.267 25.293h177.024c13.978 0 25.293 11.315 25.293 25.267v12.646a75.853 75.853 0 0 1-75.853 75.853h-240.23a25.293 25.293 0 0 1-25.267-25.293V417.203a75.853 75.853 0 0 1 75.827-75.853h353.946a25.293 25.293 0 0 0 25.267-25.292l0.077-63.207a25.293 25.293 0 0 0-25.268-25.293H417.152a189.62 189.62 0 0 0-189.62 189.645V771.15c0 13.977 11.316 25.293 25.294 25.293h372.94a170.65 170.65 0 0 0 170.65-170.65V480.384a25.293 25.293 0 0 0-25.293-25.267z" fill="#C71D23"></path></svg>',
    },
    link: "https://gitee.com/aizuda/snail-job",
  },
];

const sidebar = [
  {
    text: '介绍',
    collapsed: false,
    items: [
      { text: '系统简介', link: '/docs/introduce/profile' }
    ],
  },
  {
    text: '入门指南',
    collapsed: false,
    items: [
      { text: '🌼 项目简介', link: '/pages/v3.x/d1d1da/' },
      { text: '系统概念', link: '/pages/v3.x/97cde9/' },
      { text: '项目特性', link: '/pages/v3.x/540553/' },
      { text: '架构与功能', link: '/pages/v3.x/540554/' },
      { text: '服务部署', link: '/pages/v3.x/406a66/' },
      { text: '🍀 场景应用', link: '/pages/v3.x/406a68/' },
      { text: '💥 HelloWorld', link: '/pages/v3.x/da9ecc/' },
      { text: '🌺 测试案例', link: '/pages/v3.x/991407/' },
      { text: '🚀 性能指标', link: '/pages/v3.x/991410/' }
    ],
  },
  {
    text: '模型实例',
    collapsed: false,
    items: [
      { text: '实例监听', link: '/docs/instanceListener' },
      { text: '模型解析器', link: '/docs/modelParser' },
      { text: '模型缓存', link: '/docs/modelCache' },
      { text: '数据传输', link: '/docs/dataTransfer' },
    ],
  },
  {
    text: '工作任务',
    collapsed: false,
    items: [
      { text: '监听', link: '/docs/taskListener' },
      { text: '触发器', link: '/docs/taskTrigger' },
      { text: '提醒', link: '/docs/taskReminder' },
      { text: '创建拦截器', link: '/docs/taskCreateInterceptor' },
      { text: '访问策略', link: '/docs/taskAccessStrategy' },
      { text: '参与者', link: '/docs/taskActorProvider' },
    ],
  },
  {
    text: '基本操作',
    collapsed: false,
    items: [
      { text: '部署流程', link: '/docs/operation/deploy' },
      { text: '发起流程', link: '/docs/operation/launch' },
      { text: '流程服务', link: '/docs/operation/service' },
    ],
  },
  // {
  //   text: '进阶玩法',
  //   collapsed: false,
  //   items: [
  //     { text: 'Markdown', link: '/markdown' },
  //     { text: '团队', link: '/team' },
  //     { text: '静态部署', link: '/assets' },
  //   ],
  // },
  {
    text: '其他站点',
    collapsed: false,
    items: [
      { text: '成为赞助商', link: '/docs/sponsor' },
      { text: '捐赠😍支持', link: '/docs/support' },
      { text: '友情链接', link: '/docs/links' },
    ],
  },
];

// Theme Config
module.exports = {
  siteTitle: 'Snail Job',
  logo: '/logo.svg',
  search: {
    provider: "algolia",
    options: {
      appId: "...",
      apiKey: "...",
      indexName: "...",
    },
  },
  nav,

  outline: {
    level: 'deep', // 右侧大纲标题层级
    label: '目录', // 右侧大纲标题文本配置
  },
  darkModeSwitchLabel: '切换亮色/暗黑模式',
  sidebarMenuLabel: '文章',
  returnToTopLabel: '返回顶部',
  lastUpdatedText: '最后更新',
  author: { // 文章默认的作者信息，可在md文件中单独配置此信息 String | {name: String, href: String}
    name: '奋斗小蜗牛', // 必需
    href: 'https://github.com/opensnail' // 可选的
  },
  editLink: {
    pattern: 'https://gitee.com/aizuda/snailjob-docs',
    text: 'Edit this page on Gitee',
  },
  lastUpdated: {
    text: "最后更新",
    formatOptions: {
      dateStyle: "full",
      timeStyle: "medium",
    },
  },
  docFooter: {
    prev: '上一篇',
    next: '下一篇'
  },
  cleanUrls: true,
  ignoreDeadLinks: true,
  socialLinks,
  sidebar,
  footer: { // 页脚信息
    createYear: 2022, // 博客创建年份
    copyright: [
      '<a href="http://aizuda.com/" target="_blank" style="font-weight:bold">Team Aizudai</a>',
      ' | ',
      '<a href="http://beian.miit.gov.cn/" target=_blank>皖ICP备16014822号-4</a>',
      '</p>',
    ].join('')
  }
}

