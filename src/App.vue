<template>
  <div id="app">
    <router-view v-if="isAthenticated" />
    <button @click="authenticate" v-if="!isAuthenticated">Login</button>
  </div>
</template>

<script>
export default {
  computed: {
    isAuthenticated: function() {
      return this.$auth.isAuthenticated();
    }
  },
  methods: {
    authenticate: function() {
      this.$auth.authenticate(openshift).then(function() {
        
      });
    }
  }
}
</script>


<style>
</style>
