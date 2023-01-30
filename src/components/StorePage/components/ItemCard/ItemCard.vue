<script setup lang="ts">
import { ref } from 'vue'
import type { ItemStore } from '@/client/types/bussiness'
import { useGeoguessuuuStore } from '@/stores/geoguessuuu'

const geoStore = useGeoguessuuuStore()

const { getItemImage } = geoStore

const ps = defineProps<{
	item: ItemStore
	classElement?: Record<string, string>
}>()
const props = ref(ps)

const emit = defineEmits(['buy-item'])

function buyItem() {
	emit('buy-item', props.value.item)
}
</script>

<template>
	<div
		:class="{ trending: props.item.trending }"
		class="card h-100 w-100"
		:style="`--inventory-card-color: var(--rarety-${props.item.itemType.rarity.toLocaleLowerCase()}); --shadow-card-rgb: var(--rarety-${props.item.itemType.rarity.toLocaleLowerCase()}-lighter-rgb);`">
		<img
			v-if="props.item.trending"
			src="/src/assets/trends.svg"
			alt="trend icon"
			class="trend-icon" />
		<div class="card-header">
			<span>{{ props.item.itemType.rarity.toLocaleUpperCase() }}</span>
			<i
				v-if="props.item.itemType.fantastic"
				class="bi bi-star-fill"
				title="unique"></i>
		</div>
		<div class="p-2 d-flex justify-content-center">
			<img
				:src="getItemImage(props.item.itemType)"
				:class="
					!props.item.itemType.img ||
					props.item.itemType.img.startsWith('/assets/img/')
						? 'px-5 py-2'
						: ''
				"
				class="card-img-top"
				alt="item image" />
		</div>
		<hr class="m-0" />
		<div class="card-body">
			<h5 class="card-title">
				{{ props.item.itemType.name }}
			</h5>
			<p class="card-text">
				{{ props.item.itemType.description }}
			</p>
		</div>
		<hr class="m-0" />
		<div class="card-price d-flex flex-column">
			<div class="d-flex flex-row mt-2 justify-content-md-between">
				<div class="d-flex flex-row align-items-center">
					<img src="/src/assets/coins.svg" alt="user coins" class="coins" />
					<div class="d-flex flex-column">
						<small v-if="props.item.itemType.price !== props.item.promoPrice">
							{{ props.item.itemType.price }}
						</small>
						<span class="fs-5">{{ props.item.promoPrice }}</span>
					</div>
				</div>
			</div>

			<button
				type="button"
				class="buy-btn btn btn-primary my-3 mx-4"
				v-on:click="buyItem()">
				Buy
				<span v-if="props.item.promotion" class="promo fs-5">
					<strong>-{{ props.item.promotion }}%</strong>
				</span>
			</button>
		</div>
	</div>
</template>

<style scoped src="./ItemCard.scss"></style>
