<template>
  <div id="app">
    <router-view v-if="isAuthenticated" />
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
      this.$auth.authenticate('openshift').then(function() {
        console.log("Made it here!");
        window.location.href='/';
      }).catch(function(err) {
        console.log(err);
      });
    }
  }
}
</script>

<style>
</style>
