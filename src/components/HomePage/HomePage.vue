<script setup lang="ts">
import svgMap from 'svgmap'
import { onMounted, ref, toRefs } from 'vue'
import {
	DEFAULT_COUNTRY_VALUE,
	DEFAULT_COUNTRIES_VALUE,
} from '@/assets/default_countries'
import { CountryService } from '@/client/services/country-service'
import type { Country, CountryApp } from '@/client/types/bussiness'
import { useGeoguessuuuStore } from '@/stores/geoguessuuu'
import { NotifyService, NotifyType } from '../../client/services/notify-service'
import MainGameSideBar from '@/components/MainGameSideBar/MainGameSideBar.vue'

const geoStore = useGeoguessuuuStore()

const { currentUser, countries } = toRefs(geoStore)
const { upsetCountries } = geoStore

const map = ref(null)

const mapValue = ref<Record<string, object>>({})

const offCanvasValues = ref<CountryApp | null>(null)

const disabledReloadButton = ref<boolean>(false)

function updateMap(): void {
	const values = Object.assign(DEFAULT_COUNTRIES_VALUE, mapValue.value)
	map.value = new svgMap({
		targetElementID: 'svgMap',
		showContinentSelector: false,
		showZoomReset: true,
		mouseWheelZoomEnabled: true,
		hideFlag: false,
		data: {
			data: {
				owner: {
					name: 'Owner',
					format: '{0}',
				},
				life: {
					name: 'Life',
					format: '{0}',
				},
				shield: {
					name: 'Shield',
					format: '{0}',
				},
				price: {
					name: 'Price',
					format: '{0}',
				},
			},
			applyData: 'owner',
			values,
		},
	})
	document.getElementById('svgMap')?.childNodes[1]?.remove()
	const svgCountry = document.getElementsByClassName('svgMap-country') ?? []
	for (const country of svgCountry) {
		country.setAttribute('data-bs-toggle', 'offcanvas')
		country.setAttribute('href', '#offcanvasExample')
		country.setAttribute('role', 'button')
		country.setAttribute('aria-controls', 'offcanvasExample')
	}
}

function getColor(country: Country) {
	let start = '#FF0'
	if (country.user) {
		start = country.user.id === currentUser.value.id ? '#0F0' : '#F00'
	}
	const end = Math.round((country.life * 15) / country.lifeMax).toString(16)
	return start + end
}

async function getCountriesData() {
	NotifyService.notify(
		'Fetching countries data..., please wait !',
		NotifyType.INFO
	)
	disabledReloadButton.value = true
	try {
		const countries = await CountryService.getCountries()

		upsetCountries(countries)
		const data = {}
		for (const country of countries) {
			data[country.code] = {
				...DEFAULT_COUNTRY_VALUE,
				owner: country.user?.name,
				color: getColor(country),
				life: `${country.life} / ${country.lifeMax}`,
				shield: `${country.shield} / ${country.shieldMax}`,
				price: `${country.price} coins`,
			}
		}
		mapValue.value = data
		updateMap()
		disabledReloadButton.value = false
		NotifyService.notify('Countries data fetch complete !', NotifyType.SUCCESS)
	} catch (error) {
		disabledReloadButton.value = false
		NotifyService.notify('Countries data fetch failed !', NotifyType.DANGER)
	}
}

onMounted(() => {
	updateMap()
	getCountriesData()

	const myOffcanvas = document.getElementById('offcanvasExample')
	myOffcanvas?.addEventListener('show.bs.offcanvas', (event: Event) => {
		const id = (<Element>(<any>event).relatedTarget).getAttribute('data-id')
		const target = countries.value.find((_country: Country) => _country.code === id) ?? null
		offCanvasValues.value = target
	})
})
</script>

<template>
	<div class="px-4 pt-5 my-5 text-center border-bottom">
		<h1 class="display-4 fw-bold">World Map</h1>
		<div class="col-lg-6 mx-auto">
			<p class="lead mb-4">Buy, protect and attack countries in the world !</p>
		</div>
		<div class="my-3 d-flex justify-content-end">
			<div class="btn-group" role="group" aria-label="Basic outlined example">
				<button
					type="button"
					title="Reload map data"
					class="btn btn-outline-secondary"
					:disabled="disabledReloadButton"
					@click="getCountriesData()">
					<i class="bi bi-arrow-clockwise"></i>
				</button>
				<button
					type="button"
					title="Claim all rewards"
					class="btn btn-outline-secondary">
					<i class="bi bi-coin"></i>
				</button>
				<div class="btn-group" role="group">
					<button
						type="button"
						class="btn btn-secondary dropdown-toggle"
						data-bs-toggle="dropdown"
						aria-expanded="false">
						Legend
					</button>
					<ul class="dropdown-menu">
						<li>
							<div class="p-2">
								<table aria-describedby="" class="table">
									<thead>
										<th scope="col">Color</th>
										<th scope="col">State</th>
									</thead>
									<tbody>
										<tr>
											<td>
												<div
													class="legend-color"
													style="background-color: #ff0" />
											</td>
											<td>No Owner</td>
										</tr>
										<tr>
											<td>
												<div
													class="legend-color"
													style="background-color: #0f0" />
											</td>
											<td>You</td>
										</tr>
										<tr>
											<td>
												<div
													class="legend-color"
													style="background-color: #f00" />
											</td>
											<td>Others</td>
										</tr>
										<tr>
											<td>
												<div
													class="legend-color"
													style="background-color: #ccc" />
											</td>
											<td>Unavailable</td>
										</tr>
									</tbody>
								</table>
							</div>
						</li>
						<li>
							<a class="dropdown-item" href="#">
								<i class="bi bi-palette"></i>
								Change Colors
							</a>
						</li>
					</ul>
				</div>
			</div>
		</div>
		<div class="mb-5">
			<div class="card px-5 border rounded-3 shadow-lg">
				<div id="svgMap"></div>
			</div>
		</div>
	</div>

	<div
		class="offcanvas offcanvas-start"
		tabindex="-1"
		id="offcanvasExample"
		data-bs-scroll="true"
		data-bs-backdrop="false"
		aria-labelledby="offcanvasExampleLabel">
		<div class="offcanvas-header">
			<h5 class="offcanvas-title" id="offcanvasExampleLabel">{{ offCanvasValues?.name }}</h5>
			<button
				type="button"
				class="btn-close"
				data-bs-dismiss="offcanvas"
				aria-label="Close"></button>
		</div>
		<div class="offcanvas-body">
			<MainGameSideBar v-if="offCanvasValues" :country="offCanvasValues"></MainGameSideBar>
			<p v-else>No Data :[</p>
		</div>
	</div>
</template>

<style scoped src="./HomePage.scss"></style>
