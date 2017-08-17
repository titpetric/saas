<template>
	<div>
		<p class="mb-0" v-if="success" v-html="successMessage"></p>

		<form v-if="!success" v-on:submit.prevent="process">
			<fieldset>
				<p>Want to know when we launch? Add your email to be notified and get a sign-up discount.</p>

				<div class="alert alert-danger" v-for="error in errors" v-html="error.message"></div>

				<div class="form-inline">
					<input type="email" class="form-control mr-sm-2 email" name="email" v-model="email" placeholder="Enter email"/>
					<button class="btn btn-primary">Subscribe</button>
				</div>
			</fieldset>
		</form>
	</div>
</template>

<script>
/*
# To get the `action` prop:
#
# 1. Go to your dashboard on mailchimp.com and navigate
#    to Lists > Signup Forms > Embedded Forms.
#
# 2. Copy the `<form>` action from the generated HTML code.
#
# 3. Pass that into the component via the prop, like so:
#
#      <mailchimp-subscribe
#          action="//yourname.us10.list-manage.com/subscribe/post?u=012345678910&id=ab12345
#      ></mailchimp subscribe>
*/

import jsonp from 'jsonp'

export default {
  props: {
    action: {
      required: true,
      type: String
    }
  },
  data () {
    return {
      success: false,
      email: '',
      errors: [],
      successMessage: null
    }
  },
  methods: {
    process () {
      this.errors = []

      var action =
        this.action.replace('/post?', '/post-json?') +
        '&EMAIL=' + encodeURIComponent(this.email)

      var preformat = function (s) {
        return s.replace(/([a-z.])\. /g, '$1.<br/>')
      }

      var self = this
      jsonp(action, { param: 'c' }, function (err, data) {
        if (err) {
          self.errors = [ { message: err } ]
          return
        }
        if (data.result === 'error') {
          self.errors = [
            { message: preformat(data.msg) }
          ]
          return
        }
        self.successMessage = preformat(data.msg)
        self.success = true
      })
    }
  }
}
</script>

<style type="text/scss" scoped>
.form-inline {
	display: inline-flex;
	.email {
		min-width: 50%;
	}
}
</style>
