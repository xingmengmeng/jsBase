/*A中已经同意我们调取SUM了,在B中我们把A模块导入即可*/
var a = require('./A');
function avg() {
    //arguments ->[1,2,3,4,5,6,7,8,len:8]
    var total = a.sum.apply(null, arguments);
    return (total / arguments.length).toFixed(2);
}
module.exports = {
    avg: avg
};
