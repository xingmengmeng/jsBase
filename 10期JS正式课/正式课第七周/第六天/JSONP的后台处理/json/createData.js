/*造假数据*/
function ran(n, m) {
    return Math.round(Math.random() * (m - n) + n);
}
var str1 = '赵钱孙李周吴郑王冯陈褚卫蒋沈韩杨朱秦尤许何吕施张孔曹严华金魏陶江';//0~31

var ary = [];
for (var i = 1; i <= 90; i++) {
    var obj = {
        id: i,
        name: str1[ran(0, 31)],
        sex: ran(0, 1),
        score: ran(59, 99)
    };
    ary.push(obj);
}
var fs = require('fs');
fs.writeFileSync('./data.json', JSON.stringify(ary), 'utf-8');
