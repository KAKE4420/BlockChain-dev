## BlockChain-dev
> personal block chain pro dev

### 开发工作流

#### 智能合约
>- **Metamask** 智能钱包
>- **Solidity** 语言开发
>- **Remix**平台调试

#### 编译部署
>- 编译工具  **solc**
>- 编译辅助 **fs-extra** 
>- 以太坊测试网络 **Rinkeby**
>- 部署工具 **Web3.js**和**truffle-hdwallet-provide**

#### 前端框架
>- **Node.js**
>- **React**框架
>- **Yarn** 包管理
>- **material-ui** UI库组件
>- **next** 路由管理

### 文件目录结构
```
.
├── components
│   ├── Header.js
|   ├── infoBlock.js
│   └── Layout.js
├── contracts
│   └── SportPlan.sol
├── libs
│   ├── getPageContext.js
│   ├── withRoot.js
│   ├── web3.js
│   ├── PlanList.js
│   └── SportPlan.js
├── pages
│   ├── projects.js
│   │   ├── create.js
│   │   └── detail.js
│   ├── _document.js
│   └── index.js
├── scripts
│   ├── compile.js
│   ├── deploy.js
│   └── sample.js
├── package.json
├── routes.js
├── server.js
└── yarn.lock
```
>- components : 存放React组件
>- contract : 存放合约sol文件
>- libs : 存放基本库文件
>- pages : 存放前端页面相关
>- scripts : 存放合约编译部署等脚本

### 运行方式
#### 环境要求
>- Node.js V10
>- Yarn V1.12.3
>- Chrome浏览器 V71.0
>- Chrome浏览器下的Metamask扩展插件
#### 运行流程
>- 克隆仓库至本地
>- 在项目文件夹BlockChian-dev根目录下打开命令行
>- 输入yarn安装依赖包（此过程如卡住，为网络问题导致）
>- npm run compile 编译合约
>- npm run deploy 部署合约
>- npm run dev 启动服务器
>- 浏览器访问 localhost:3000
