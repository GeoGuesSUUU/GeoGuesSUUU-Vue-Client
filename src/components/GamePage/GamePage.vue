<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { GameService } from '@/client/services/game-service'
import type { Game } from '@/client/types/bussiness'
import LoadingData from '@/components/LoadingData/LoadingData.vue'
import GameCardVue from './components/GameCard/GameCard.vue'

const isLoading = ref(false)
const games = ref<Game[]>([])
onMounted(async () => {
	isLoading.value = true
	games.value = await GameService.getGames()
	isLoading.value = false
})
</script>

<template>
	<LoadingData v-if="isLoading"></LoadingData>
	<div class="row mb-2">
		<GameCardVue
			v-for="(game, index) of games"
			:key="index"
			:game="game"></GameCardVue>
	</div>
</template>

<style scoped src="./GamePage.scss"></style>
