<template>
	<div class="index-page">
		<template v-if="IsLoggedIn">
			<dashboard></dashboard>
		</template>
		<template v-else>
			<landing></landing>
		</template>
	</div>
</template>

<script>
import store from '@/store/user'
import IndexLanding from './Landing/Index.vue'
import IndexDashboard from './Dashboard/Index.vue'

export default {
  data () {
    return {
      IsLoggedIn: store.IsLoggedIn()
    }
  },
  components: {
    'landing': IndexLanding,
    'dashboard': IndexDashboard
  },
  created () {
    var self = this
    window.firebase
      .auth()
      .onAuthStateChanged(function (user) {
        if (user) {
          store.Login(user)
          window.firebase
            .auth()
            .currentUser
            .getIdToken(true)
            .then(function (idToken) {
              store.Set('token', idToken)
            })
            .catch(function (error) {
              store.Unset('token')
              console.log('Error getting user token: ' + error)
            })
        } else {
          store.Logout()
        }
        self.IsLoggedIn = store.IsLoggedIn()
      })
  }
}
</script>
