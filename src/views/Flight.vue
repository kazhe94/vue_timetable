<template>
  <app-page back :title="'Рейс ' + flight.number">
    <table class="table">
      <thead>
      <tr>
        <th>Маршрут до</th>
        <th>Тип ВС</th>
        <th>Стойки регистрации</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td>{{flight.airport}}</td>
        <td>{{flight.aircraft_type_code}}</td>
        <td>{{counters[0] + '-' + counters[1]}}</td>
      </tr>
      </tbody>
    </table>
    <table class="table">
      <thead>
        <tr>
          <th>Авиакомпания</th>
          <th>Статус</th>
          <th>Выход</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{{flight.company}}</td>
          <td>{{flight.status}}</td>
          <td>{{flight.gates}}</td>
        </tr>
      </tbody>
    </table>
    <h2>Вылет</h2>
    <table class="table">
      <thead>
      <tr>
        <th>Дата вылета</th>
        <th>STD</th>
        <th>ETD</th>
        <th>OFB</th>
        <th>ATD</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td>{{new Date(flight.date).toLocaleDateString()}}</td>
        <td>{{ new Date(flight.departure_time.scheduled).toLocaleTimeString()}}</td>
        <td>{{ new Date(flight.departure_time.estimated).toLocaleTimeString() }}</td>
        <td>{{ new Date(flight.departure_time.offblock).toLocaleTimeString() || ''}}</td>
        <td>{{ new Date(flight.departure_time.actual).toLocaleTimeString() || ''}}</td>
      </tr>
      </tbody>
    </table>
    <h2>Посадка</h2>
    <table class="table">
      <thead>
      <tr>
        <th>Посадка(план)</th>
        <th>Посадка(факт)</th>
        <th>Окончание(план)</th>
        <th>Окончание(факт)</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td>{{ new Date(flight.boarding.begin.plan).toLocaleTimeString()}}</td>
        <td>{{ new Date(flight.boarding.begin.actual).toLocaleTimeString()}}</td>
        <td>{{ new Date(flight.boarding.end.plan).toLocaleTimeString()}}</td>
        <td>{{ new Date(flight.boarding.end.actual).toLocaleTimeString()}}</td>
      </tr>
      </tbody>
    </table>

  </app-page>
</template>

<script>
import {useStore} from "vuex";
import {computed} from "vue";
import AppPage from "@/components/ui/AppPage";
import {useRoute} from "vue-router";

export default {
  name: "Flight",
  components: {
    AppPage
  },
  setup() {
    const store = useStore()
    const route = useRoute()
    const flight = computed(()=> store.getters['flights/flight'](route.params.id))
    console.log(flight.value)
    let counters = flight.value.counters.split('&ndash;')
    return {
      flight,
      counters
    }
  }
}
</script>

<style scoped>

</style>