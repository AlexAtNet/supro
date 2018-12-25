'use strict';

function _up(f) {
  return function (...args) {
    return new Promise((resolve, reject) => {
      const values = [], errors = [];
      let count = args.length;
      const done = () =>  {
        if (--count > 0) return;
        if (errors.length > 0) {
          reject(errors);
        } else {
          f.apply(null, values).then(resolve, error => reject([error]));
        }
      };
      for (let i = 0; i < args.length; i++) {
        const idx = i;
        Promise.resolve(args[idx]).then(value => {
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

function up(...fns) {
  return fns.map(_up);
}

(exports || {}).up = up;
