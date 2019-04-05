<template>
  <q-page>
    <h2>OpenShift Token</h2>
    <span>{{ token }}</span>
  </q-page>
</template>

<style>
</style>

<script>
export default {
  name: 'PageHome',
  computed: {
    token: function() {
      return this.$auth.getToken();
    }
  },
};
</script>
