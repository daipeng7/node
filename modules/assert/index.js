/*
 * @Author: daipeng
 * @Date: 2019-08-29 17:48:54
 * @LastEditors: VSCode
 * @LastEditTime: 2019-08-29 17:56:29
 * @Description: 
 */
const assert = require('assert').strict;

function foo() {
    console.log(1);
    assert.equal({a: 1}, {a: 1}, 'dd');
    console.log(2);
}

foo();