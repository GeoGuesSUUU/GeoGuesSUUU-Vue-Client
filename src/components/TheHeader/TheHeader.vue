<script setup lang="ts">
import { ref, toRefs } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { useGeoguessuuuStore } from '@/stores/geoguessuuu'
import { useSessionStore } from '@/stores/session'
import HeaderSettingModal from '../HeaderSettingModal/HeaderSettingModal.vue'
import InventoryModal from '../InventoryModal/InventoryModal.vue'

const geoStore = useGeoguessuuuStore()
const sessionStore = useSessionStore()
const router = useRouter()

const { currentUser } = toRefs(geoStore)
const { logout } = sessionStore

const searchGame = ref('')

function redirectGame() {
	// FIXME: not working very well :[
	router.push({ name: 'games', query: { search: searchGame.value } })
}

async function signout() {
	await logout()
	router.push({ name: 'login' })
}

function getLevelLabel() {
	const min = currentUser.value.levelXpMin
	const xp = currentUser.value.xp
	const max = currentUser.value.levelXpMax
	return `${xp - min} / ${max - min} (${currentUser.value.levelProgress}%)`
}
</script>

<template>
	<header class="px-3 mb-3 border-bottom">
		<div class="container">
			<div class="header-components d-flex flex-row justify-content-between">
				<ul class="page-links nav mb-2 justify-content-center mb-md-0">
					<li>
						<router-link
							:to="{ name: 'home' }"
							class="h-link nav-link px-2"
							:class="{ active: $route.name === 'home' }">
							Home
						</router-link>
					</li>
					<li>
						<router-link
							:to="{ name: 'games' }"
							class="h-link nav-link px-2"
							:class="{ active: $route.name === 'games' }">
							Games
						</router-link>
					</li>
					<li>
						<router-link
							:to="{ name: 'store' }"
							class="h-link nav-link px-2"
							:class="{ active: $route.name === 'store' }">
							Store
						</router-link>
					</li>
					<div class="btn-group mx-2" role="group">
						<router-link
							:to="{ name: 'chat' }"
							target="_blank"
							class="btn btn-secondary px-2 my-2 d-flex justify-content-center align-content-center">
							<i class="bi bi-box-arrow-up-left me-2"></i>
						</router-link>
						<router-link
							:to="{ name: 'chat' }"
							class="btn btn-secondary px-2 my-2 d-flex justify-content-center align-content-center">
							Chat
						</router-link>
					</div>
				</ul>
				<div class="app-logo-div">
					<router-link
						:to="{ name: 'home' }"
						class="d-flex align-items-center mb-2 mb-lg-0 text-dark text-decoration-none">
						<img src="/src/assets/earth-icon.svg" width="50" alt="App Logo" />
					</router-link>
				</div>
				<div
					class="tool-page-links d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
					<form class="mx-2" role="search">
						<input
							type="search"
							class="form-control"
							placeholder="Search..."
							aria-label="Search"
							v-model="searchGame"
							@keyup.enter="redirectGame" />
					</form>

					<div class="dropdown text-end">
						<a
							href="#"
							class="d-block link-dark text-decoration-none dropdown-toggle"
							data-bs-toggle="dropdown"
							aria-expanded="false">
							<img
								src="/src/assets/default_user.svg"
								alt="user image"
								width="32"
								height="32"
								class="rounded-circle" />
						</a>
						<ul class="dropdown-menu text-small">
							<li>
								<div class="user-info">
									<div class="dropdown-header">
										<p class="username">{{ currentUser?.name }}</p>
										<span class="badge text-bg-primary">
											Lvl. {{ currentUser.level }}
										</span>
									</div>
									<hr class="hr" />
									<div class="money-div d-flex flex-row">
										<img
											src="/src/assets/coins.svg"
											alt="user coins"
											width="30" />
										<span>{{ currentUser?.coins ?? 0 }}</span>
									</div>
									<div class="xp-div d-flex flex-row">
										<img src="/src/assets/xp.svg" alt="user xp" width="35" />
										<div>
											<div class="progress" role="progressbar">
												<div
													class="progress-bar"
													:style="`width: ${currentUser.levelProgress}%`"></div>
											</div>
											<p class="level-label">{{ getLevelLabel() }}</p>
										</div>
									</div>
								</div>
								<hr class="hr" />
							</li>
							<li>
								<router-link
									:to="{ name: 'user', params: { id: currentUser?.id } }"
									class="dropdown-item">
									<i class="bi bi-person-circle mx-1"></i>
									Profile
								</router-link>
							</li>
							<li>
								<button
									type="button"
									class="dropdown-item"
									data-bs-toggle="modal"
									data-bs-target="#headerModal">
									<i class="bi bi-gear mx-1"></i>
									Settings
								</button>
							</li>
							<li><hr class="dropdown-divider" /></li>
							<li>
								<div class="dropdown-item" @click="signout">
									<i class="bi bi-box-arrow-right mx-1"></i>
									Sign out
								</div>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	</header>

	<!-- Modals -->
	<HeaderSettingModal></HeaderSettingModal>
	<InventoryModal></InventoryModal>
</template>

<style scoped src="./TheHeader.scss"></style>
