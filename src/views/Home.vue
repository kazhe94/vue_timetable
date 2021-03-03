<template>
  <app-loader v-if="loading"></app-loader>
  <div class="card" v-else>
    <the-switcher v-model="switcher"></the-switcher>
    <table class="table">
      <thead>
        <tr>
          <th>Дата</th>
          <th>Время</th>
          <th>Рейс</th>
          <th>Направление</th>
          <th>Авиакомпания</th>
          <th>Тип самолёта</th>
          <th>Статус</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="flight in flights">
          <td>{{new Date(flight.departure_time.scheduled || flight.arrival_time.scheduled).toLocaleDateString()}}</td>
          <td>{{new Date(flight.departure_time.scheduled || flight.arrival_time.scheduled).toLocaleTimeString()}}</td>
          <td>{{flight.number}}</td>
          <td>{{flight.airport}}</td>
          <td>{{flight.company}}</td>
          <td>{{flight['aircraft_type_code']}}</td>
          <td>{{flight.status || 'По расписанию'}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import {computed, onMounted, ref, watch} from 'vue'
import {useStore} from "vuex";
import AppLoader from "@/components/ui/AppLoader";
import TheSwitcher from "@/components/TheSwitcher";
export default {
  name: "Home",
  components: {
    AppLoader,
    TheSwitcher
  },
  setup() {
    const store = useStore()
    const loading = ref(true)
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
    return {
      flights,
      loading,
      type,
      switcher,
      changeFlightList
    }
  }
}
</script>

<style scoped lang="scss">
  .controls {
    position: fixed;
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
</style>