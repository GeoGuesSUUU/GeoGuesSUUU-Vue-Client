<script setup lang="ts">
import { ref, toRefs } from 'vue'
import { useSessionStore } from '@/stores/session'

const sessionStore = useSessionStore()

const { isDarkMode, notifPosition } = toRefs(sessionStore)
const { setDarkMode, changeNotifPosition } = sessionStore

const inputDarkMode = ref(isDarkMode)

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
					<h4 class="pt-2">DarkMode :</h4>
					<div class="d-flex align-items-center">
						<i class="bi bi-sun-fill px-2 fs-5"></i>
						<div class="form-check form-switch">
							<input
								class="form-check-input"
								type="checkbox"
								role="switch"
								id="flexSwitchCheckDefault"
								v-model="inputDarkMode"
								@click="toggleDarkMode()" />
						</div>
						<i class="bi bi-moon-stars-fill px-1 fs-5"></i>
					</div>
					<h4 class="pt-2">Notification Position :</h4>
					<select
						class="form-select"
						v-model="notifPosition"
						v-on:change="changeNotifPosition(notifPosition)">
						<option value="top-left">Top-Left</option>
						<option value="top-center">Top-Center</option>
						<option value="top-right">Top-Right</option>
						<option value="bottom-left">Bottom-Left</option>
						<option value="bottom-center">Bottom-Center</option>
						<option value="bottom-right">Bottom-Right</option>
					</select>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped src="./HeaderSettingModal.scss"></style>
