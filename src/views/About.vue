<template>
  <q-page padding>
    <ul v-if="noErrors">
      <li v-for="item in oapiStructure.resources" :key="item.name">
        {{ item.kind }}
      </li>
    </ul>
    <div v-if="!noErrors">
      An error occurred retrieving information from the OpenShift API
    </div>
  </q-page>
</template>

<script>
import Axios from 'axios';

export default {
  name: 'PageAbout',
  data: {
    oapiStructure: {},
    noErrors: true,
  },
  beforeCreate: () => {
    axios.get("/oapi/v1")
        .then((response) => {
          if (response.status == 200) {
            this.$data.oapiStructure = response.data;
          } else {
            this.$data.oapiStructure = {}
          }
        })
        .catch((error) => {
          this.$data.noErrors = false;
        });
  }
};
</script>
