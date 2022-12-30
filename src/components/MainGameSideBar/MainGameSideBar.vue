<script setup lang="ts">
import { ref } from 'vue'
import type { CountryApp } from '../../client/types/bussiness'

const ps = defineProps<{
	country: CountryApp
}>()

const props = ref(ps)
console.log(props.value.country.code)
</script>

<template>
	<img
		crossorigin="anonymous"
		:src="props.country.flag"
		class="country-flag object-fit-cover border rounded"
		alt="country flag" />

	{{ props.country.code }}
</template>

<style scoped src="./MainGameSideBar.scss"></style>
