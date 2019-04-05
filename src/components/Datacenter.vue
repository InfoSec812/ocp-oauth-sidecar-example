<template>
  <div>
    <input type="text" v-bind="datacenter.url" />
    <input type="text" v-bind="datacenter.name" />
  </div>
</template>

<script>
export default {
  props: [
    'datacenter'
  ]
}
</script>

<style lang="less">

</style>
