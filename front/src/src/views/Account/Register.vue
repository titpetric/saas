<template>
	<main>
		<front-header></front-header>
		<section id="account-login">
			<div class="container">
				<div class="row">

					<div class="col-6 offset-3 body" v-if="registered">
						<h1>Create your account</h1>
						<p>Your account has been created. Please check your e-mail for an activation link.</p>
					</div>

					<div class="col-6 offset-3 body" v-if="!registered">
						<form v-on:submit.prevent="process">

							<h1>Create your account</h1>
							<input type="hidden" name="origin" v-model="formData.origin"/>
							<fieldset>
								<div class="alert alert-danger" v-for="error in errors">{{error.message}}</div>

								<div class="form-group">
									<label for="email">Please enter your email address</label>
									<input type="email" class="form-control" id="email" name="email" v-model="formData.email" placeholder="Enter email"/>
								</div>

								<div class="tac">
									<button class="btn btn-primary" :disabled="sending">Continue</button>
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
      cta: 'Continue',
      sending: false,
      registered: false,
      formData: {
        email: '',
        origin: window.location.origin
      }
    }
  },
  methods: {
    process () {
      var url = this.$root.api + '/user/register'

      this.sending = true
      this.cta = 'Please wait ...'

      axios
        .post(url, this.formData)
        .then(response => {
          if (typeof response.data.response !== 'undefined') {
            var resp = response.data.response
            if (resp !== false && resp.status === 'OK') {
              this.registered = true
            } else {
              this.errors = [ { 'message': 'Unknown error' } ]
            }
          }
          if (typeof response.data.error !== 'undefined') {
            this.errors = [ response.data.error ]
          }
          this.sending = false
          this.cta = 'Continue'
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
