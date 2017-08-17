<script>
import store from '@/store/user'

export default {
  created () {
    var self = this
    window.firebase
      .auth()
      .signOut()
      .then(
        function () {
          store.Logout()
          self.$router.push('/')
        },
        function (error) {
          alert('Failed to signout, try again later: ' + error)
        }
      )
  }
}
</script>
