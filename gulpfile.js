var gulp = require('gulp'),
    fs = require("fs"),
    file = require('gulp-file'),
    runSequence = require('run-sequence'),
    uglify = require('gulp-uglify'),
    replace = require('gulp-replace');

var concat = require('gulp-concat');
var rename = require('gulp-rename');
var header = require('gulp-header');
var version = require('./package.json').version;

var headerComment = '/* AlloyLever v'+version+'\n'+
    ' * By AlloyTeam http://www.alloyteam.com/\n'+
    ' * Github: https://github.com/AlloyTeam/AlloyLever\n'+
    ' * MIT Licensed.\n' +
    ' */\n';

gulp.task('concat', function () {
    gulp.src([

        'dev/js/nuclear.js',
        'fix/intro.js',
        'dev/js/app.js',
        'dev/js/timing.js',
        'dev/component/alloy_lever/index.js',
        'fix/outro.js',
        'fix/init_alloylever.js'

    ])
        .pipe(concat('alloy_lever.js'))
        .pipe(gulp.dest('dist'))
        .pipe(uglify())
        .pipe(rename('alloy_lever.min.js'))
        .pipe(header(headerComment))
        .pipe(gulp.dest('dist'));
});

var componentFileArr=[];

gulp.task('readFile',function(callback) {
    walk("src/component", function (path) {
        var ext = getFileExt(path);
      //  if (ext === ".html" || ext === ".css") {
            componentFileArr.push(path);
       // }
    }, function () {
        var map=arrToObj(componentFileArr);
        console.log(map)
        for(var key in map){
            var paths=map[key];
            var i= 0,len=paths.length;
            var contentArr=[];
            for(;i<len;i++){
                var path=paths[i];
                if(getFileExt(path)===".js")continue;
                contentArr.push(fileContentToStr(fs.readFileSync(path, "utf8"),getFileExt(path)===".html",path));

            }

            contentArr.push(  fs.readFileSync("src/component/"+key+"/index.js", "utf8"));
            file("index.js", contentArr.join("") , { src: true })
                .pipe(gulp.dest('dev/component/'+key))

        }
        callback();
    })
})

gulp.task('copyHTML', function () {
    //.pipe(replace(/<script src="component\/(.*?)\/index.js"><\/script>/gm ,function(a,b,c){
    //    return '<script src="component\/'+b+'.js"><\/script>';
    //}))
    return gulp.src('src/*.html') .pipe(gulp.dest('dev'));
});

gulp.task('copyJS', function () {
    return gulp.src('src/js/**').pipe(gulp.dest('dev/js'));
});

gulp.task('fixUtil', function () {
    return gulp.src('fix/app.js').pipe(gulp.dest('dev/js'));
});

gulp.task('copyCss', function () {
    return gulp.src('src/css/*css').pipe(gulp.dest('dev/css'));
});

gulp.task('copyImg', function () {
    return gulp.src('src/img/**').pipe(gulp.dest('dev/img'));
});

//http://www.tuicool.com/articles/rQvUbu2
gulp.task('default',  function (taskDone) {
    runSequence(
        'readFile',
        'copyHTML',
        'copyJS',
        'fixUtil',
        'copyCss',
        'concat',
        'copyImg',
        taskDone
    );
});

function arrToObj(arr){
    var obj={};
    for(var i= 0,len=arr.length;i<len;i++){
        var item=arr[i];
        var key=item.split("/")[2];
        if(!obj[key]){
            obj[key]=[];
        }

        obj[key].push(item);

    }
    return obj;
}

function getFileExt(filename) {
    var index1 = filename.lastIndexOf(".")
    var index2 = filename.length;
    return filename.substring(index1, index2).toLowerCase();
}

function  fileContentToStr(r ,isTpl ,path) {
    var strVar =isTpl? "tpl":"css";
    var g = "";
    var arr = r.replace(/\r/g,"").split("\n");
    g += "App.componentRes['"+path.substring(4,path.length)+"'] =\n";
    var i = 0;
    for (; i < arr.length; i++) {
        var l = '';
        if (i === 0) {
            l += "'"
        };

        if (i === arr.length - 1) {
            l += arr[i] + "';\n\n";
        } else {
            l += arr[i] + "\\\n";
        }
        g += l;
    }
    return g;
}

function walk (path, handleFile, callback) {
    var len = 1,       // 文件|目录数，起始一个
        floor = 0;     // 第x个目录？

    function done () {
        // 完成任务, 运行回调函数
        if (--len === 0) {
            callback();
        }
    }

    function composeErr (err) {
        // 错误处理
        console.log('stat error');
        done();  // 以错误内容完成
    }

    function composeDir (path) {
        // 目录处理
        floor++;
        fs.readdir(path, function (err, files) {
            if (err) {
                console.log('read dir error');
                done();  // 目录完成
                return;
            }
            len += files.length;  // 子文件|子目录计数
            files.forEach(function (filename) {
                compose(path + '/' + filename);  // 子内容新的操作
            });
            done();  // 目录完成
        });
    }

    function composeFile (path) {
        // 文件处理
        handleFile(path, floor);
        done();  // 文件完成
    }

    function compose (path) {
        //同步
        fs.stat(path, function (err, stats) {
            if (err) {
                composeErr(err);
                return;
            }
            if (stats.isDirectory()) {
                composeDir(path);
                return;
            }
            composeFile(path);
        });
    }

    compose(path);
}