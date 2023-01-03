<script setup lang="ts">
import svgMap from 'svgmap'
import { onMounted, ref } from 'vue'

const map = ref(null)

onMounted(() => {
	map.value = new svgMap({
		targetElementID: 'svgMap',
		showContinentSelector: false,
		showZoomReset: true,
		mouseWheelZoomEnabled: true,
		hideFlag: false,
		data: {
			data: {
				owner: {
					name: 'Owner',
					format: '{0}',
					// thousandSeparator: ',',
					// thresholdMax: 50000,
					// thresholdMin: 1000,
					// color: '#ccc',
				},
				// change: {
				//   name: "Change to year before",
				//   format: "{0} %",
				// },
			},
			applyData: 'owner',
			values: {
				FR: { owner: 'Admin', color: '#F00' },
				// AF: { countresidents: 587 },
				// AL: { gdp: 4583, change: 11.09 },
				// DZ: { countresidents: 232 },
				// UA: { countresidents: 42393 },
				// ...
			},
		},
	})
})
</script>

<template>
	<div class="px-4 pt-5 my-5 text-center border-bottom">
		<h1 class="display-4 fw-bold">World Map</h1>
		<div class="col-lg-6 mx-auto">
			<p class="lead mb-4">Buy, protect and attack countries in the world !</p>
		</div>
		<div class="mb-5">
			<div class="card px-5 border rounded-3 shadow-lg">
				<div id="svgMap" ref="map"></div>
			</div>
		</div>
	</div>
</template>

<style scoped src="./HomePage.scss"></style>
