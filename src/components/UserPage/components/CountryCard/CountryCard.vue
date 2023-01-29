<script setup lang="ts">
import { computed, ref } from 'vue'
import type { Country } from '@/client/types/bussiness'

const ps = defineProps<{
	country: Country
	locale?: string
}>()
const country = ref(ps.country)
console.log(country.value)
const ownedAt = computed(() =>
	new Date(country.value.ownedAt).toLocaleDateString(ps.locale ?? 'en-US', {
		year: 'numeric',
		month: '2-digit',
		day: '2-digit',
		hour: '2-digit',
		minute: '2-digit',
	})
)
</script>

<template>
	<div class="card">
		<img
			:src="country.flag"
			crossorigin="anonymous"
			class="card-img-top"
			alt="game img" />
		<div class="card-body">
			<h5 class="card-title">
				<strong>{{ country.name }}</strong>
			</h5>
			<p class="card-text">
				<strong>Life</strong>
				: {{ country.life }} / {{ country.lifeMax }}
			</p>
			<p class="card-text">
				<strong>Shield</strong>
				: {{ country.shield }} / {{ country.shieldMax }}
			</p>
			<p class="card-text">
				<strong>Equipment</strong>
				: {{ country.countryItems?.length ?? 0 }}
			</p>
		</div>
		<div class="card-footer">
			<small class="text-muted">{{ ownedAt }}</small>
		</div>
	</div>
</template>

<style scoped src="./CountryCard.scss"></style>
