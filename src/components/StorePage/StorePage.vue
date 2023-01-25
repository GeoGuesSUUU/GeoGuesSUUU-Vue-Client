<script setup lang="ts">
import { onMounted, toRefs } from 'vue'
import { NotifyService, NotifyType } from '@/client/services/notify-service'
import { StoreService } from '@/client/services/store-service'
import type { ItemStore } from '@/client/types/bussiness'
import { useGeoguessuuuStore } from '@/stores/geoguessuuu'
import ItemCard from './ItemCard/ItemCard.vue'

const geoStore = useGeoguessuuuStore()

const { currentUser, itemsStore } = toRefs(geoStore)
const { addItemsInInventory, upsetItemsStore } = geoStore

async function buy(item: ItemStore) {
	try {
		const user = await StoreService.buy(item.id)
		if (user && currentUser.value.coins) {
			currentUser.value.coins -= item.promoPrice
			addItemsInInventory([
				{
					itemType: item.item,
					quantity: 1,
				},
			])
		}

		NotifyService.notify(
			`You have bought "${item.item.name}" succefully`,
			NotifyType.SUCCESS
		)
	} catch (error: any) {
		console.error(error)
		NotifyService.notify(error.message, NotifyType.WARNING)
	}
}

onMounted(async () => {
	upsetItemsStore(await StoreService.getItemsStore())
})
</script>

<template>
	<div class="mx-5 my-3">
		<div
			class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 row-cols-xxl-6 g-4">
			<div
				v-for="item of itemsStore"
				:key="item.item.id"
				class="col d-flex justify-content-center">
				<ItemCard :item="item" @buy-item="buy($event)"></ItemCard>
			</div>
		</div>
	</div>
</template>

<style scoped src="./StorePage.scss"></style>
