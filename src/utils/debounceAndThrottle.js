export default {
    // 防抖函数,延时执行
    debounce1(func,wait) {
        let timer = null;
        return function() {
            let context  = this;
            let args = arguments;
            if(timer) clearTimeout(timer)

            timer = setTimeout(() => {
                func.call(context,...args);
            },wait)
        }
    },

    // 立即执行
    debounce2(func,wait) {
        let timer = null;
        return function() {
            let context = this;
            let args = arguments;

            if(timer) clearTimeout(timer);

            if(timer === null) {
                func.call(context,...args);
            }

            timer = setTimeout(() => {
                timer = null;
            },wait)
        }
    },

    // 节流,间隔
    throttle1(func,wait) {
        let last  = Date.now();
        return function() {
            let context = this;
            let args = arguments;
            let now = Date.now();
            if(now - last > wait) {
                func.call(context,...args);
                last = now;
            }
        }
    },

    // 节流，延时
    throttle2(func,wait) {
        let timer = null;
        return function() {
            let context = this;
            let args = arguments;
            if(timer === null) {
                timer = setTimeout(() => {
                    func.call(context,...args);
                    timer = null;
                },wait)
            }
        }
    }
}