import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PokemonService } from '../services/pokemon.service';
import { FavoritesService } from '../services/favorites.service';

interface PokemonListItem {
  name: string;
  url: string;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {
  pokemons: PokemonListItem[] = [];
  allPokemons: PokemonListItem[] = [];
  filteredPokemons: PokemonListItem[] = [];
  limit = 20;
  offset = 0;
  total = 0;
  loading = false;
  searchTerm = '';
  isSearching = false;
  Math = Math;

  constructor(
    private pokemonService: PokemonService,
    private favoritesService: FavoritesService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loadPokemons();
    this.loadAllPokemonsForSearch();
  }

  loadPokemons() {
    this.loading = true;
    this.pokemonService.getPokemons(this.limit, this.offset).subscribe({
      next: (res) => {
        this.pokemons = res.results;
        this.total = res.count;
        this.loading = false;
      },
      error: (error) => {
        console.error('Erro ao carregar pokémons:', error);
        this.loading = false;
      }
    });
  }

  loadAllPokemonsForSearch() {
    this.pokemonService.searchPokemon('').subscribe({
      next: (res) => {
        this.allPokemons = res.results;
      },
      error: (error) => {
        console.error('Erro ao carregar todos os pokémons para busca:', error);
      }
    });
  }

  nextPage() {
    if (this.offset + this.limit < this.total) {
      this.offset += this.limit;
      if (this.isSearching) {
        this.updateDisplayedPokemons();
      } else {
        this.loadPokemons();
      }
    }
  }

  previousPage() {
    if (this.offset >= this.limit) {
      this.offset -= this.limit;
      if (this.isSearching) {
        this.updateDisplayedPokemons();
      } else {
        this.loadPokemons();
      }
    }
  }

  getPokemonId(url: string): string {
    return url.split('/').filter(Boolean).pop()!;
  }

  isFavorite(name: string): boolean {
    return this.favoritesService.isFavorite(name);
  }

  toggleFavorite(name: string): void {
    if (this.isFavorite(name)) {
      this.favoritesService.removeFavorite(name);
    } else {
      this.favoritesService.addFavorite(name);
    }
  }

  goToDetails(pokemon: PokemonListItem) {
    const id = this.getPokemonId(pokemon.url);
    this.router.navigate(['/pokemon', id]);
  }

  onSearchChange(event: any) {
    const searchValue = event.detail.value?.toLowerCase().trim();
    this.searchTerm = searchValue;

    if (!searchValue) {
      this.isSearching = false;
      this.offset = 0;
      this.loadPokemons();
      return;
    }

    this.isSearching = true;
    this.offset = 0;
    this.filteredPokemons = this.allPokemons.filter(pokemon =>
      pokemon.name.toLowerCase().includes(searchValue)
    );

    this.total = this.filteredPokemons.length;
    this.updateDisplayedPokemons();
  }

  updateDisplayedPokemons() {
    if (this.isSearching) {
      const startIndex = this.offset;
      const endIndex = startIndex + this.limit;
      this.pokemons = this.filteredPokemons.slice(startIndex, endIndex);
    }
  }
}
