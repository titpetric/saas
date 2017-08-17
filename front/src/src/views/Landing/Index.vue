<template>
	<main>
		<front-header></front-header>

		<!-- Call to action / hero image -->
		<section-cta></section-cta>

		<!-- Collect e-mails from users -->
		<section-mailchimp></section-mailchimp>

		<!-- List your features / value -->
		<section-features></section-features>

		<!-- Pricing for your service -->
		<section-pricing></section-pricing>

		<front-footer></front-footer>
	</main>
</template>

<script>
import CTA from './SectionCTA.vue'
import Mailchimp from './SectionMailchimp.vue'
import Features from './SectionFeatures.vue'
import Pricing from './SectionPricing.vue'

export default {
  components: {
    'section-cta': CTA,
    'section-mailchimp': Mailchimp,
    'section-features': Features,
    'section-pricing': Pricing
  }
}
</script>
