<template>
  <HeaderC/>
  <div>
    <router-view/>
  </div>
  <FooterC/>
</template>

<script>
import HeaderC from "./components/HeaderC.vue"
import FooterC from "./components/FooterC.vue"

export default {
  name: 'App',
  components:{
    HeaderC,
    FooterC,
  }
}
</script>

<style>

</style>
