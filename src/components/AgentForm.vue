<template>
  <form class="form" @submit.prevent="createAgent">
    <div class="form-control">
      <label for="name">Имя</label>
      <input type="text" id="name" v-model.trim="name" required>
    </div>
    <div class="form-control">
      <label for="surname">Фамилия</label>
      <input type="text" id="surname" v-model.trim="surname" required>
    </div>
    <div class="form-control">
      <label for="shift">Смена</label>
      <input type="number" max="4" min="1" id="shift" v-model.number="shift" required>
    </div>
    <div class="form-control">
      <label for="status">Статус</label>
      <select id="status" v-model="status">
        <option :value="s.type" v-for="s in statuses" :key="s.type">{{s.title}}</option>
      </select>
    </div>
    <div class="form-control">
      <label for="agentId">Табельный номер</label>
      <input type="number" id="agentId" v-model.number="agentId" required>
    </div>
    <button class="btn" type="submit">Добавить</button>
  </form>
</template>

<script>
import {useStore} from "vuex";
import {computed, ref} from "vue";

export default {
  name: "AgentForm",
  emits:['created'],
  setup(_, {emit}) {
    const store = useStore()
    const name = ref()
    const surname = ref()
    const shift = ref()
    const agentId = ref()
    const status = ref()
    const statuses = computed(()=> store.getters['agents/statuses'])
    const createAgent = ()=> {
      store.commit('agents/addAgent', {
        name: name.value,
        surname: surname.value,
        shift: shift.value,
        id: agentId.value,
        status: status.value,
        flights: []
      })
      emit('created')
      name.value = ''
      surname.value = ''
    }

    return {
      createAgent,
      name,
      surname,
      status,
      shift,
      agentId,
      statuses
    }
  }
}
</script>

<style scoped>

</style>