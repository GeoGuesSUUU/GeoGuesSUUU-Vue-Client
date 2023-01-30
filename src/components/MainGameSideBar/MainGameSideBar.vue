<script setup lang="ts">
import {
	ref,
	toRefs,
	onUpdated,
	onBeforeUnmount,
	onMounted,
	computed,
} from 'vue'
import { RouterLink } from 'vue-router'
import { CountryService } from '@/client/services/country-service'
import {
	callModalInventoryEmit,
	callModalMonumentEmit,
	updateCountryEmit,
} from '@/client/services/event-service'
import { NotifyService, NotifyType } from '@/client/services/notify-service'
import type { CountryApp } from '@/client/types/bussiness'
import { useGeoguessuuuStore } from '@/stores/geoguessuuu'

const geoStore = useGeoguessuuuStore()

const { currentUser } = toRefs(geoStore)
const { upsetCountry, addItemsInInventory, updateClaimDate, withdrawCoins } =
	geoStore

const ps = defineProps<{
	country: CountryApp
	locale?: string
}>()

const emit = defineEmits(['update-map'])

const props = ref(ps)

const dateLabel = computed(() => {
	const d = new Date(props.value.country.ownedAt).getTime()
	if (d > new Date().getTime()) return `no date`

	return new Date(props.value.country.ownedAt).toLocaleDateString(
		props.value.locale ?? 'en-US',
		{
			weekday: 'long',
			year: 'numeric',
			month: 'long',
			day: 'numeric',
			hour: '2-digit',
			minute: '2-digit',
			second: '2-digit',
		}
	)
})

async function buyCountry() {
	try {
		const country = await CountryService.buy(
			props.value.country,
			currentUser.value
		)
		withdrawCoins(props.value.country.price)
		upsetCountry(country)
		updateCountryEmit(country)
		emit('update-map')
		NotifyService.notify(
			`You have bought ${props.value.country.name} succefully`,
			NotifyType.SUCCESS
		)
	} catch (error: any) {
		console.error(error)
		NotifyService.notify(error.message, NotifyType.WARNING)
	}
}

const remainingTime = ref(0)
const interval = ref<number>(0)

onMounted(() => {
	if (props.value.country.user?.id === currentUser.value.id) {
		remainingTime.value = (() => {
			const date = new Date(props.value.country.claimDate).getTime()
			const res = date + 86400000 - new Date().getTime()
			return res > 0 ? res : 0
		})()
		interval.value = window.setTimeout(() => {
			if (remainingTime.value > 0) remainingTime.value--
		}, 1000)
	}

	const inventoryModal = document.getElementById('inventoryModal')
	inventoryModal?.addEventListener('show.bs.modal', (event: any) => {
		const button: Element = event.relatedTarget
		const type = button.getAttribute('data-bs-type')
		const countryId = button.getAttribute('data-bs-country-id')
		if (type && countryId) callModalInventoryEmit(type, +countryId)
	})

	const monumentModal = document.getElementById('monumentModal')
	monumentModal?.addEventListener('show.bs.modal', (event: any) => {
		const button: Element = event.relatedTarget
		const countryId = button.getAttribute('data-bs-country-id')
		if (countryId) callModalMonumentEmit(+countryId)
	})
})

onUpdated(() => {
	clearTimeout(interval.value)
	if (props.value.country.user?.id === currentUser.value.id) {
		remainingTime.value = (() => {
			const date = new Date(props.value.country.claimDate).getTime()
			const res = date + 86400000 - new Date().getTime()
			return res > 0 ? res : 0
		})()

		interval.value = window.setTimeout(() => {
			if (remainingTime.value > 0) remainingTime.value--
		}, 1000)
	}
})

onBeforeUnmount(() => {
	clearTimeout(interval.value)
})

function getRemainingTime(): string {
	const d = new Date(0)
	d.setSeconds(remainingTime.value / 1000)
	return d.toISOString().substring(11, 19)
}

async function claimById() {
	try {
		const rewards = await CountryService.claim(props.value.country.id)

		if (currentUser.value.coins) {
			currentUser.value.coins += rewards.coins
		}

		if (rewards.items.length > 0) {
			addItemsInInventory(rewards.items)
		}

		props.value.country.claimDate = new Date()
		remainingTime.value = Date.now() + 86400000 - new Date().getTime()
		updateClaimDate(props.value.country.id)

		NotifyService.notify(
			`You have obtained ${rewards.coins} coins` +
				(rewards.items.length > 0 ? ` and ${rewards.items.length} items` : '')
		)
	} catch (error: any) {
		NotifyService.notify(error.message, NotifyType.WARNING)
	}
}
</script>

