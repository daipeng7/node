console.log( require.main.filename );

var x = {
    a: 5
};
var add = function(num) {
    x.a += num;
};

var getX = function() {
    return x;
};

module.exports.x = x;
module.exports.add = add;
module.exports.getX = getX;