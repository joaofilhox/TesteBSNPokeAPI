import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  private storageKey = 'favoritePokemons';

  getFavorites(): string[] {
    try {
      return JSON.parse(localStorage.getItem(this.storageKey) || '[]');
    } catch (error) {
      console.error('Erro ao ler favoritos do localStorage:', error);
      return [];
    }
  }

  addFavorite(pokemonName: string): void {
    try {
      const favorites = this.getFavorites();
      if (!favorites.includes(pokemonName)) {
        favorites.push(pokemonName);
        localStorage.setItem(this.storageKey, JSON.stringify(favorites));
      }
    } catch (error) {
      console.error('Erro ao adicionar favorito:', error);
    }
  }

  removeFavorite(pokemonName: string): void {
    try {
      const favorites = this.getFavorites().filter(name => name !== pokemonName);
      localStorage.setItem(this.storageKey, JSON.stringify(favorites));
    } catch (error) {
      console.error('Erro ao remover favorito:', error);
    }
  }

  isFavorite(pokemonName: string): boolean {
    try {
      return this.getFavorites().includes(pokemonName);
    } catch (error) {
      console.error('Erro ao verificar favorito:', error);
      return false;
    }
  }
}
