'use strict';

let add = (a, b) => {
  return new Promise((resolve, reject) => {
    if(typeof a === 'number' && typeof b === 'number') {
      resolve(a + b);
      return;
    }
    reject(new Error('must provide number arguments'))
  })
}

add(34, 2)
.then(result => {
  console.log('result', result)
  return JSON.parse('{')
})
.then(result => {
  console.log('result', result)
  return add(3, 5)
})
.catch(err => {
  console.log('err', err);
})
.then(result => {
  throw 'hello'
  console.log('result', result);
})
.then(result => {
  console.log('result', result);
});
.catch(err => {
})

Promise.reject([1,2])
.then(result => {
  return [...result, 45, 66, 77]
})
.then(nums => {
  console.log('nums', nums)
  throw 89
})
.then(nums => {
  console.log(nums);
})
.catch(err => {
  console.log('result', reslult)
})
