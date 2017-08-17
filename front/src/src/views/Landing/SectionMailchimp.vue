<template>
	<section id="mailchimp">
		<div class="container body">
			<mailchimp-subscribe :action="options.mailchimp"></mailchimp-subscribe>
		</div>
	</section>
</template>

<script>
import config from '@/api/config.json'

export default {
  data () {
    return {
      options: config.options
    }
  }
}
</script>

<style lang="scss">
#mailchimp {
	.body {
		text-align: center;
		padding: 1em 0;
		input {
			margin-right: 0.3em;
		}
	}
}
</style>
