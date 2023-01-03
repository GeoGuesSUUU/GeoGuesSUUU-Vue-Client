<script setup lang="ts">
import { ref } from 'vue'
import LoginFormVue from '@/components/LoginForm/LoginForm.vue'
import RegisterFormVue from '@/components/RegisterForm/RegisterForm.vue'

const isRegisterPage = ref<boolean>(false)

function toggleIsRegisterPage() {
	isRegisterPage.value = !isRegisterPage.value
}
</script>

<template>
	<main>
		<img id="app-logo" src="/src/assets/earth-icon.svg" alt="logo" />
		<div class="form-check form-switch">
			<input
				class="form-check-input"
				type="checkbox"
				role="switch"
				id="flexSwitchCheckDefault"
				@click="toggleIsRegisterPage" />
			<label class="form-check-label" for="flexSwitchCheckDefault">
				{{ isRegisterPage ? 'Register Page' : 'Login Page' }}
			</label>
		</div>
		<LoginFormVue v-if="!isRegisterPage"></LoginFormVue>
		<RegisterFormVue v-else></RegisterFormVue>
	</main>
</template>

<style scoped lang="scss">
main {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	height: 100vh;
	width: 100%;
}

#app-logo {
	width: 100px;
	margin-bottom: 20px;
}
</style>
