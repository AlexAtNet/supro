'use strict';

function _up(f) {
  return function () {
    return new Promise((resolve, reject) => {
      const values = [];
      const errors = [];
      let count = arguments.length;
      const done = () =>  {
        if (--count > 0) return;
        if (errors.length > 0) {
          reject(errors);
        } else {
          f.apply(null, values).then(resolve, error => reject([error]));
        }
      };
      for (let i = 0; i < arguments.length; i++) {
        const idx = i;
        Promise.resolve(arguments[idx]).then(value => {
          values[idx] = value;
          done();
        }, reason => {
          errors.push(reason);
          done();
        });
      }
    });
  };
}

function up() {
  const result = [];
  for (let i = 0; i < arguments.length; i++)
    result.push(_up(arguments[i]));
  return result;
}

(exports || {}).up = up;

async function example() {
  const [ readFile ] = up(require('fs/promises').readFile);
  const print = value => value.then(v => console.log(v), r => console.log(r));

  print(readFile(
    Promise.resolve('index.js'),
    Promise.resolve({ encoding : 'utf8', flag : 'r' })));
}
