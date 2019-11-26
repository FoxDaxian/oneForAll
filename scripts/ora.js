module.exports = function ora(prefix = 'executing') {
    let index = 0;

    const str = '▌▀▐▄';

    function animate() {
        process.stdout.clearLine();
        process.stdout.write(`\r${prefix}: ${str[index++ % str.length]} `);
    }
    animate();
    const timer = setInterval(animate, 120);
    return {
        stop() {
            clearInterval(timer);
            process.stdout.write('\r');
            process.stdout.clearLine();
        },
        update(newPrefix) {
            prefix = newPrefix;
        }
    };
};
