<template>
  <div id="app">
  <keep-alive v-if="isKeepAlive">
     <router-view/>
  </keep-alive>
  <template v-else>
    <router-view/>
  </template>
  </div>
</template>
<script>
export default {
    name: 'App',
    computed: {
        isKeepAlive: function() {
            return this.$route.meta.isKeepAlive
        }
    }
}
</script>
