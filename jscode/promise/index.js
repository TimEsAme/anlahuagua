// console.log(global);

const { rejects } = require("assert")
const { promisify } = require("util")

// function jojo(t) {
//     return new Promise(resolve => {
//         throw new Error('安拉花瓜')
//         setTimeout(() => {
//             resolve(t)
//         }, t)
//     })
// }



// jojo(500).then(t => {
//     console.log(t)
// }).catch(e => {
//     console.log(e);
// })

// [1, 2, 3].forEach((e => {
//     console.log(e);
// }))



// function myForeach(callback) {
//     for (let i = 0; i < this.length; i++) {
//         callback(this[i], i, this)
//     }
// }
// const arr = [1, 2, 3]
// Array.prototype.myForeach = myForeach
// arr.myForeach((i, e, a) => {
//     console.log(i, e, a);
// })



function delayCallBack(duration, callback) {
    setTimeout(() => {
        callback(null, duration)
    }, duration)
}


// delayCallBack(500, (_, duration) => {
//     console.log(duration);
// })


// const delay = promisify(delayCallBack);

// // console.log(delay);

// (async () => {
//     const res = await delay(500)
//     console.log(res);
// })()



// function jojo(n, resolve, reject) {
//     if (n >= 5) {
//         resolve(n)
//     } else {
//         reject(new Error('安拉花瓜'))
//     }
// }


// const num = Math.floor(Math.random() * 11)

// jojo(num, (n) => {
//     console.log(n);
// }, (err) => {
//     console.log(err);
// })

// function delay(duration) {
//     return new Promise(() => {
//         setTimeout(() => {
//             console.log(duration);
//         }, duration)
//     })
// }

// const p = delay(500)
// console.log(p);


// function delay(duration) {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             resolve(duration)
//         }, duration)
//     })
// }

// const p = delay(500).then((duration) => {
//     console.log(duration);
// }, (err) => {
//     console.log(err);
// })


// const a = Promise.reject()
// console.log(a);


// const jager = new Promise((resolve, rejects) => {
//     const num = Math.floor(Math.random() * 11)
//     if (num >= 5) {
//         console.log('成功了');
//         resolve(111)
//     }
//     else {
//         console.log('失败了');
//         rejects(222)
//     }
// })

// const mikasa = jager.then((data) => {
//     console.log('三笠', data);
//     return data
// }).catch((err) => {
//     console.log('阿克曼', err);
//     return err
// })


// console.log(jager);

// setTimeout(() => {
//     console.log(mikasa, 111111111);
// }, 1000)

// const a = new Promise((resolve, reject) => {
//     const n = 0
//     if (n > 0) {
//         resolve(n)
//     } else {
//         reject()
//     }
// })

// const b = a.then((data) => {
//     console.log(data);
// }).catch(() => {
//     console.log('安拉花瓜');
//     return new Error('安拉花瓜')
// })


// console.log(a);


// setTimeout(() => {
//     console.log('我是b:', b);
// }, 1000)