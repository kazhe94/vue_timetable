<template>
  <div class="controls">
    <div class="form-control">
      <label for="departure">Отправление</label>
      <input type="radio" id="departure" name="type" value="dep" v-model="type">
    </div>
    <div class="form-control">
      <label for="arrival">Прибытие</label>
      <input type="radio" id="arrival" name="type" value="arr" v-model="type">
    </div>
    <div class="form-control controls__day">
      <select id="day" v-model="day">
        <option value="-1" selected>Вчера</option>
        <option value="1">Сегодня</option>
        <option value="2">Завтра</option>
        <option value="3">Послезавтра</option>
      </select>
    </div>
  </div>
</template>

<script>
import {ref, watch} from "vue";

export default {
  name: "TheSwitcher",
  props: ['modelValue'],
  emits:['update:modelValue'],
  setup(_, {emit}) {
    const type = ref('dep')
    const day = ref(1)

    watch([day, type], values => {
      emit('update:modelValue', {
        day: values[0],
        type: values[1]
      })
    })

    return {
      type,
      day
    }
  }
}
</script>

<style scoped>

</style>