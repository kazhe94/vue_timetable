<template>
  <app-loader v-if="loading"></app-loader>
  <div class="card" v-else>
    <the-switcher v-model="switcher"></the-switcher>
    <table class="table">
      <thead>
        <tr>
          <th>Время</th>
          <th>Рейс</th>
          <th>Направление</th>
          <th>Авиакомпания</th>
          <th>Тип самолёта</th>
          <th>Статус</th>
          <th>Агент</th>
        </tr>
      </thead>
      <tbody>
        <tr
            v-for="flight in flights"
            :key="flight.id"
            class="flight-item"
            @click="$router.push(`/flight/${flight.id}`)"
            :ref="setItemRefs"
        >
          <td>{{new Date(flight.departure_time.scheduled || flight.arrival_time.scheduled).toLocaleTimeString()}}</td>
          <td>{{flight.number}}</td>
          <td>{{flight.airport}}</td>
          <td>{{flight.company}}</td>
          <td>{{flight['aircraft_type_code']}}</td>
          <td>{{flight.status}}</td>
          <td>
            <button class="btn" @click.stop="modal = true, id = flight.id">Apply</button>
          </td>
          <td>
            <div v-for="a in flight.agents">
              {{a.name}}
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <teleport to="body">
    <app-modal
        v-if="modal"
        title="Назначьте агента(ов)"
        @close="modal = false"
    >
      <div class="form-control">
        <select multiple id="agent" v-model="assignedAgent">
          <option :value="agent" v-for="agent in agents">{{`${agent.name} ${agent.surname}`}}</option>
        </select>
        <button class="btn primary" @click="assign">Назначить</button>
      </div>
    </app-modal>
  </teleport>
</template>

<script>
import {computed, onMounted, onUpdated, ref, watch} from 'vue'
import {useStore} from "vuex";
import AppLoader from "@/components/ui/AppLoader";
import AppModal from "@/components/ui/AppModal";
import TheSwitcher from "@/components/TheSwitcher";
import {useRouter} from "vue-router";
export default {
  name: "Home",
  components: {
    AppLoader,
    TheSwitcher,
    AppModal
  },
  setup() {
    const store = useStore()
    const loading = ref(true)
    const modal = ref(false)
    const assignedAgent = ref()
    const id = ref()
    const items = ref([])

    const type = ref('dep')
    const switcher = ref({
      type: 'dep',
      day: '1'
    })

    watch(switcher, value => {
      changeFlightList(value)
    })
    onMounted(async ()=> {
      await store.dispatch('flights/loadFlights', switcher.value)
      loading.value = false
    })
    const changeFlightList = async (data)=> {
      await store.dispatch('flights/loadFlights', data)
    }
    const flights = computed(()=> store.getters['flights/flights'])
    const agents = computed(()=> store.getters['agents/activeAgents'])
    const idx = computed(()=> flights.value.findIndex(item => item.past === false))

    const setItemRefs = (el)=> {
      if(el) {
        items.value.push(el)
      }
    }
    onUpdated(() => {
      items.value[idx.value].scrollIntoView({block: "center", behavior: "smooth"})
    })


    assignedAgent.value = [...agents.value]
    const assign = () => {
      store.commit('agents/setAgents', {
        agent: assignedAgent.value,
        id: id.value
      })
      modal.value = false
    }
    return {
      flights,
      loading,
      type,
      switcher,
      modal,
      agents,
      assignedAgent,
      id,
      assign,
      setItemRefs,
      idx

    }
  }
}
</script>

<style scoped lang="scss">
  .controls {
    position: fixed;
    z-index: 10;
    bottom: 2rem;
    right: 0;
    background-color: #284f51;
    color: #fff;
    padding: 20px;
    border-radius: 8px;
    &__type {
      margin-bottom: 10px;
    }
  }
  #agent {
    margin-bottom: 10px;
  }
</style>