<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useSessionStore } from '@/stores/session'

const sessionStore = useSessionStore()

const router = useRouter()

const { login, defaultEmail, defaultPassword } = sessionStore

const userEmail = ref(defaultEmail)
const password = ref(defaultPassword)

const error = ref<string | null>(null)

async function checkForm() {
	error.value = null
	try {
		await login(userEmail.value, password.value)
		router.push({ name: 'home' })
	} catch (e) {
		error.value = 'Invalid login'
	}
}
</script>

<template>
	<form>
		<div class="mb-3">
			<label for="emailInput" class="form-label">Your Email address</label>
			<input
				type="email"
				class="form-control"
				id="emailInput"
				placeholder="name@example.com"
				v-model="userEmail"
				@keyup.enter="checkForm" />
		</div>
		<div class="mb-3">
			<label for="passwordInput" class="form-label">Your password</label>
			<input
				type="password"
				class="form-control"
				id="passwordInput"
				v-model="password"
				@keyup.enter="checkForm" />
		</div>
		<button type="button" class="btn btn-primary" @click="checkForm">
			Connexion
		</button>
	</form>
</template>

<style scoped src="./LoginForm.scss"></style>
