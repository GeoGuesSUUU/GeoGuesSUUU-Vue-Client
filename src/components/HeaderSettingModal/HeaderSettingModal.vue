<script setup lang="ts">
import { toRefs } from 'vue'
import { useSessionStore } from '@/stores/session'

const sessionStore = useSessionStore()

const { isDarkMode } = toRefs(sessionStore)
const { setDarkMode } = sessionStore

function toggleDarkMode() {
	if (isDarkMode.value) {
		document
			.getElementsByTagName('html')[0]
			?.setAttribute('data-bs-theme', 'light')
	} else {
		document
			.getElementsByTagName('html')[0]
			?.setAttribute('data-bs-theme', 'dark')
	}
	setDarkMode(!isDarkMode.value)
}
</script>

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
					<h4>DarkMode :</h4>
					<div class="d-flex align-items-center">
						<i class="bi bi-sun-fill px-2 fs-5"></i>
						<div class="form-check form-switch">
							<input
								class="form-check-input"
								type="checkbox"
								role="switch"
								id="flexSwitchCheckDefault"
								@click="toggleDarkMode()" />
						</div>
						<i class="bi bi-moon-stars-fill px-1 fs-5"></i>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped src="./HeaderSettingModal.scss"></style>
