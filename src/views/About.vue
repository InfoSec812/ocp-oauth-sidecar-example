<template>
  <q-page padding>
    <div v-if="!noErrors">
      An error occurred retrieving information from the OpenShift API
      <datacenter v-for="(datacenter, index) in $data.cr.datacenters" v-bind:key="index"></datacenter>
    </div>
    <button :click="addDatacenter">New Datacenter</button>
  </q-page>
</template>

<script>

export default {
  name: 'PageAbout',
  data: () => {
    return {
      oapiStructure: {resources: []},
      noErrors: true,
      cr: {
        datacenters: []
      }
    }
  },
  methods: {
    addDatacenter: () => {
      this.$data.cr.datacenters.push({url: '', name: ''});
    }
  }
};
</script>
