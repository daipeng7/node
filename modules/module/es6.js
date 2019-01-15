console.log( require.main.filename );

export let x = {
    a: 5
};
export let add = function(num) {
    x.a += num;
};

export let getX = function() {
    return x;
};