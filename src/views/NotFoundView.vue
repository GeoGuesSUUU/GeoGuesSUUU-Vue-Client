<script setup lang="ts"></script>

<template>
	<main>
		<i class="bi bi-x-octagon-fill"></i>
		<p>This Page not exist</p>
		<a href="/">Return to Home Page</a>
	</main>
</template>

<style scoped lang="scss">
main {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	height: 100vh;

	.bi-x-octagon-fill {
		color: red;
		transform: scale(5) translateY(-7px);
	}

	p {
		font-size: xx-large;
	}
}
</style>
