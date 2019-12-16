// 自定义Promise

const PENDING = 'pending';
const FULFIlLED = 'fulfilled';
const REJECTED = 'rejected';

function MyPromise(executer){
    let self = this;
    self.value = null;
    self.error = null;
    self.status = PENDING;
    self.onFulfilledCallbacks = [];
    self.onRejectedCallbacks = [];

    const resolve = (value) => {
        if(self.status !== PENDING) return;
        setTimeout(() => {
            self.status = FULFIlLED;
            self.value = value;
            self.onFulfilledCallbacks.forEach(onFulfilled => {
                onFulfilled(value);
            })
        })
    }

    const rejected = (error) => {
        if(self.status !== PENDING) return;
        setTimeout(() => {
            self.status = REJECTED;
            self.error = error;
            self.onRejectedCallbacks.forEach(onRejected => {
                onRejected(error);
            })
        })
    }

    executer(resolve,rejected)
}

// 处理then函数返回值，（主要处理返回值为MyPromise时）
function handleResolve(bridgePromise,x,resolve,rejected) {
    if(x instanceof MyPromise) {
        if(x.status === PENDING) {
            x.then(y => {
                // 循环调用，知道x不为MyPromise为止
                handleResolve(bridgePromise,y,resolve,rejected)
            },error => {
                rejected(error)
            })
        }else {
            x.then(resolve,rejected);
        }
    } else {
        resolve(x)
    }
}

MyPromise.prototype.then = function (onFulfilled,onRejected){
    // 先处理两个函数
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
    onRejected = typeof onRejected === 'function' ? onRejected : error => { throw error}
    let self = this;
    let bridgePromise = null;
    if(self.status === PENDING){
        return bridgePromise = new MyPromise((resolve,rejected) => {
            self.onFulfilledCallbacks.push((value) => {
                try {
                    let x = onFulfilled(value);
                    handleResolve(bridgePromise,x,resolve,rejected)
                }catch (e) {
                    rejected(e);
                }
            });

            self.onRejectedCallbacks.push((error) => {
                try{
                    let x = onRejected(error);
                    handleResolve(bridgePromise,x,resolve,rejected)
                } catch(e) {
                    rejected(e)
                }
            });
        })
    } else if(self.status === FULFIlLED) {
        return bridgePromise = new MyPromise((resolve,rejected) => {
            setTimeout(() => {
                try {
                    let x = onFulfilled(value);
                    handleResolve(bridgePromise,x,resolve,rejected)
                }catch (e) {
                    rejected(e);
                }
            })
        })
    }else {
        return bridgePromise = new MyPromise((resolve,rejected) => {
            setTimeout(() => {
                try{
                    let x = onRejected(error);
                    handleResolve(bridgePromise,x,resolve,rejected)
                } catch(e) {
                    rejected(e)
                }
            })
        })
    }
}

// 实现Promise的错误冒泡机制
MyPromise.prototype.catch = (onRejected) => {
    this.then(null,onRejected);
}

/**
 * 1、传参为一个 Promise, 则直接返回它。
 * 2、传参为一个 thenable 对象，返回的 Promise 会跟随这个对象，采用它的最终状态作为自己的状态。
 * 3、其他情况，直接返回以该值为成功状态的promise对象。
 * 
 * MyPromise.resolve()函数
 */
MyPromise.resolve = (param) => {
    if(param instanceof MyPromise) return param;
    
    return new MyPromise((resolve,reject) => {
        if(param && param.then && typeof param.then === 'function') {
            param.then(resolve,reject)
        }else {
            resolve(param)
        }
    })
}

/**
 * Promise.reject 中传入的参数会作为一个 reason 原封不动地往下传
 */
MyPromise.reject = (reason) => {
    return new MyPromise((resolve,reject) => {
        reject(reason)
    })
}

/**
 * 无论当前 Promise 是成功还是失败，调用finally之后都会执行 finally 中传入的函数，并且将值原封不动的往下传
 */
MyPromise.prototype.finally = (callback) => {
    this.then(value => {
        MyPromise.resolve(callback()).then(() => {
            return value;
        })
    },error => {
        MyPromise.reject(callback).then(() => {
            throw error;
        })
    })
}

/**
 * 1、传入参数为一个空的可迭代对象，则直接进行resolve。
 * 2、如果参数中有一个promise失败，那么Promise.all返回的promise对象失败。
 * 3、在任何情况下，Promise.all 返回的 promise 的完成状态的结果都是一个数组
 * MyPromise.all
 */
MyPromise.all = (promises) => {
    return new MyPromise((resolve,reject) => {
        let result = [];
        let index = 0;
        let len = promises.length;
        if(len === 0) {
            resolve(result)
            return;
        }

        for(let i = 0;i < len;i++) {
            MyPromise.resolve(promises[i]).then(value => {
                result[i] = value;
                index++;
                if(index === len) {
                    resolve(result)
                }
            }).catch(error => {
                reject(error)
            })
        }

    })
}

/**
 * MyPromise.race只要有一个 promise 执行完，直接 resolve 并停止执行
 */
MyPromise.race = (promises) => {
    return new MyPromise((resolve,reject) => {
        let result = [];
        let index = 0;
        let len = promises.length;
        if(len === 0) {
            resolve(result)
            return;
        }

        for(let i = 0;i < len;i++) {
            MyPromise.resolve(promises[i]).then(value => {
                resolve(value);
                return;
            }).catch(err => {
                reject(err)
            })
        }
    })
}

export default MyPromise;
