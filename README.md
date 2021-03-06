=======
### 同步工具

自动 watch 多个目录的文件，与远程机器同步；

sync.json为配置文件：

可以配置多个path, 每个path下的src所指的文件夹内容会分发同步到对应的dst目录


#### 安装

```sh
cnpm install -g https://github.com/andy12530/nsyncer
```

### 使用

```sh
nsyncer start sync.json
```


# rsyncer

A continuous `rsync` runner to keep local and remote directories in sync.  It watches the source directory tree for any changes, and immediately invokes the specified rsync command.


## api

### command line `nsyncer(1)`

commands:

* `start` - Start rsyncer
  * accepts a file path argument to a config file

flags:

* `-s, --single` - Run rsync once, and exit
* `-e, --errexit` - Abort script on rsync error
* `-t, --test` - Print the rsync command(s) and exit

*example*

```sh
$ nsyncer start ./config.json --single
nsyncer: watch: /Users/jwerle/repos/node-rsyncer/tmp/src/ (watching:true)
nsyncer: sync complete
```

---

### rsyncer(config)

Accepts a configuration object

* `paths` - An array of objects, each with the following properties:
  * `src` - The source file or directory to watch.
  * `dst` - The destination file or directory to write to.
  * `disabled` - (optional) A boolean to indicate if this job should be ignored (Default `false`).
* `args` - (optional) An array of string arguments, that will be passed directly to `rsync`.  These will be the **default** set of args passed to **all** paths that do not have `args` defined.  If `args` is defined on both the path, and the top level, **only** the path's `args` will be used.

* `recursive` - A boolean whether to recursively sync paths. (Default: `false`)
* `delete` - A boolean whether delete extraneous files from destination dirs. (Default `false`)
* `cvsExclude` - A boolean whether auto-ignore files the same way CVS does. (Default: `false`)
* `links` - A boolean whether copy symlinks as symlinks (Default: `false`)

* `once` - A boolean indicating whether to run the rsync command only once. (Default: `false`)
* `test` - Print the rsync command(s) that would be executed and exit. (Default: `false`)

An example configuration file: [config.example.json](https://github.com/zivester/node-rsyncer/blob/master/config.example.json)


## contributors

* [zivester](https://github.com/zivester)
* [werle](https://github.com/jwerle)


## license

MIT
