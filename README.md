### 同步工具

自动 watch 多个目录的文件，与远程机器同步；

sync.json为配置文件：

可以配置多个path, 每个path下的src所指的文件夹内容会分发同步到对应的dst目录


#### 安装

```sh
npm install -g rsyncer
```

### 使用

```sh
nsyncer start sync.json
```