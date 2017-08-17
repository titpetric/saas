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
  beforeRouteLeave (to, from, next) {
    if (to.meta.componentName === 'Page') {
      this.loadContents(to.path, next)
    } else {
      next()
    }
  },
  beforeRouteUpdate (to, from, next) {
    this.loadContents(to.path, next)
  },
  created () {
    this.loadContents(this.$route.path)
  },
  methods: {
    loadContents (path, callback) {
      var params = {}
      var link = '/api' + path + '.json'
      return axios
        .get(link, params)
        .then(response => {
          this.content = response.data
          this.ready = true
          if (typeof callback === 'function') {
            callback()
          }
        })
        .catch(err => {
          this.content = {
            title: 'Page not found',
            content: err
          }
          this.ready = true
          if (typeof callback === 'function') {
            callback()
          }
        })
    }
  }
}
</script>
