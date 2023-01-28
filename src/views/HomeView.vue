<script setup lang="ts">
import { RouterView } from 'vue-router'
import TheHeaderVue from '@/components/TheHeader/TheHeader.vue'
</script>

<template>
	<TheHeaderVue></TheHeaderVue>
	<main class="py-3">
		<RouterView />
	</main>
</template>
