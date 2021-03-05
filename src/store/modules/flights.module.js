import axios from "axios";
import store from '../index'

export default {
    namespaced: true,
    state() {
        return {
            flights: []
        }
    },
    mutations: {
        setFlights(state,payload) {
            state.flights = payload
        }
    },
    actions: {
        async loadFlights({commit, rootGetters}, payload) {
            const agents = store.getters['agents/agents']
            const proxy = 'https://corsproxy-kazhe.herokuapp.com/'
            const flightsDb = `https://pulkovoairport.ru/f/flights/cur/ru_${payload.type}_${payload.day}.js?`
            const {data} = await axios.get(proxy + flightsDb)

            data.data.forEach(item => {
                item.agents = []
                for (let agent of agents) {
                    for (let f of agent.flights) {
                        if(f === item.id) {
                            item.agents.push(agent)
                        }
                    }
                }
            })

            commit('setFlights', data.data)
        }
    },
    getters: {
        flights(state) {
            return state.flights
        },
        flight: (state) => (id) => {
            return state.flights.find(item => item.id === id)
        }
    }
}