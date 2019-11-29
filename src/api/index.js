import { httpGet, httpPost } from './src/http'

export const getorglist = (params = {}) => httpGet({ url: 'apps/api/org/list', params })

export const save = (data) => {
  return httpPost({
    url: 'apps/wechat/api/save_member',
    data
  })
}

// 该方法在MainPage.vue中测试
export const getJson = () => {
  return httpGet({
    url: "/api/json"
  })
}
