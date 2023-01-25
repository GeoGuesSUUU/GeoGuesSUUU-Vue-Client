import type { Game } from '../types/bussiness'
import { api } from './api'

export class GameService {
	static async getGames(): Promise<Game[]> {
		return (
			await api<Game[]>(`/game/`, {
				method: 'GET',
			})
		).items
	}

	static async getGameByID(id: number): Promise<Game> {
		return (
			await api<Game>(`/game/${id}`, {
				method: 'GET',
			})
		).items
	}

	static async getGamePage(gameURI: string): Promise<string> {
		return (await api(`/game-page/${gameURI}`, {
			method: 'GET',
		})) as unknown as string
	}
}
