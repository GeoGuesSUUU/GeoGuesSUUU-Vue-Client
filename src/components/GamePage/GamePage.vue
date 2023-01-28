<script setup lang="ts">
import { onMounted, ref, toRefs } from 'vue'
import { GameService } from '@/client/services/game-service'
import LoadingData from '@/components/LoadingData/LoadingData.vue'
import { useGeoguessuuuStore } from '@/stores/geoguessuuu'
import GameCard from './components/GameCard/GameCard.vue'

const geoStore = useGeoguessuuuStore()

const { gameList } = toRefs(geoStore)
const { upsetGameList } = geoStore

const isLoading = ref(false)

onMounted(async () => {
	isLoading.value = true
	upsetGameList(await GameService.getGames())
	isLoading.value = false
})
</script>

<template>
	<LoadingData v-if="isLoading"></LoadingData>
	<div class="container-fluid">
		<div class="row mb-2">
			<GameCard
				v-for="(game, index) of gameList"
				:key="index"
				:game="game"></GameCard>
		</div>
	</div>
</template>

<style scoped src="./GamePage.scss"></style>
