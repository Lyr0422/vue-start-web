/**
 * author: Lyr
 * createTime: 2020/7/25 15:38
 * desc: axios异步请求相关配置
 **/

import axios from 'axios'
import store from '../vuex/index'
import configs from './configs'

export default function (vue) {
  //获取CancelToken
  const CancelToken = axios.CancelToken
  const source = CancelToken.source()

  //axios请求拦截器
  axios.interceptors.request.use(config => {
    let baseURL=configs.apiServer
    //改变URL
    config.url = (baseURL.endsWith('/') ? baseURL : baseURL + '/') + config.url

    //过滤重复请求
    let headers = config.headers
    let obj = {method: config.method, url: config.url, startTime: headers.__startTime}
    if (config.method == "post") obj.tData = config.data || ''
    if (config.method == "get") obj.tData = config.params && JSON.stringify(config.params) || ''
    config.tData = obj.tData
    let reqList = store.state.common.reqList
    let arr = reqList.filter(v => v.method = obj.method && v.url == obj.url && v.tData == obj.tData)
    if (arr.length > 0) return Promise.reject(new Error('reiterated request in a short time'))
    store.commit('common/reqList', obj)
    delOverdueReq(obj)
    return config
  }, error => {
    console.error(error)
    return Promise.reject(error)
  })

  //响应拦截器
  axios.interceptors.response.use(response => { //请求正常响应，即200
    delReqList(response.config)
    if (response.data && response.data.error) {
      if (response.data.error.code === 401) {
        source.cancel()
//用户超时 加弹窗
        console.error('登录超时，请重新登录！')
      } else {
        source.cancel()
        if (response.data.error.message) console.error(response.data.error.message)
      }
    }
    return response
  }, error => {
    if (error.message === 'reiterated request in a short time') {
      throw new Error('reiterated request in a short time')
    }
    delReqList(error.config)
    return Promise.resolve(error)
  })

  const delOverdueReq = (obj) => {
    setTimeout(() => {
      store.commit('common/removeReqList', obj)
    }, 8000)
  }
  const delReqList = (config) => {
    store.commit('common/removeReqList', config)
  }
}


