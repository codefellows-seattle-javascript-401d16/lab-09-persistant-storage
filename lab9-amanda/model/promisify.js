'use strict';

const fs = require('fs')

let promisify = (fn) => (...args) => {
  return new Promise((resolve, reject) => {
    fn(...args, (err, data) => {
      if(err) return reject(err)
      resolve(data)
    })
  })
}

let readFile = promisify(fs.readFile)
let writeFile = promisify(fs.writeFile)

readFile(`${__dirname}/index.js`)
.then(buf => {
  let upper = buf.toString().toUpperCase()
  return writeFile(`${__dirname}/output.txt`, upper)
})
.then(() => {
  console.log('success')
})
.catch(err => {
  console.log('err', err)
})
