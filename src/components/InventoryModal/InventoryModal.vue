<script setup lang="ts">
import { computed, ref, toRefs } from 'vue'
import { eventEmitter } from '@/client/services/event-service'
import { useGeoguessuuuStore } from '@/stores/geoguessuuu'
import { CountryService } from '../../client/services/country-service'
import type { CountryApp, ItemSlot } from '../../client/types/bussiness'

const geoStore = useGeoguessuuuStore()

const { currentUser, countries } = toRefs(geoStore)
const selectValue = ref('all')
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

async function submit(): Promise<void> {
	// if (!target.value || !selectedItem.value) return

	// if (selectValue.value === 'attack') {
	// 	const country = await CountryService.attack(
	// 		target.value,
	// 		selectedItem.value.itemType
	// 	)
	// } else if (selectValue.value === 'support') {
	// 	const country = await CountryService.support(
	// 		target.value,
	// 		selectedItem.value.itemType
	// 	)
	// } else if (selectValue.value === 'equipment') {
	// 	await CountryService.addEquipment(target.value, selectedItem.value.itemType)
	// }
}

eventEmitter.on(
	'@CallModalInventory',
	(res: { type: string; countryId: number }) => {
		selectValue.value = res.type
		target.value =
			countries.value.find((_country) => _country.id === res.countryId) ?? null
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
					<div class="row row-cols-1 row-cols-md-3 row-cols-lg-5 g-4 inventory">
						<div
							v-for="item of items"
							:key="item.itemType.id"
							@click="setSelectedItem(item)"
							class="col d-flex justify-content-center">
							<div
								class="card h-100"
								:class="{
									selectedItem: item.itemType.id === selectedItem?.itemType.id,
								}"
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
				<div class="modal-footer">
					<button
						type="button"
						class="btn btn-secondary"
						data-bs-dismiss="modal">
						Close
					</button>
					<button
						v-if="target"
						type="button"
						class="btn btn-primary"
						@click="submit()">
						Save changes
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped src="./InventoryModal.scss"></style>
