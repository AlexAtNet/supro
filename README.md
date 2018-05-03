# Super Promises: one level up

You know Promises, right? It is time to move to the next level. There are Super Promises!

What are Super Promises? It is simple. You know that functions can return Promises. But what if the function
accepts Promises and return Promise that resolved or rejected if one of the inputs rejects? No more async/await
and maximum throughput!

Showtime!

    // You may be used to:
    const data1 = async readData1();
    const data2 = async readData2();
    const result = async report(data1, data2);
    async fsp.writeFile('name', result);

    // now it is time for:
    writeFile('name', report(readData1(), readData2()));

    // All you need to do is:
    const [ readData1, readData2, report, writeFile ] =
      require('supro').up(readData1, readData2, report, fsp.writeFile);

Install supro as usual:

    npm i supro

And go!

One more example:

    function example() {
      const { up } = require('supro');
      const [ readFile ] = up(require('fs/promises').readFile);
      const print = value => value.then(v => console.log(v), r => console.log(r));

      print(readFile(
        Promise.resolve('index.js'),
        Promise.resolve({ encoding : 'utf8', flag : 'r' })));
    }
