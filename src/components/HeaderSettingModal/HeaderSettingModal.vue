<script setup lang="ts"></script>

<template>
	<div
		class="modal fade"
		id="headerModal"
		tabindex="-1"
		aria-labelledby="headerModalLabel"
		aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<h1 class="modal-title fs-5" id="headerModalLabel">Settings</h1>
					<button
						type="button"
						class="btn-close"
						data-bs-dismiss="modal"
						aria-label="Close"></button>
				</div>
				<div class="modal-body">
					...
					<h2>Ideas :</h2>
					<ul>
						<li>Darkmode</li>
						<li>Map color</li>
						<li>User locale</li>
					</ul>
				</div>
				<div class="modal-footer">
					<button
						type="button"
						class="btn btn-secondary"
						data-bs-dismiss="modal">
						Close
					</button>
					<button type="button" class="btn btn-primary">Save changes</button>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped src="./HeaderSettingModal.scss"></style>
