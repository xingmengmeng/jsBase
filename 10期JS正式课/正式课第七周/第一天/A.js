function sum() {
   /* [
        0:[1,2,3,4,5,6,7,8,len:8]
        len:1
    ]*/
    var total = null;
    [].forEach.call(arguments, function (item, index) {
        item = Number(item);
        !isNaN(item) ? total += item : null;
    });
    return total;
}
/*想要在B中调取A中的SUM,首先需要A中把SUM导出*/
module.exports = {
    sum: sum
};