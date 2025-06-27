import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../services/pokemon.service';
import { FavoritesService } from '../services/favorites.service';
import { Router } from '@angular/router';
import { Pokemon } from '../models/pokemon.model';

@Component({
  selector: 'app-pokemon-favorites',
  templateUrl: './pokemon-favorites.page.html',
  styleUrls: ['./pokemon-favorites.page.scss'],
  standalone: false
})
export class PokemonFavoritesPage implements OnInit {
  favoritePokemons: Pokemon[] = [];

  constructor(
    private pokemonService: PokemonService,
    private favoritesService: FavoritesService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loadFavorites();
  }

  ionViewWillEnter() {
    this.loadFavorites();
  }

  loadFavorites() {
    const names = this.favoritesService.getFavorites();
    this.favoritePokemons = [];

    const observables = names.map(name =>
      this.pokemonService.getPokemonDetails(name).toPromise().catch(() => undefined)
    );

    Promise.all(observables).then(results => {
      this.favoritePokemons = results.filter((p): p is Pokemon => !!p);
    });
  }


  removeFavorite(name: string) {
    this.favoritesService.removeFavorite(name);
    this.loadFavorites(); // ✅ Recarrega depois de remover
  }

  goToDetails(pokemon: Pokemon) {
    this.router.navigate(['/pokemon', pokemon.id]);
  }
}
