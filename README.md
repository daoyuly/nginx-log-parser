# nginx-log-parser

## 概述
- umu前端使用nginx日志的方式监控js报错报警信息，因此产生了大量的错误日志信息。本项目的目的就是为了在这些日志数据中挖掘有价值的信息，比如哪些是新产生的错误，哪些是已知问题。

- 目前最主要的功能是在这些日志信息中筛选出线上bug

- 设计思路
    1. nginx日志经过格式化，转换成结构化的数据
    2. 将结构化的log数据，转存到mongodb
    3. 以mongodb为数据源，挖掘有价值数据

## 用法
1. 下载日志数据,并转存 

  ```
     node index.js
```
    

2. 使用mongodb工具分析数据

3. [ua parser](https://github.com/daoyuly/ua-parser-js)

## 后续计划

1. 分析算法
2. 可视化显示
3. 自动通知



