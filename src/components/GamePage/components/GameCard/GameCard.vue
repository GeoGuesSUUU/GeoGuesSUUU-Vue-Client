<script setup lang="ts">
import { ref } from 'vue'
import type { Game } from '@/client/types/bussiness'

const ps = defineProps<{
	game: Game
}>()
const props = ref(ps.game)
</script>

<template>
	<div class="col-md-6 px-0">
		<div
			class="row d-flex flex-row g-0 border rounded overflow-hidden flex-md-row m-4 shadow-sm h-md-250 position-relative">
			<div class="col p-4 d-flex flex-column position-static">
				<strong class="d-inline-block mb-2 text-primary">
					{{ props.tags }}
				</strong>
				<h3 class="mb-0">{{ props.title }}</h3>
				<div class="mb-1 text-muted">{{ props.levels.length }} Level(s)</div>
				<p class="card-text mb-auto">
					{{ props.description }}
				</p>
				<a
					v-if="props.levels.length > 0"
					:href="`/game-page/${props.id}`"
					class="btn btn-primary">
					Play
				</a>
				<button v-else type="button" class="btn btn-primary" disabled>
					Play
				</button>
			</div>
			<div class="col-auto d-none d-lg-block w-25 h-25">
				<img
					:src="props.img"
					alt="game-img"
					class="game-img w-100"
					height="300" />
			</div>
		</div>
	</div>
</template>

<style scoped src="./GameCard.scss"></style>
