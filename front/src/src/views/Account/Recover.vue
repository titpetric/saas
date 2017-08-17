<template>
	<main>
		<front-header></front-header>
		<section id="account-login">
			<div class="container">
				<div class="row">

					<div class="col-6 offset-3 body" v-if="registered">
						<h1>Recover your account</h1>
						<p>A password reset link has been sent. Please check your e-mail to set a new password.</p>
					</div>

					<div class="col-6 offset-3 body" v-if="!registered">
						<form v-on:submit.prevent="process">

							<h1>Recover your account</h1>
							<fieldset>
								<div class="alert alert-danger" v-for="error in errors">{{error.message}}</div>

								<div class="form-group">
									<label for="email">Please enter your email address</label>
									<input type="email" class="form-control" id="email" name="email" v-model="formData.email" placeholder="Enter email"/>
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

export default {
  data () {
    return {
      errors: [],
      registered: false,
      formData: {
        email: ''
      }
    }
  },
  methods: {
    process () {
      var url = this.$root.api + '/user/recover'

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
            if (resp !== false && resp.status === 'OK') {
              this.registered = true
              return
            }
          }
          this.errors = [ { 'message': 'Unexpected response' } ]
        })
    }
  },
  created () {
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
