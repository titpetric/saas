<template>
	<main>
		<front-header></front-header>
		<section id="account-login">
			<div class="container">
				<div class="row">
					<div class="col-6 offset-3 body">

						<h1>Log in</h1>

						<form v-on:submit.prevent="process">
							<fieldset>
								<div class="alert alert-danger" v-for="error in errors">{{error.message}}</div>

								<div class="form-group" v-if="auth === 'email'">
									<label for="email">Email address</label>
									<div class="input-group">
										<span class="input-group-addon">
											<i class="mdi mdi-email-outline"></i>
										</span>
										<input type="email" class="form-control" id="email" name="email" v-model="formData.email" placeholder="Enter email"/>
									</div>
								</div>

								<div class="form-group" v-if="auth === 'username'">
									<label for="username">Username</label>
									<div class="input-group">
										<span class="input-group-addon">
											<i class="mdi mdi-account-outline"></i>
										</span>
										<input type="username" class="form-control" id="username" name="username" v-model="formData.username" placeholder="Enter username"/>
									</div>
								</div>

								<div class="form-group">
									<label for="password">Your password</label>
									<div class="input-group">
										<span class="input-group-addon">
											<i class="mdi mdi-lock-outline"></i>
										</span>
										<input type="password" class="form-control" id="password" name="password" v-model="formData.password" placeholder="Enter password"/>
									</div>
								</div>

								<div class="tac">
									<button class="btn btn-primary">Sign In</button>
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
      auth: 'email',
      formData: {
        email: '',
        username: '',
        password: ''
      }
    }
  },
  methods: {
    process () {
      var url = this.$root.api + '/user/login'

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

<style lang="scss" scoped>
.body {
	padding: 1em 0;
}
.input-group {
	.input-group-addon {
		background-color: #fefefe;
	}
}
</style>
