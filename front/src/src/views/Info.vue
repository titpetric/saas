<template>
	<main>
		<div class="row no-gutter">
			<div class="col-3">
				<side></side>
			</div>
			<div class="col-9">

				<div class="row">
					<div class="col-6 col-offset-3">
						<div class="card">
							<blockquote class="card-blockquote">
								Name: {{ getUser().displayName }}<br/>
								E-mail: {{ getUser().email }}<br/>
								ID: {{ getUser().uid }}
							</blockquote>
						</div>

						<div id="info-placeholder" style="min-height: 300px;"></div>
					</div>
				</div>

			</div>
		</div>
	</main>
</template>

<script>
import store from '@/store/user'

export default {
  methods: {
    getUser: function () {
      return store.Get()
    }
  }
}
</script>

