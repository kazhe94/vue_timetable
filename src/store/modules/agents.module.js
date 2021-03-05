import store from '../index'

export default {
    namespaced: true,
    state() {
        return {
            agents: JSON.parse(localStorage.getItem('agents')) || [],
            statuses: [
                {
                    type: 'sick',
                    title: 'Больничный'
                },
                {
                    type: 'vacation',
                    title: 'Отпуск'
                },
                {
                    type: 'onFlight',
                    title: 'На рейсе'
                },
                {
                    type: 'lunch',
                    title: 'Обед'
                },
                {
                    type: 'rest',
                    title: 'Перерыв'
                },
                {
                    type: 'active',
                    title: 'Готов'
                }
            ]
        }
    },
    mutations: {
        addAgent(state, payload) {
            state.agents.push(payload)
            localStorage.setItem('agents', JSON.stringify(state.agents))
        },
        removeAgent(state, id) {
            state.agents = state.agents.filter(item => item.id !== id)
            localStorage.setItem('agents', JSON.stringify(state.agents))
        },
        changeStatus(state, payload) {
            state.agents.find(item => item.id === payload.id).status = payload.status
            localStorage.setItem('agents', JSON.stringify(state.agents))
        },
        setAgents(state, payload) {
            const flights = store.getters['flights/flights']
            flights.find(item => item.id === payload.id).agents.push(...payload.agent)
            payload.agent.forEach(item => {
                state.agents.find(el => el.id === item.id).flights.push(payload.id)
            })
            localStorage.setItem('agents', JSON.stringify(state.agents))
        }
    },
    actions: {

    },
    getters: {
        agents(state) {
            return state.agents
        },
        statuses(state) {
            return state.statuses
        },
        activeAgents(state, getters) {
            return getters.agents.filter(item => item.status !== 'sick' && item.status !== 'vacation')
        }
    }
}