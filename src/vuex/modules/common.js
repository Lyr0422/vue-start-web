/**
 * author: Lyr
 * createTime: 2020/7/25 17:19
 * desc: 公共模块
 **/

const state = {
  reqList: []
}
const getter = {
  reqList: (state) => {
    return state.reqList
  }
}

const mutations={
  reqList(state,obj){
    state.reqList.push(obj)
  },
  removeReqList(state,obj){
    state.reqList = state.reqList.filter((v, i) => {
      if(v.method == obj.method && v.url == obj.url && v.tData == obj.tData){}
      else return true
    })
  }
}
