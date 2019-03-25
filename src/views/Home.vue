<template>
  <q-page>
    <h2>Query Params</h2><br />
    <ul>
      <li v-for="item in queryParams" :key="item.key">
        {{ item.key }}: {{item.value}}
      </li>
    </ul><br />
    <h2>Cookies</h2><br />
    <ul>
      <li v-for="cookie in cookies">
        {{ cookie }}
      </li>
    </ul><br />
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
    cookies: () => {
      const theCookies = document.cookie.split(';');
      const aString = [];
      for (let i = 1; i <= theCookies.length; i++) {
        aString.push(theCookies[i - 1]);
      }
      return aString;
    },
  },
};
</script>
