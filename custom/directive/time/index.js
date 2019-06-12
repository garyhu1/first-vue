import Time from "./time";

export default {
  install(Vue, options = {}) {
    Vue.directive("time", {
      bind(el, binding) {
        el.innerHTML = Time.getFormatTime(binding.value);
      }
    });

    Vue.directive("down", {
      bind(el, binding) {
        const value = binding.value;
        el.__handle__ = setInterval(() => {
          if (Time.getDownTime(value).clear) {
            clearInterval(el.__handle__);
            el.innerText = Time.getDownTime(value).time;
            return;
          }
          el.innerText = Time.getDownTime(value);
        }, 1000);
      },
      unbind(el) {
        clearInterval(el.__handle__);
        delete el.__handle__;
      }
    });

    Vue.directive("clock", {
      bind(el, binding) {
        el.timeout = setInterval(function() {
          const value = Date.now();
          el.innerText = Time.getFormatTime(value);
        }, 1000);
      },
      unbind(el) {
        clearInterval(el.timeout);
        delete el.timeout;
      }
    });
  }
};
