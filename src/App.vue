<template>
  <HeaderC/>
  <div>
    <router-view v-slot="{ Component }" :key="componentKey" @success="success" @error="error" @warning="warning" @forceUpdate="forceUpdate">
      <!-- this ensures that components cache state (eg: book filter) the include attribute needs to match the name field of the vue component (must define it to match) -->
      <keep-alive include="BooksComposition">
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </div>
  <FooterC/>
</template>

<script>
import HeaderC from "./components/HeaderC.vue"
import FooterC from "./components/FooterC.vue"
import { store } from "./components/store.js"
import notie from "notie"

const getCookie = (name) => {
  return document.cookie.split("; ").reduce((r, v) => {
    const parts = v.split("=")
    return parts[0] === name ? decodeURIComponent(parts[1]) : r;
  }, "")
}
export default {
  name: 'App',
  components:{
    HeaderC,
    FooterC,
  },
  data() {
    return {
      store,
      componentKey: 0,
    }
  },
  beforeMount() {
    //check for a cookie
    let data = getCookie("_site_data")
    if (data !== "") {
      let cookieData = JSON.parse(data)

      // update store
      store.token = cookieData.token.token
      store.user = {
        id: cookieData.user.id,
        first_name: cookieData.user.first_name,
        last_name: cookieData.user.last_name,
        email: cookieData.user.email,
      }
    }
  },
  methods: {
    success(msg){
      notie.alert({
        type: 'success',
        text: msg
      })
    },
    error(msg){
      notie.alert({
        type: 'error',
        text: msg
      })
    },
    warning(msg){
      notie.alert({
        type: 'warning',
        text: msg
      })
    },
    forceUpdate(){ // updating this value causes entire component to re-render, so subcomponents will update when this fires
      this.componentKey += 1
    }
  }
}
</script>

<style>

</style>
