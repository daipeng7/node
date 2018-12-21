// child_process1
setInterval( () => {
    console.log( 'I am child process' );   
}, 10000 );

process.on( 'SIGINT', () => {
    console.log( 'child sigint' );
});