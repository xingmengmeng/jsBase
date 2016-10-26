var fs = require('fs');
//->fs.readFileSync([pathname],[encoding]):同步读取某一个文件中的内容,读取出来的内容是一个字符串
//console.log(fs.readFileSync('./index.html', 'utf-8'));

//->fs.writeFileSync([pathname],[content],[encoding]):向某一个文件中同步写入内容，写入的内容应该是字符串格式的(每一次的写入都是覆盖之前的内容)
fs.writeFileSync('./temp.txt', 'hello world!', 'utf-8');


/*
 Sync:同步
 Async:异步
 */