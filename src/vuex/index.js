import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from "vuex/dist/logger";

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'
console.log('==========process.env.NODE_ENV: ' + process.env.NODE_ENV)
console.log('==========store strict: ' + debug)

const store = new Vuex.Store({
    modules:{

    },
    strict:false,
    plugins: debug ? [createLogger()] : []
})

export default store