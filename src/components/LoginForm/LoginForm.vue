<script setup lang="ts"></script>

<template>
	<div class="mb-3">
		<label for="exampleFormControlInput1" class="form-label">
			Your Email address
		</label>
		<input
			type="email"
			class="form-control"
			id="emailInput"
			placeholder="name@example.com" />
	</div>
	<div class="mb-3">
		<label for="exampleFormControlTextarea1" class="form-label">
			Your password
		</label>
		<input type="password" class="form-control" id="passwordInput" />
	</div>
</template>

<style scoped src="./LoginForm.scss"></style>
