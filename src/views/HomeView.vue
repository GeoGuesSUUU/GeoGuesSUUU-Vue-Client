<script setup lang="ts">
import { RouterView } from 'vue-router'
import TheHeaderVue from '@/components/TheHeader/TheHeader.vue'
</script>

<template>
	<main>
		<TheHeaderVue></TheHeaderVue>
		<RouterView />
	</main>
</template>
