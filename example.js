const { up } = require('./index.js');

async function example() {
  const [readFile] = up(require('fs').promises.readFile);
  const print = value => value.then(v => console.log(v), r => console.log(r));

  const fileName = new Promise((res, _) =>
    setTimeout(() => res('example.js'), 1000 * Math.random()));

  const options = new Promise((res, _) =>
    setTimeout(() => res({ encoding: 'utf8', flag: 'r' }), 1000 * Math.random()));

  print(readFile(fileName, options));
}

example();