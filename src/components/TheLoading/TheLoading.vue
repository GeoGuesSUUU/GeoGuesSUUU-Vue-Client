<script setup lang="ts"></script>

<template>
	<main class="d-flex flex-column justify-content-center align-items-center">
		<img
			id="app-logo"
			class="mb-3"
			src="/src/assets/earth-icon.svg"
			alt="logo" />
		<div class="spin text-center">
			<div class="spinner-border" role="status">
				<span class="visually-hidden">Loading...</span>
			</div>
		</div>
	</main>
</template>

<style scoped src="./TheLoading.scss"></style>
