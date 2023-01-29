<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Score } from '@/client/types/bussiness'

const ps = defineProps<{
	score: Score
	locale?: string
}>()
const score = ref(ps.score)

const createdAt = computed(() =>
	new Date(score.value.createdAt).toLocaleDateString(ps.locale ?? 'en-US', {
		year: 'numeric',
		month: '2-digit',
		day: '2-digit',
		hour: '2-digit',
		minute: '2-digit',
	})
)

const time = computed(() => {
	const d = new Date(0)
	d.setMilliseconds(score.value.time)
	return d.toISOString().substring(11, 23)
})
</script>

<template>
	<div class="card">
		<img :src="score.level.game.img" class="card-img-top" alt="game img" />
		<div class="card-body">
			<h5 class="card-title">
				<strong>{{ score.level.game.title }}</strong>
			</h5>
			<h6 class="card-title fst-italic">{{ score.level.label }}</h6>
			<p class="card-text">
				<strong>Difficulty</strong>
				: {{ score.level.difficulty }}
			</p>
			<p class="card-text">
				<strong>Score</strong>
				: {{ score.score }}
			</p>
			<p class="card-text">
				<strong>Time</strong>
				: {{ time }}
			</p>
		</div>
		<div class="card-footer">
			<small class="text-muted">{{ createdAt }}</small>
		</div>
	</div>
</template>

<style scoped src="./ScoreCard.scss"></style>
