<template>
	<main>
		<front-header></front-header>
		<section id="account-login">
			<div class="container">
				<div class="row">

					<div class="col-6 body">

						<form v-on:submit.prevent="process">

							<h1>Log in</h1>
							<fieldset>
								<div class="alert alert-danger" v-for="error in errors">{{error.message}}</div>

								<div class="form-group">
									<label for="email">Email address</label>
									<div class="input-group">
										<span class="input-group-addon">
											<i class="mdi mdi-email-outline"></i>
										</span>
										<input type="email" class="form-control" id="email" name="email" v-model="formData.email" placeholder="Enter email"/>
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
									<button class="btn btn-primary" :disabled="sending">Continue</button>
								</div>
							</fieldset>
						</form>

					</div>

					<div class="col-6 body">
						<form v-on:submit.prevent="social">
							<h1>Log in with Google</h1>
							<div class="tac">
								<button class="btn btn-primary" :disabled="sending">Sign up with Google</button>
							</div>
						</form>
					</div>

				</div>
			</div>
		</section>
		<front-footer></front-footer>
	</main>
</template>

<script>
import store from '@/store/user'

export default {
  data () {
    return {
      sending: false,
      errors: [],
      formData: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    process () {
      this.sending = true
      this.errors = []
      var self = this
      window.firebase
        .auth()
        .signInWithEmailAndPassword(
          this.formData.email,
          this.formData.password
        )
        .then(function () {
          self.$router.push('/')
          self.sending = false
        })
        .catch(function (err) {
          self.errors = [ err ]
          self.sending = false
        })
    },
    social () {
      var self = this
      try {
        var provider = new window.firebase.auth.GoogleAuthProvider()
        window.firebase
          .auth()
          .signInWithPopup(provider)
          .then(function (result) {
            var user = result.user
            console.log(user)
            store.Login(user)
            if (store.IsLoggedIn()) {
              self.$router.push('/')
            }
          })
          .catch(function (err) {
            self.errors = [ err ]
          })
      } catch (err) {
        this.errors = [ err ]
      }
    }
  },
  created () {
    if (store.IsLoggedIn()) {
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
.body {
	padding-top: 1em;
	padding-bottom: 1em;
}
</style>
