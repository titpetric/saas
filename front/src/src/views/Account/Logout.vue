<script>
import axios from 'axios'
import store from '@/store/user'

export default {
  created () {
    var url = this.$root.api + '/user/logout'

    axios
      .get(url, {})
      .then(response => {
        store.Logout()
        this.$router.push('/')
      })
  }
}
</script>
