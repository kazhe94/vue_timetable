import axios from "axios";

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
        async loadFlights({commit}, payload) {
            const proxy = 'https://corsproxy-kazhe.herokuapp.com/'
            const flightsDb = `https://pulkovoairport.ru/f/flights/cur/ru_${payload.type}_${payload.day}.js?${Math.random()}`
            const {data} = await axios.get(proxy + flightsDb)
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