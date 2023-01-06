<script setup lang="ts">
import { useRouter } from 'vue-router'
import TheLoadingVue from '@/components/TheLoading/TheLoading.vue'
import { useSessionStore } from '@/stores/session'

const router = useRouter()
const sessionStore = useSessionStore()
const { user, defaultEmail, defaultPassword, login } = sessionStore

async function loadUser() {
	if (!defaultEmail || !defaultPassword) router.push({ name: 'login' })

	const params = router.currentRoute.value.query?.params?.toString()

	try {
		await login()
		router.push({
			name: router.currentRoute.value.query?.name?.toString() || 'home',
			params: params ? JSON.parse(params) : {},
		})
	} catch (error) {
		router.push({ name: 'login' })
	}
}

if (!user) loadUser()
</script>

<template>
	<main class="overflow-hidden">
		<TheLoadingVue></TheLoadingVue>
	</main>
</template>
