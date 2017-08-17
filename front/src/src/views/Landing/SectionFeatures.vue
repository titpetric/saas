<template>
	<section id="features">
		<div class="container">
			<div class="row">

				<div class="col-6 col-md-3">
					<i class="mdi mdi-chart-bar"></i>
					<h5>Growth</h5>
					<p>My aim is to help you grow and sell your service</p>
				</div>
				<div class="col-6 col-md-3">
					<i class="mdi mdi-backburger"></i>
					<h5>Knowledge</h5>
					<p>If we don't know something, we can test it</p>
				</div>
				<div class="col-6 col-md-3">
					<i class="mdi mdi-certificate"></i>
					<h5>Security</h5>
					<p>We fully support HTTPS by using <a href="https://letsencrypt.org/">LetsEncrypt</a></p>
				</div>
				<div class="col-6 col-md-3">
					<i class="mdi mdi-account-check"></i>
					<h5>Privacy first</h5>
					<p>The data we collect about your service is not shared with third parties</p>
				</div>

			</div>
		</div>
	</section>
</template>

<style lang="scss">
#features {
	background: #f7f4f1;
	.mdi {
		display: block;
		text-align: center;
		font-size: 100px;
		color: #777;
	}
	p, h5 {
		text-align: center;
	}
	p {
		color: #444;
	}
}
</style>
