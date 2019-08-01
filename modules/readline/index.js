/**
 * readline 逐行读取，是对流的操作
 *      使用场景：
 *          1、文件逐行读取：如读取日志
 *          2、自动完成：比如输入npm，自动提示"help init install"
 *          3、命令行工具：比如npm init这种问答式的脚手架工具。
*/

const readline = require('readline');

/**
 * Interface 类,readline的主要继承类，使用readline.createInterface(options)创建一个readline.Interface类
 * options <Object>
    input <stream.Readable> 要监听的可读流。该选项是必需的。
    output <stream.Writable> 要写入逐行读取数据的可写流。
    completer <Function> 一个可选的函数，用于 Tab 自动补全。
    terminal <boolean> 如果 input 和 output 应被当作一个 TTY，且要写入 ANSI/VT100 转换的代码，则设为 true。 默认为实例化时在 output 流上检查 isTTY。
    historySize <number> 保留的历史行数的最大数量。 设为 0 可禁用历史记录。 该选项只有当 terminal 被用户或内部 output 设为 true 时才有意义，否则历史缓存机制不会被初始化。 默认为 30。
    prompt - 要使用的提示字符串。默认为 '> '。
    crlfDelay <number> 如果 \r 与 \n 之间的延迟超过 crlfDelay 毫秒，则 \r 和 \n 都会被当作换行分隔符。 crlfDelay 强制设置为不少于 100. 可以设置为 Infinity, 这种情况下， \r 跟着 \n 会被视为单个新行(也许对带有\r\n分隔符的[reading files][]来说是非常合理的)。 默认为 100 毫秒。
    removeHistoryDuplicates <boolean> 如果为 true, 当新输入行与历史列表中的某行相同时， 那么移除旧有的行。 默认为 false。
*/
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: '请输入> '
});

rl.prompt();

/**
 * events 事件
 *      1、close 关闭事件，rl.close()触发、input流接收到 'end' 事件，结束传输<ctrl>-D，表示SIGINT的<ctrl>-C
 *      2、line 读取事件， 每当 input 流接收到接收行结束符（\n、\r 或 \r\n）时触发 'line' 事件。 通常发生在用户按下 <Enter> 键或 <Return> 键
 *      3、pause 暂停事件， input 流被暂停，input 流不是暂停的，且接收到 SIGCONT 事件
 *      4、resume 恢复暂停事件， 每当 input 流被恢复时触发 'resume' 事件
 *      5、SIGCONT 事件， 当一个 Node.js 进程使用 <ctrl>-Z（也就是 SIGTSTP）移入后台之后再使用 fg(1p) 移回前台时，触发 'SIGCONT' 事件, 如果 input 流在 SIGTSTP 请求之前被暂停，则事件不会被触发
 *      6、SIGINT 事件，每当 input 流接收到一个 <ctrl>-C 输入（通常被称为 SIGINT）时,触发 'SIGINT' 事件。 当 input 流接收到一个 SIGINT 时，如果没有注册 'SIGINT' 事件监听器，则 'pause' 事件会被触发。
 *      7、SIGTSTP 事件，每当 input 流接收到一个 <ctrl>-Z 输入（通常被称为 SIGTSTP）时，触发 'SIGTSTP' 事件。 当 input 流接收到一个 SIGTSTP 时，如果没有注册 'SIGTSTP' 事件监听器，则 Node.js 进程会被发送到后台。
*/

rl.on('close', () => {
    console.log(`Readline结束了`);
    process.exit(0);
});

rl.on('line', (input) => {
    if(input) console.log(`接收到：${input}`);
    rl.prompt();
});

rl.on('pause', () => {
    console.log('Readline 被暂停。');
});

rl.on('resume', () => {
    console.log('Readline 被恢复。');
});

rl.on('SIGINT', () => {
    rl.question('确定退出吗？(yes/no) ', (answer) => {
        if (answer.match(/^y(es)?$/i)) rl.close();
    })
});

rl.on('SIGCONT', () => {
    // `prompt` 会自动恢复流
    rl.prompt();
});

rl.on('SIGTSTP', () => {
    // 这会重写 SIGTSTP，且防止程序进入后台。
    console.log('捕获 SIGTSTP。');
});

/**
 * methods 方法
 *      rl.close()	关闭readline.Interface实例，且撤回对 input 和 output 流的控制。 但被调用时，'close' 事件会被触发
 *      rl.pause()  rl.pause() 方法会暂停 input 流，且稍后需要时可被恢复。
*/