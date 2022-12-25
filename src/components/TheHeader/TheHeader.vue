<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { useSessionStore } from '@/stores/session'

const sessionStore = useSessionStore()
const router = useRouter()

const { logout, user } = sessionStore

const searchGame = ref('')

function redirectGame() {
	// FIXME: not working very well :[
	router.push({ name: 'games', query: { search: searchGame.value } })
}

async function signout() {
	await logout()
	router.push({ name: 'login' })
}
</script>

<template>
	<header class="px-3 mb-3 border-bottom">
		<div class="container">
			<div class="d-flex flex-row justify-content-between">
				<ul class="page-links nav mb-2 justify-content-center mb-md-0">
					<li>
						<router-link
							:to="{ name: 'home' }"
							class="nav-link px-2 link-dark"
							:class="{ active: $route.name === 'home' }">
							Home
						</router-link>
					</li>
					<li>
						<router-link
							:to="{ name: 'games' }"
							class="nav-link px-2 link-dark"
							:class="{ active: $route.name === 'games' }">
							Games
						</router-link>
					</li>
					<li>
						<router-link
							:to="{ name: 'store' }"
							class="nav-link px-2 link-dark"
							:class="{ active: $route.name === 'store' }">
							Store
						</router-link>
					</li>
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
					<form class="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3" role="search">
						<input
							type="search"
							class="form-control"
							placeholder="Search..."
							aria-label="Search"
							v-model="searchGame"
							@keyup.enter="redirectGame" />
					</form>

					<div class="dropdown text-end">
						<router-link
							to="#"
							class="d-block link-dark text-decoration-none dropdown-toggle"
							data-bs-toggle="dropdown"
							aria-expanded="false">
							<img
								src="/src/assets/default_user.svg"
								alt="user image"
								width="32"
								height="32"
								class="rounded-circle" />
						</router-link>
						<ul class="dropdown-menu text-small">
							<li>
								<div class="user-info">
									<p class="username">{{ user?.name }}</p>
									<hr class="hr" />
									<div class="money-div d-flex flex-row">
										<img
											src="/src/assets/coins.svg"
											alt="user coins"
											width="30" />
										<span>{{ user?.coins ?? 0 }}</span>
									</div>
									<div class="xp-div d-flex flex-row">
										<img src="/src/assets/xp.svg" alt="user xp" width="35" />
										<div
											class="progress"
											role="progressbar"
											aria-label="Basic example"
											aria-valuenow="33"
											aria-valuemin="0"
											aria-valuemax="100">
											<div class="progress-bar" style="width: 33%"></div>
										</div>
									</div>
								</div>
								<hr class="hr" />
							</li>
							<li>
								<router-link to="#" class="dropdown-item">
									<i class="bi bi-person-circle mx-1"></i>
									Profile
								</router-link>
							</li>
							<li>
								<router-link to="#" class="dropdown-item">
									<i class="bi bi-gear mx-1"></i>
									Settings
								</router-link>
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
</template>

<style scoped src="./TheHeader.scss"></style>
