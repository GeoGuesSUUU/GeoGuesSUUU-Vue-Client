<script setup lang="ts">
import LoginFormVue from '@/components/LoginForm/LoginForm.vue'
</script>

<template>
	<main>
		<img id="app-logo" src="src/assets/earth-icon.svg" alt="logo" />
		<LoginFormVue></LoginFormVue>
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
