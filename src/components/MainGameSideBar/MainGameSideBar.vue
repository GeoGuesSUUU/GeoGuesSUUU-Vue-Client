<script setup lang="ts">
import { ref, toRefs } from 'vue'
import { RouterLink } from 'vue-router'
import { useGeoguessuuuStore } from '@/stores/geoguessuuu'
import { CountryService } from '../../client/services/country-service'
import { NotifyService, NotifyType } from '../../client/services/notify-service'
import type { CountryApp } from '../../client/types/bussiness'

const geoStore = useGeoguessuuuStore()

const { currentUser } = toRefs(geoStore)
const { upsetCountry } = geoStore

const ps = defineProps<{
	country: CountryApp
	locale?: string
}>()

const emit = defineEmits(['update-map'])

const props = ref(ps)

function getLifeLabel(): string {
	return `${props.value.country.life} / ${props.value.country.lifeMax} (${props.value.country.lifePercentage}%)`
}

function getShieldLabel(): string {
	return `${props.value.country.shield} / ${props.value.country.shieldMax} (${props.value.country.shieldPercentage}%)`
}

function getDateLabel(): string {
	const d = new Date(props.value.country.ownedAt).getTime()
	const n = new Date(Date.now()).getTime()
	if (d > n) return `no date`

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
}

async function buyCountry() {
	try {
		const country = await CountryService.buy(props.value.country)
		upsetCountry(country)
		emit('update-map')
		NotifyService.notify(
			`You have bought ${props.value.country.name} succefully`,
			NotifyType.SUCCESS
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
					<div class="progress" role="progressbar">
						<div
							class="progress-bar progress-heal progress-dynamic"
							:style="`width: ${props.country.lifePercentage}%`"></div>
					</div>
					<p class="m-0 life-shield-label">{{ getLifeLabel() }}</p>
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
					<p class="m-0 level-label">{{ getShieldLabel() }}</p>
				</div>
			</div>
		</div>

		<div class="my-2">
			<button type="button" class="btn btn-outline-secondary mx-2">
				<img src="/src/assets/effect.svg" alt="country-price" width="30" />
				Effects
			</button>
			<button type="button" class="btn btn-outline-secondary mx-2">
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
							alt="user image" />
					</router-link>
					<img
						v-else
						class="rounded-circle"
						src="/src/assets/default_user.svg"
						width="50"
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
									{{ getDateLabel() }}
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
						:disabled="props.country.user?.id !== currentUser.id">
						<img src="/src/assets/heal.svg" alt="country-price" width="30" />
						Support
					</button>
				</div>
				<div class="col">
					<button
						type="button"
						class="btn attack"
						:disabled="props.country.user?.id === currentUser.id">
						<img src="/src/assets/attack.svg" alt="country-price" width="30" />
						Attack
					</button>
				</div>
				<div class="col">
					<button
						type="button"
						class="btn equipment"
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
						:disabled="props.country.user?.id !== currentUser.id">
						<img src="/src/assets/coins.svg" alt="country-price" width="30" />
						Claim
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped src="./MainGameSideBar.scss"></style>
