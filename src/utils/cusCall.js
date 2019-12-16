Function.prototype.myCall = function(context) {
    context = context || window;
    context.fn = this;
    let args = Array.prototype.slice.call(arguments,1)||[]
    // let args = [];
    // for(let i = 1;i < arguments.length;i++) {
    //     args.push(arguments[i]);
    // }

    let result = context.fn(...args);
    delete context.fn;
    return result;
}