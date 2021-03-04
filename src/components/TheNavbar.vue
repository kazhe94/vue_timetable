<template>
  <nav class="navbar">
    <h3>Flights Schedule</h3>
    <ul class="navbar-menu">
      <li>
        <router-link to="/">Рейсы</router-link>
      </li>
      <li>
        <router-link to="/agents">Агенты</router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: "TheNavbar",
  components: {

  },
  setup() {

    return {

    }
  }

}
</script>

<style scoped lang="scss">

</style>