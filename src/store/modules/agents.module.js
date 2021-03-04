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
            const intersection = state.agents.filter(item => payload.agent.includes(item)).map(el => {
                return {
                    ...el,
                    flights: [payload.id]
                }
            })
            const difference = state.agents.filter(item => !payload.agent.includes(item))
            console.log(difference)

            state.agents = intersection.concat(difference)
            console.log(state.agents)
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