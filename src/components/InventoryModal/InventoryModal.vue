<script setup lang="ts">
import { computed, ref, toRefs } from 'vue'
import { CountryService } from '@/client/services/country-service'
import {
	eventEmitter,
	upWorldMapEmit,
	updateCountryEmit,
} from '@/client/services/event-service'
import { NotifyService, NotifyType } from '@/client/services/notify-service'
import { useGeoguessuuuStore } from '@/stores/geoguessuuu'
import type { CountryApp, ItemSlot } from '../../client/types/bussiness'
import InventoryCard from '../InventoryCard/InventoryCard.vue'

const geoStore = useGeoguessuuuStore()

const { currentUser, countries } = toRefs(geoStore)
const { removeItemInInventory, updateLifeAndShield, updateAfterAttack } =
	geoStore
const selectValue = ref('all')
const action = ref<string | null>(null)
const target = ref<CountryApp | null>(null)
const selectedItem = ref<ItemSlot | null>(null)

const items = computed(() => {
	if (selectValue.value === 'all') return currentUser.value.userItems

	return currentUser.value.userItems?.filter(
		(_item) => _item.itemType.type === selectValue.value
	)
})

function filterItems() {
	items.effect.run()
}

function setSelectedItem(item: ItemSlot) {
	if (selectedItem.value?.itemType.id === item.itemType.id) {
		selectedItem.value = null
		return
	}
	selectedItem.value = item
}

async function attackCountry(): Promise<void> {
	if (!target.value || !selectedItem.value) return
	try {
		const country = await CountryService.attack(
			target.value,
			selectedItem.value.itemType
		)

		removeItemInInventory(selectedItem.value)
		updateAfterAttack(country)
		updateCountryEmit(country)
		upWorldMapEmit()
		NotifyService.notify('The attack was a success !', NotifyType.SUCCESS)
	} catch (error: any) {
		NotifyService.notify(error.message, NotifyType.WARNING)
	}
}

async function supportCountry(): Promise<void> {
	if (!target.value || !selectedItem.value) return
	try {
		const country = await CountryService.support(
			target.value,
			selectedItem.value.itemType
		)

		removeItemInInventory(selectedItem.value)
		updateLifeAndShield(country)
		updateCountryEmit(country)
		upWorldMapEmit()
		NotifyService.notify('The support was a success !', NotifyType.SUCCESS)
	} catch (error: any) {
		NotifyService.notify(error.message, NotifyType.WARNING)
	}
}

async function equipCountry(): Promise<void> {
	if (!target.value || !selectedItem.value) return
	try {
		await CountryService.addEquipment(target.value, selectedItem.value.itemType)

		removeItemInInventory(selectedItem.value)
		NotifyService.notify('The equipment has been added !', NotifyType.SUCCESS)
	} catch (error: any) {
		NotifyService.notify(error.message, NotifyType.WARNING)
	}
}

function submit(): void {
	if (action.value === 'attack') {
		attackCountry()
	} else if (action.value === 'support') {
		supportCountry()
	} else if (action.value === 'equipment') {
		equipCountry()
	}
}

eventEmitter.on(
	'@CallModalInventory',
	(res: { type: string; countryId: number }) => {
		selectValue.value = res.type
		target.value =
			countries.value.find((_country) => _country.id === res.countryId) ?? null
		action.value = res.type
		filterItems()
	}
)
</script>

<template>
	<div
		class="modal fade"
		id="inventoryModal"
		tabindex="1051"
		aria-labelledby="inventoryModalLabel"
		aria-hidden="true">
		<div class="modal-dialog modal-dialog-centered modal-xl">
			<div class="modal-content">
				<div class="modal-header">
					<h1 class="modal-title fs-5" id="inventoryModalLabel">Inventory</h1>
					<button
						type="button"
						class="btn-close"
						data-bs-dismiss="modal"
						aria-label="Close"></button>
				</div>
				<div class="modal-body">
					<select
						class="form-select"
						aria-label="Default select example"
						v-model="selectValue"
						@change="filterItems()">
						<option value="all">All</option>
						<option value="attack">Attack</option>
						<option value="support">Support</option>
						<option value="equipment">Equipment</option>
					</select>
					<hr class="hr" />
					<div
						class="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 row-cols-xxl-5 g-4 inventory">
						<div
							v-for="item of items"
							:key="item.itemType.id"
							@click="setSelectedItem(item)"
							class="col d-flex justify-content-center">
							<InventoryCard
								:item="item"
								:class="{
									selectedItem: item.itemType.id === selectedItem?.itemType.id,
								}"></InventoryCard>
						</div>
					</div>
				</div>
				<div class="modal-footer">
					<button
						type="button"
						class="btn btn-secondary"
						data-bs-dismiss="modal">
						Close
					</button>
					<button
						v-if="target && action"
						type="button"
						class="btn btn-primary"
						@click="submit()"
						:disabled="!selectedItem"
						data-bs-dismiss="modal">
						{{ action.toUpperCase() }}
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped src="./InventoryModal.scss"></style>
