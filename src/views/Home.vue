<template>
  <q-page class="flex flex-center">
    <ul>
      <li v-for="item in queryParams" :key="item.key">
        {{ item.key }}: {{item.value}}
      </li>
    </ul>
  </q-page>
</template>

<style>
</style>

<script>
export default {
  name: 'PageHome',
  computed: {
    queryParams: () => {
      const retVal = [];
      location.search.substring(1).split('&').forEach((element) => {
        const item = {};
        console.log(element);
        [item.key, item.value] = element.split('=');
        retVal.push(item);
      });
      return retVal;
    },
  },
};
</script>
