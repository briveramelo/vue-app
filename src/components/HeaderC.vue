<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Navbar</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link active" aria-current="page" to="/">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link v-if="store.token == ''" class="nav-link" to="/login">Login</router-link>
            <a v-else class="nav-link" href="javascript:void(0);" @click="logout">Logout</a>
          </li>
        </ul>

        <span class="navbar-text">
          {{store.user.first_name ?? ''}}
        </span>

      </div>
    </div>
  </nav>
</template>

<script>
import { store } from "./store.js"
import router from "../router/index.js"
export default {
  data() {
    return {
      store
    }
  },
  methods: {
    logout() {
      const payload = {
        token: store.token,
      }

      const requestOptions = {
        method: "POST",
        body: JSON.stringify(payload),
      }
      fetch("http://localhost:8081/users/logout", requestOptions)
          .then((response) => response.json())
          .then((response) =>{
            if (response.error) {
              console.log(response.message)
            } else {
              store.token = ""
              store.user = {}
              document.cookie = "_site_data=; Path=/; " +
                  'SameSite=Strict; Secure; ' +
                  'Expires=Thu, 01 Jan 1970 00:00:01 GMT;'

              router.push("/login")
            }
          })
    }
  }
}
</script>