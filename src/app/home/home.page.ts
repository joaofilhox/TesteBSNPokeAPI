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
  limit = 20;
  offset = 0;
  total = 0;

  constructor(
    private pokemonService: PokemonService,
    private favoritesService: FavoritesService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loadPokemons();
  }

  loadPokemons() {
    this.pokemonService.getPokemons(this.limit, this.offset).subscribe((res) => {
      this.pokemons = res.results;
      this.total = res.count;
    });
  }

  nextPage() {
    if (this.offset + this.limit < this.total) {
      this.offset += this.limit;
      this.loadPokemons();
    }
  }

  previousPage() {
    if (this.offset >= this.limit) {
      this.offset -= this.limit;
      this.loadPokemons();
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
}
