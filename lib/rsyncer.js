module.exports = function rsyncer(config) {
    var watchr = require('watchr'),
        gaze = require('gaze'),
        path = require('path'),
        exec = require('child_process').exec,
        paths = config.paths,
        args = config.args || [],
        EventEmitter = require('events').EventEmitter,
        emitter = new EventEmitter();


    if (config.recursive === true) args.push('-rt');
    if (config.delete === true) args.push('--delete');
    if (config.cvsExclude === true) args.push('-C');
    if (config.links === true) args.push('-l')

    var jobs = paths.map(function(p) {
        p.args = p.args || args;
        p.disabled = typeof p.disabled !== 'undefined' ? !!p.disabled : false;
        if (!p.src) throw new Error("src must exist");
        if (!p.dst) throw new Error("dst must exist");
        return p;
    });

    jobs.forEach(function(job, i) {
        var running = false,
            count = 0,
            pre = '[job ' + ++i + (job.disabled ? ' DISABLED' : '') + '] ',
            cmd = ['rsync'].concat(job.args, job.src, job.dst).join(' ');

        console.log(pre + cmd);

        // Don't run rsync if we're in test mode
        if (config.test || job.disabled) return;

        function go() {
            running = true;
            exec(cmd, function(err, stdout, stderr) {
                if (err) emitter.emit('error', err);
                emitter.emit('sync')
                running = false;
                if (count) {
                    count = 0;
                    go();
                }
            });
        }

        if (config.once === true) return go();

        var allFilesSrc = path.join(job.src, '**/**');
        gaze(allFilesSrc, function(err, watcher) {
            // Files have all started watching
            // watcher === this

            // On changed/added/deleted
            this.on('all', function(event, filepath) {
                console.log(event + ' :: ' + filepath);
                if (!running) {
                    go();
                } else {
                    count++;
                }
            });

            // Get watched files with relative paths
            this.relative(function(err, files) {
                console.log(files);
            });
        });

        go();
    });

    return emitter;
};