/**
 * author: Lyr
 * createTime: 2020/7/25 14:51
 * desc: 请求函数封装
 **/

import axios from 'axios'
import QS from 'qs'

let cancel = {}

export default {
  /**
   * 通用get post请求
   * @param url <string>
   * @param param <object>
   * @param headers <object>
   * @param excludes 参数过滤数组 <array>
   * @param timeout  后端开始处理到返回期间超时cancle时长 <int>
   * @returns {Promise<any>}
   */
  get(url, param = {}, headers = axios.defaults.headers, excludes, timeout) {
    return joinParams(url, param, headers, excludes, timeout, 'get')
  },
  post(url, param = {}, headers = axios.defaults.headers, excludes, timeout) {
    return joinParams(url, param, headers, excludes, timeout, 'post')
  },
}

function checkParam(param) {
  return param && param != null && param != '' && param != 'undefined'
}

function joinParams(url, param, headers, excludes, timeout, method) {
  let obj = {
    url,
    method,
    timeout: (timeout || 60000) * 1,
    cancelToken: new axios.CancelToken(c => {
      cancel = c
    })
  }
  let ll = {}
  if (checkParam(localStorage.getItem('token'))) ll.token = localStorage.getItem('token')
  ll.lang = 'zh_CN'
  for (let key in param) {
    if (key != 'token' && key != 'lang') ll[key] = param[key]
  }
  if (excludes) {
    excludes.forEach(function (key) {
      delete ll[key]
    })
  }
  if (method == 'get') obj.params = ll
  if (method == 'post') obj.data = QS.stringify(ll)
  if (!headers) headers = {}
  headers['Content-type'] = 'application/x-www-form-urlencoded'
  headers.__startTime = new Date().getTime()
  obj.headers = headers
  return new Promise((resolve, reject) => {
    axios(obj).then(resolve, reject)
  })
}
