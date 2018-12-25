# Super Promises: one level up

You know Promises, right? It is time to move to the next level.

Actually, it is simpler than you might think. You know that functions can return Promises. But what if a function
receives Promises intead of values? Well, then most of the asyncs in the code become redundant.

Example:

    // using async/await

    const fs = require('fs').promises,
      pkg = require('my-package');

    const data1 = async pkg.readData1(),
      data2 = async pkg.readData2();

    async fs.writeFile('name', async pkg.report(data1, data2));

    // Level-up the promises

    const fs = require('fs').promises,
      pkg = require('my-package');

    const [ readData1, readData2, report, writeFile ] =
      require('supro').up(pkg.readData1, pkg.readData2, pkg.report, fs.writeFile);

    async writeFile('name', report(readData1(), readData2()));

Install:

    npm i supro