<template>
	<div class="d-flex flex-column justify-content-center align-items-center">
		<img
			crossorigin="anonymous"
			:src="props.country.flag"
			class="country-flag object-fit-cover border rounded"
			alt="country flag"
			height="200" />

		<div class="pt-3 w-100">
			<div class="country-life mt-3 d-flex flex-row">
				<img src="/src/assets/heal.svg" alt="user xp" width="35" />
				<div class="d-flex mx-2 flex-column w-100 align-content-center">
					<div
						class="progress"
						role="progressbar"
						:class="{
							criticalLifeBar: (props.country.lifePercentage * 15) / 100 <= 1,
						}">
						<div
							class="progress-bar progress-heal progress-dynamic"
							:class="{ ownerless: !props.country.user }"
							:style="`width: ${props.country.lifePercentage}%`"></div>
					</div>
					<p class="m-0 life-shield-label">
						{{
							`${props.country.life} / ${props.country.lifeMax} (${props.country.lifePercentage}%)`
						}}
					</p>
				</div>
			</div>

			<div class="country-shield mt-3 d-flex flex-row">
				<img src="/src/assets/shield.svg" alt="user xp" width="35" />
				<div class="d-flex mx-2 flex-column w-100 align-content-center">
					<div class="progress" role="progressbar">
						<div
							class="progress-bar progress-shield progress-dynamic"
							:style="`width: ${props.country.shieldPercentage}%`"></div>
					</div>
					<p class="m-0 level-label">
						{{
							`${props.country.shield} / ${props.country.shieldMax} (${props.country.shieldPercentage}%)`
						}}
					</p>
				</div>
			</div>
		</div>

		<div class="my-2">
			<button type="button" class="btn btn-outline-secondary mx-2">
				<img src="/src/assets/effect.svg" alt="country-price" width="30" />
				Effects
			</button>
			<button
				type="button"
				class="btn btn-outline-secondary mx-2"
				data-bs-toggle="modal"
				data-bs-target="#monumentModal"
				:data-bs-country-id="props.country.id">
				<img src="/src/assets/monument.svg" alt="country-price" width="30" />
				Monuments
			</button>
		</div>

		<div class="card w-100">
			<div class="card-body">
				<div class="d-flex flex-column align-items-center">
					<router-link
						v-if="props.country.user"
						:to="{ name: 'user', params: { id: props.country.user.id } }">
						<img
							class="rounded-circle"
							:src="props.country.user?.img ?? `/src/assets/default_user.svg`"
							width="50"
							height="50"
							alt="user image" />
					</router-link>
					<img
						v-else
						class="rounded-circle"
						src="/src/assets/default_user.svg"
						width="50"
						height="50"
						alt="user image" />
					<table aria-describedby="" class="table">
						<tbody>
							<tr>
								<th scope="row">Owner :</th>
								<td>{{ props.country.user?.name ?? 'undefined' }}</td>
							</tr>
							<tr>
								<th scope="row">Owned At :</th>
								<td>
									{{ dateLabel }}
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>

		<button
			type="button"
			title="buy"
			:class="{ owner: props.country.user?.id === currentUser.id }"
			class="w-100 my-3 d-flex flex-row align-items-center justify-content-center c-price"
			@click="buyCountry()">
			<img src="/src/assets/coins.svg" alt="country-price" width="30" />
			<span class="mx-2 fs-4">{{ props.country.price }} coins</span>
		</button>

		<div class="btn-commands container text-center">
			<div class="row row-cols-2">
				<div class="col">
					<button
						type="button"
						class="btn support"
						data-bs-toggle="modal"
						data-bs-target="#inventoryModal"
						data-bs-type="support"
						:data-bs-country-id="props.country.id"
						:disabled="props.country.user?.id !== currentUser.id">
						<img src="/src/assets/heal.svg" alt="country-price" width="30" />
						Support
					</button>
				</div>
				<div class="col">
					<button
						id="btn-attack"
						type="button"
						class="btn attack"
						data-bs-toggle="modal"
						data-bs-target="#inventoryModal"
						data-bs-type="attack"
						:data-bs-country-id="props.country.id"
						:disabled="
							!props.country.user || props.country.user.id === currentUser.id
						">
						<img src="/src/assets/attack.svg" alt="country-price" width="30" />
						Attack
					</button>
				</div>
				<div class="col">
					<button
						type="button"
						class="btn equipment"
						data-bs-toggle="modal"
						data-bs-target="#inventoryModal"
						data-bs-type="equipment"
						:data-bs-country-id="props.country.id"
						:disabled="props.country.user?.id !== currentUser.id">
						<img
							src="/src/assets/monument.svg"
							alt="country-price"
							width="30" />
						Equipment
					</button>
				</div>
				<div class="col">
					<button
						type="button"
						class="btn claim"
						:disabled="
							props.country.user?.id !== currentUser.id || remainingTime > 0
						"
						@click="claimById">
						<div
							v-if="
								props.country.user?.id === currentUser.id && remainingTime > 0
							">
							{{ getRemainingTime() }}
						</div>
						<div v-else>
							<img src="/src/assets/coins.svg" alt="country-price" width="30" />
							Claim
						</div>
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped src="./MainGameSideBar.scss"></style>
