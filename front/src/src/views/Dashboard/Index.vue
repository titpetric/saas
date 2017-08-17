<template>
	<main>
		<div class="row no-gutter">
			<div class="col-3">
				<side></side>
			</div>
			<div class="col-9">
				<div class="main-content">
					<h1>Dashboard</h1>
					<list :link="link" :columns="['Host', 'Requests today', 'Requests last week', 'Requests last month']"></list>
				</div>
			</div>
		</div>
	</main>
</template>

<script>
import store from '@/store/user'

export default {
  data () {
    return {
      link: '/api/domains.json?token=' + store.Get('token')
    }
  }
}
</script>
