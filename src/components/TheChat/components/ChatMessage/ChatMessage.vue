<script setup lang="ts">
import { ref } from 'vue'
import type { Message } from '@/client/types/chat'

const ps = defineProps<{
	message: Message
}>()
const props = ref(ps.message)
</script>

<template>
	<div class="message">
		<strong :style="`color: ${props.user.color}`">
			<span>{{ props.user.name }}</span>
			<i
				v-if="props.user.isAdmin"
				class="bi bi-globe-americas px-1 text-secondary"
				title="Admin"></i>
			<i
				v-if="props.user.isVerified"
				class="bi bi-patch-check-fill px-1 text-app"
				title="Verified User"></i>
		</strong>
		<span class="message-content">{{ ' : ' + props.content }}</span>
	</div>
</template>

<style scoped src="./ChatMessage.scss"></style>
