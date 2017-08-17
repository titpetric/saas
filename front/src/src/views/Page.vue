<template>
	<main v-if="ready">
		<front-header></front-header>

		<section id="contents">
			<div class="container body">
				<h1>{{ content.title }}</h1>
				<h2 v-if="content.subtitle">{{ content.subtitle }}</h2>

				<article v-html="content.body"></article>
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
      ready: false,
      content: {}
    }
  },
  created () {
    var params = {}
    var link = '/api' + this.$route.path + '.json'
    axios
      .get(link, params)
      .then(response => {
        this.content = response.data
        this.ready = true
      })
      .catch(err => {
        this.content = {
          title: 'Page not found',
          content: err
        }
        this.ready = true
      })
  }
}
</script>
