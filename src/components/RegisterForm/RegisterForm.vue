<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useSessionStore } from '@/stores/session'

const sessionStore = useSessionStore()

const router = useRouter()

const { register } = sessionStore

const username = ref('')
const useremail = ref('')
const password = ref('')

const error = ref<string | null>(null)

const isLoading = ref<boolean>(false)

async function checkForm() {
	error.value = null
	try {
		isLoading.value = true
		await register(username.value, useremail.value, password.value)
		isLoading.value = false
		router.push({ name: 'home' })
	} catch (e) {
		error.value = 'Invalid login'
	}
}
</script>

<template>
	<form>
		<div class="form-floating mb-3">
			<input
				type="email"
				class="form-control"
				id="floatingName"
				placeholder="..."
				v-model="username"
				@keyup.enter="checkForm" />
			<label for="floatingName">Username</label>
		</div>
		<div class="form-floating mb-3">
			<input
				type="email"
				class="form-control"
				id="floatingInput"
				placeholder="name@example.com"
				v-model="useremail"
				@keyup.enter="checkForm" />
			<label for="floatingInput">Email address</label>
		</div>
		<div class="form-floating mb-3">
			<input
				type="password"
				class="form-control"
				id="floatingPassword"
				placeholder="Password"
				v-model="password"
				@keyup.enter="checkForm" />
			<label for="floatingPassword">Password</label>
		</div>
		<button
			v-if="!isLoading"
			type="button"
			class="btn btn-primary"
			@click="checkForm">
			Inscription
		</button>
		<button v-else class="btn btn-primary" type="button" disabled>
			<span
				class="spinner-border spinner-border-sm"
				role="status"
				aria-hidden="true"></span>
			<span class="sr-only">Loading...</span>
		</button>
	</form>
</template>

<style scoped src="./RegisterForm.scss"></style>
