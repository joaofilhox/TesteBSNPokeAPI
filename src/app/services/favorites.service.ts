import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  private storageKey = 'favoritePokemons';

  getFavorites(): string[] {
    return JSON.parse(localStorage.getItem(this.storageKey) || '[]');
  }

  addFavorite(pokemonName: string): void {
    const favorites = this.getFavorites();
    if (!favorites.includes(pokemonName)) {
      favorites.push(pokemonName);
      localStorage.setItem(this.storageKey, JSON.stringify(favorites));
    }
  }

  removeFavorite(pokemonName: string): void {
    const favorites = this.getFavorites().filter(name => name !== pokemonName);
    localStorage.setItem(this.storageKey, JSON.stringify(favorites));
  }

  isFavorite(pokemonName: string): boolean {
    return this.getFavorites().includes(pokemonName);
  }
}
