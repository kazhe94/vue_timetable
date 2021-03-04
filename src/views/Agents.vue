<template>
  <app-page title="Список агентов">
    <template #header>
      <button class="btn primary" @click="modal = true">Добавить агента</button>
    </template>
    <h3 v-if="agents.length === 0" class="text-center">Агентов пока нет</h3>
    <table class="table" v-else>
      <thead>
        <tr>
          <th>#</th>
          <th>Имя</th>
          <th>Фамилия</th>
          <th>Статус</th>
          <th>Смена</th>
          <th>Действие</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(agent, idx) in agents" :key="agent.id">
          <td>{{idx + 1}}</td>
          <td>{{agent.name}}</td>
          <td>{{agent.surname}}</td>
          <td>
            <select id="status" v-model="agent.status" @change="changeStatus(agent)">
              <option :value="s.type" v-for="s in statuses">{{s.title}}</option>
            </select>
          </td>
          <td>{{agent.shift}}</td>
          <td>
            <button
                class="btn danger"
                @click="removeAgent(agent.id)"
            >Х</button>
          </td>
        </tr>
      </tbody>
    </table>
  </app-page>
  <teleport to="body">
    <app-modal
        v-if="modal"
        @close="modal = false"
    >
      <agent-form @created="modal = false"></agent-form>
    </app-modal>
  </teleport>
</template>

<script>
import AppPage from "@/components/ui/AppPage";
import AppModal from "@/components/ui/AppModal";
import AgentForm from "@/components/AgentForm";
import {useStore} from "vuex";
import {computed, ref} from "vue";
export default {
  name: "Agents",
  components: {
    AppPage,
    AgentForm,
    AppModal
  },
  setup() {
    const store = useStore()
    const modal = ref(false)

    const agents = computed(()=> store.getters['agents/agents'])
    const statuses = computed(()=> store.getters['agents/statuses'])
    const removeAgent = (id)=> {
      store.commit('agents/removeAgent', id)
    }
    const changeStatus = (item)=> {
      store.commit('agents/changeStatus', item)
    }
    return {
      modal,
      agents,
      statuses,
      removeAgent,
      changeStatus
    }
  }
}
</script>

<style scoped>

</style>