<template>
	<footer>
		<div class="container body">
			<nav>
				<ul>
					<li v-for="item in menu" :class="item.class">
						<a :href="item.link" :class="item.link_class" :title="item.title">{{item.title}}</a>
					</li>
				</ul>
			</nav>
		</div>
	</footer>
</template>

<script>
import menu from '@/api/menu.json'

export default {
  data () {
    return {
      'menu': menu['front']['footer']
    }
  }
}
</script>

<style lang="scss" scoped>
footer {
	background: #f7f6f5;
	padding: 1em;

	nav {
		text-align: center;
		ul {
			display: inline-block;
			list-style: none;
			margin: 0;
			li {
				display: inline-block;
				list-style: none;
				margin: 0 1em;
			}
		}
	}

	a {
		color: #777;
	}
	a:hover {
		color: #444;
	}

	p {
		margin-top: 1em;
		text-align: center;
	}
}
</style>
