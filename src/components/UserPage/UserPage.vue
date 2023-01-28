<script setup lang="ts">
import { onMounted, ref, toRefs, computed } from 'vue'
import { useRouter } from 'vue-router'
import { UserService } from '@/client/services/user-service'
import type { UserApp, Score } from '@/client/types/bussiness'
import { useGeoguessuuuStore } from '@/stores/geoguessuuu'
import InventoryCard from '../InventoryCard/InventoryCard.vue'
import CountryCard from './components/CountryCard/CountryCard.vue'
import ScoreCard from './components/ScoreCard/ScoreCard.vue'

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

const scoreBest = computed<Score[]>(() => {
	if (!user.value) return []
	const best: Score[] = []
	user.value.scores.forEach((score) => {
		const index = best.findIndex((o) => o.level.id === score.level.id)
		if (index !== -1) {
			if (
				best[index].score < score.score ||
				(best[index].score === score.score && best[index].time > score.time)
			)
				best[index] = score
		} else best.push(score)
	})
	return best
})

function getLevelLabelByXP(user: UserApp) {
	const min = user.levelXpMin
	const xp = user.xp
	const max = user.levelXpMax
	return `${xp - min} / ${max - min} (${user.levelProgress}%)`
}
</script>

<template>
	<div class="card main-card">
		<div class="card-body">
			<div v-if="user" class="user-info">
				<img
					:src="user.img ?? '/src/assets/default_user.svg'"
					alt="user icon"
					class="user-pic" />
				<div class="user-info-stat">
					<h2>
						{{ user?.name }}
						<i
							v-if="user?.isVerified"
							title="Verified User"
							class="bi bi-patch-check-fill"></i>
						<i
							v-if="user?.isAdmin"
							title="Admin"
							class="bi bi-globe-americas ps-2 text-secondary"></i>
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
				<h1 class="mt-3">
					Inventory
					<span v-if="user?.userItems" class="fs-4 badge bg-secondary">
						{{ user?.userItems.length }}
					</span>
				</h1>
				<hr class="hr" />
				<div
					class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 row-cols-xxl-6 g-4">
					<div
						v-for="item of user?.userItems"
						:key="item.itemType.id"
						class="col d-flex justify-content-center">
						<InventoryCard :item="item"></InventoryCard>
					</div>
				</div>
			</div>
			<div class="countries">
				<h1 class="mt-3">
					Countries
					<span v-if="user" class="fs-4 badge bg-secondary">
						{{ user.countries.length }}
					</span>
				</h1>
				<hr class="hr" />
				<div class="user-country-list overflow-x-auto">
					<div class="d-inline-flex">
						<CountryCard
							v-for="country of user?.countries"
							:key="country.id"
							:country="country"
							:locale="currentUser.locale"></CountryCard>
					</div>
				</div>
			</div>
			<div class="scores">
				<h1 class="mt-3">
					Best Score
					<span v-if="user" class="fs-4 badge bg-secondary">
						{{ scoreBest.length }}
					</span>
				</h1>
				<hr class="hr" />
				<div class="user-score-list overflow-x-auto">
					<div class="d-inline-flex">
						<ScoreCard
							v-for="score of scoreBest"
							:key="score.id"
							:score="score"
							:locale="currentUser.locale"></ScoreCard>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped src="./UserPage.scss"></style>
