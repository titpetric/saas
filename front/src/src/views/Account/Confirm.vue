<template>
	<main>
		<front-header></front-header>
		<section id="account-login">
			<div class="container">
				<div class="row">
					<div class="col-6 offset-3 body" v-if="failed">
						<h1>Activate your account</h1>
						<p>Activation token invalid or expired</p>
						<router-link to="/account/recover" class="btn btn-primary">Resend activation?</router-link>
					</div>

					<div class="col-6 offset-3 body" v-if="!failed">
						<form v-on:submit.prevent="process">
							<input type="hidden" name="token" v-model="formData.token"/>
							<h1>Activate your account</h1>
							<fieldset>
								<div class="alert alert-danger" v-for="error in errors">{{error.message}}</div>

								<div class="form-group">
									<label for="password">Please enter your new password</label>
									<input type="password" class="form-control" id="password" name="password" v-model="formData.password" placeholder="Enter password"/>
								</div>

								<div class="tac">
									<button class="btn btn-primary">Continue</button>
								</div>
							</fieldset>
						</form>
					</div>
				</div>
			</div>
		</section>
		<front-footer></front-footer>
	</main>
</template>

<script>
import axios from 'axios'
import store from '@/store/user'

export default {
  data () {
    return {
      errors: [],
      failed: false,
      formData: {
        token: '',
        password: ''
      }
    }
  },
  methods: {
    process () {
      var url = this.$root.api + '/user/confirm'

      axios
        .post(url, this.formData)
        .then(response => {
          this.errors = []
          if (typeof response.data.error !== 'undefined') {
            this.errors = [ response.data.error ]
            return
          }
          if (typeof response.data.response !== 'undefined') {
            var resp = response.data.response
            if ('user' in resp && 'sessionId' in resp) {
              resp.user.sessionId = resp.sessionId
              store.Login(resp.user)
              this.$router.push('/')
              return
            }
          }
          this.failed = true
          this.errors = [ { 'message': 'Unexpected response' } ]
        })
    }
  },
  created () {
    this.formData.token = this.$route.params.token
    if (this.$root.user) {
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
.body {
	padding: 1em 0;
}
</style>
