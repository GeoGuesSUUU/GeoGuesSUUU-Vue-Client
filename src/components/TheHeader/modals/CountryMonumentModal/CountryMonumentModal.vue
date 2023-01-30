<script setup lang="ts">
import { ref, toRefs } from 'vue'
import { eventEmitter } from '@/client/services/event-service'
import type { CountryApp } from '@/client/types/bussiness'
import InventoryCard from '@/components/InventoryCard/InventoryCard.vue'
import { useGeoguessuuuStore } from '@/stores/geoguessuuu'

const geoStore = useGeoguessuuuStore()

const { countries } = toRefs(geoStore)

const country = ref<CountryApp | null>(null)

eventEmitter.on('@CallModalMonument', (res: { countryId: number }) => {
	country.value =
		countries.value.find((_country) => _country.id === res.countryId) ?? null
})
</script>

<template>
	<div
		class="modal fade"
		id="monumentModal"
		tabindex="1051"
		aria-labelledby="monumentModalLabel"
		aria-hidden="true">
		<div class="modal-dialog modal-dialog-centered modal-xl">
			<div class="modal-content">
				<div class="modal-header">
					<h1 class="modal-title fs-5" id="monumentModalLabel">Monuments</h1>
					<button
						type="button"
						class="btn-close"
						data-bs-dismiss="modal"
						aria-label="Close"></button>
				</div>
				<div class="modal-body">
					<div
						v-if="country"
						class="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 row-cols-xxl-5 g-4 inventory">
						<div
							v-for="item of country.countryItems"
							:key="item.itemType.id"
							class="col d-flex justify-content-center">
							<InventoryCard :item="item"></InventoryCard>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped src="./CountryMonumentModal.scss"></style>
