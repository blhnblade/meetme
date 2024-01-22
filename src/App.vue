<template>
  <Component :is='layout'>
    <router-view/>
  </Component>
</template>

<script>
import AuthLayout from '@/layout/AuthLayout'
import BaseLayout from '@/layout/BaseLayout'
export default{
  components: {
    AuthLayout, BaseLayout
  },
  computed:{
    layout(){
      console.log(process.env.VUE_APP_FIREBASE_API_KEY, 'dwqdw')
      console.log((this.$route.meta.layout || 'Auth') +'Layout')
      return ((this.$route.meta.layout || 'Auth') +'Layout')
    }
  }
}
</script>

<style lang="scss">
@import url('./assets/styles/fonts.css');
@import url('./assets/styles/style.css');

</style>
