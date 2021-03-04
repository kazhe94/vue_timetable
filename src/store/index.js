import { createStore } from 'vuex'
import flights from './modules/flights.module'
import agents from './modules/agents.module'
export default createStore({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    flights,
    agents
  }
})
