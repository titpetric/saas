<template>
	<div v-if="ready">
		<div class="header" v-if="title || subtitle">
			<h4 class="title" v-if="title">{{title}}</h4>
			<p class="category" v-if="subtitle">{{subtitle}}</p>
		</div>
		<div class="table-responsive">
			<table class="table" width="100%" :class="tableClass">
				<thead>
					<th v-for="column in columns">{{column}}</th>
				</thead>
				<tbody>
					<tr v-for="item in data">
						<td v-for="column in columns" v-if="hasValue(item, column)">{{itemValue(item, column)}}</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>

<script>
import axios from 'axios'

export default {
  props: {
    columns: Array,
    data: {
      type: Array,
      default: []
    },
    link: {
      type: String,
      default: ''
    },
    from: {
      type: String,
      default: ''
    },
    class: {
      type: String,
      default: 'table-striped table-bordered'
    },
    title: {
      type: String,
      default: ''
    },
    subtitle: {
      type: String,
      default: ''

    }
  },
  computed: {
    tableClass () {
      return `${this.class}`
    }
  },
  methods: {
    normalize (key) {
      return key.toLowerCase().replace(/[^a-z]+/g, '_')
    },
    hasValue (item, column) {
      return item[this.normalize(column)] !== 'undefined'
    },
    itemValue (item, column) {
      return item[this.normalize(column)]
    }
  },
  data () {
    return {
      ready: false
    }
  },
  created () {
    if (this.data.length > 0) {
      this.ready = true
      return
    }
    var params = {}
    axios
      .get(this.link, params)
      .then(response => {
        if (this.from !== '') {
          this.data = response.data.Response[this.from]
        } else {
          this.data = response.data.Response
        }
        this.ready = true
      })
  }
}
</script>
