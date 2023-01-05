<script setup lang="ts">
import { ref } from 'vue'
import type { ItemSlot } from '@/client/types/bussiness'
import { useGeoguessuuuStore } from '@/stores/geoguessuuu'

const geoStore = useGeoguessuuuStore()

const { getItemImage } = geoStore

const ps = defineProps<{
	item: ItemSlot
	classElement?: Record<string, string>
}>()
const props = ref(ps)
</script>

<template>
	<div
		class="card h-100 w-100"
		:style="`--inventory-card-color: var(--rarety-${props.item.itemType.rarity.toLocaleLowerCase()}); --shadow-card-rgb: var(--rarety-${props.item.itemType.rarity.toLocaleLowerCase()}-lighter-rgb);`">
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
				<span v-if="!props.item.itemType.fantastic" class="badge">
					x{{ props.item.quantity }}
				</span>
			</h5>
			<p class="card-text">
				{{ props.item.itemType.description }}
			</p>
		</div>
	</div>
</template>

<style scoped src="./InventoryCard.scss"></style>
