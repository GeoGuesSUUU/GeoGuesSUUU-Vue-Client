<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const searchGame = ref('')

function redirectGame() {
	// FIXME: not working very well :[
	router.push({ name: 'game', query: { search: searchGame.value } })
}
</script>

<template>
	<header class="px-3 mb-3 border-bottom">
		<div class="container">
			<div class="d-flex flex-row justify-content-between">
				<ul class="page-links nav mb-2 justify-content-center mb-md-0">
					<li>
						<router-link
							to="/"
							class="nav-link px-2 link-dark"
							:class="{ active: $route.name === 'home' }">
							Home
						</router-link>
					</li>
					<li>
						<router-link
							to="/games"
							class="nav-link px-2 link-dark"
							:class="{ active: $route.name === 'games' }">
							Games
						</router-link>
					</li>
					<li>
						<router-link
							to="/store"
							class="nav-link px-2 link-dark"
							:class="{ active: $route.name === 'store' }">
							Store
						</router-link>
					</li>
				</ul>
				<div class="app-logo-div">
					<router-link
						to="/"
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
								src="https://github.com/mdo.png"
								alt="mdo"
								width="32"
								height="32"
								class="rounded-circle" />
						</router-link>
						<ul class="dropdown-menu text-small">
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
								<router-link to="#" class="dropdown-item" href>
									<i class="bi bi-box-arrow-right mx-1"></i>
									Sign out
								</router-link>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	</header>
</template>

<style scoped src="./TheHeader.scss"></style>
