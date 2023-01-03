<script setup lang="ts">
import { onMounted, ref, toRefs } from 'vue'
import { useRouter } from 'vue-router'
import { UserService } from '@/client/services/user-service'
import type { UserApp } from '@/client/types/bussiness'
import { useGeoguessuuuStore } from '@/stores/geoguessuuu'

const geoStore = useGeoguessuuuStore()
const router = useRouter()

const { currentUser } = toRefs(geoStore)

const user = ref<UserApp | null>(null)

onMounted(async () => {
	const userId = +router.currentRoute.value.params.id
	if (userId !== currentUser.value.id) {
		user.value = await UserService.getUserById(userId)
	} else {
		user.value = currentUser.value
	}
})

function getLevelLabelByXP(user: UserApp) {
	const min = user.levelXpMin
	const xp = user.xp
	const max = user.levelXpMax
	return `${xp - min} / ${max - min} (${user.levelProgress}%)`
}
</script>

<template>
	<main>
		<div class="card main-card">
			<div class="card-body">
				<div v-if="user" class="user-info">
					<img
						src="/src/assets/default_user.svg"
						alt="user icon"
						class="user-pic" />
					<div class="user-info-stat">
						<h2>
							{{ user?.name }}
							<i
								v-if="user?.isVerified"
								title="Verified User"
								class="bi bi-patch-check-fill"></i>
						</h2>
						<div class="xp-div d-flex flex-row">
							<img src="/src/assets/xp.svg" alt="user xp" width="40" />
							<div>
								<div class="progress" role="progressbar">
									<div
										class="progress-bar"
										:style="`width: ${user?.levelProgress}%`"></div>
								</div>
								<p v-if="user" class="level-label">
									{{ getLevelLabelByXP(user) }}
								</p>
							</div>
							<span class="level-badge badge text-bg-primary">
								Lvl. {{ user?.level }}
							</span>
						</div>
						<div
							v-if="currentUser.id === user?.id"
							class="money-div d-flex flex-row">
							<img src="/src/assets/coins.svg" alt="user coins" width="35" />
							<span>{{ user?.coins ?? 0 }}</span>
						</div>
					</div>
					<div class="profile-setting">
						<button type="button" class="btn btn-secondary">
							<i class="bi bi-gear-fill"></i>
						</button>
					</div>
				</div>
				<div v-if="currentUser.id === user?.id" class="inventory">
					<h1 class="mt-3">Inventory</h1>
					<hr class="hr" />
					<div class="row row-cols-1 row-cols-md-3 row-cols-lg-5 g-4">
						<div
							v-for="item of user?.userItems"
							:key="item.itemType.id"
							class="col d-flex justify-content-center">
							<div
								class="card h-100"
								:style="`--inventory-card-color: var(--rarety-${item.itemType.rarity.toLocaleLowerCase()})`">
								<div class="card-header">
									{{ item.itemType.rarity.toLocaleUpperCase() }}
								</div>
								<img
									src="/src/assets/item-default-img.jpg"
									class="card-img-top"
									alt="item image" />
								<div class="card-body">
									<h5 class="card-title">
										{{ item.itemType.name }}
										<span v-if="!item.itemType.fantastic" class="badge">
											x{{ item.quantity }}
										</span>
									</h5>
									<p class="card-text">
										{{ item.itemType.description }}
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</main>
</template>

<style scoped src="./UserPage.scss"></style>