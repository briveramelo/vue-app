import {store} from "./store"
import router from "./../router/index.js"

let Security = {
    // make sure user is authenticated
    requireToken: function() {
        if (store.token === ""){
            router.push("/login")
            return false
        }


        return true
    },

    // create request options and send them back
    requestOptions: function(payload) {
      const headers = new Headers()
      headers.append("Content-Type", "application/json")
      headers.append("Authorization", `Bearer ${store.token}`)

      return {
          method: "POST",
          body: JSON.stringify(payload),
          headers: headers
      }
    }
}

export default Security