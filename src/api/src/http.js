import axios from 'axios'
import qs from 'qs';

// 环境的切换
if (process.env.NODE_ENV === 'development') {
  axios.defaults.baseURL = '/proxyApi' // 在vue.config.js做了跨域的代理
} else if (process.env.NODE_ENV === 'production') {
  axios.defaults.baseURL = 'http://prod.xxx.com'// 根据需求填写自己的域名
}

// 请求拦截器
axios.interceptors.request.use(
  config => {
    let token = window.localStorage.getItem("token");  
    token && (config.headers.Authorization = token)
    // 处理get请求传递数组
    if(config.method === 'get'){
      config.paramsSerializer = (params) => {
        return qs.stringify(params, { arrayFormat: 'repeat' });
      }
    }
    return config
  },
  error => {
    return Promise.error(error)
  })

axios.defaults.timeout = 10000

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'

// 响应拦截器
axios.interceptors.response.use(response => {
  if (response.status === 200) {
    if (response.data.code === 511) {
      // 未授权调取授权接口
    } else if (response.data.code === 510) {
      // 未登录跳转登录页
    } else {
      return Promise.resolve(response)
    }
  } else {
    return Promise.reject(response)
  }
}, error => {
  // 我们可以在这里对异常状态作统一处理
  if (error.response) {
    // 处理请求失败的情况
    // 对不同返回码对相应处理
    return Promise.reject(error.response)
  }
})

// get 请求
export function httpGet({
  url,
  params = {}
}) {
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params
    }).then((res) => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

// post请求
export function httpPost({
  url,
  data = {},
  params = {}
}) {
  return new Promise((resolve, reject) => {
    axios({
      url,
      method: 'post',
      transformRequest: [function (data) {
        let ret = ''
        for (let it in data) {
          ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
        }
        return ret
      }],
      // 发送的数据
      data,
      // url参数
      params

    }).then(res => {
      resolve(res.data)
    })
  })
}

 /**
 * 封装patch请求
 * @param url
 * @param data
 * @returns {Promise}
 */
export function patch(url,data = {}){
    return new Promise((resolve,reject) => {
      axios.patch(url,data)
           .then(response => {
             resolve(response.data);
           },err => {
             reject(err)
           })
    })
  }
  
   /**
   * 封装put请求
   * @param url
   * @param data
   * @returns {Promise}
   */
  export function put(url,data = {}){
    return new Promise((resolve,reject) => {
      axios.put(url,data)
           .then(response => {
             resolve(response.data);
           },err => {
             reject(err)
           })
    })
  }
