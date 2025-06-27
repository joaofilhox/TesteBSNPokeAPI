import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from '../services/pokemon.service';
import { FavoritesService } from '../services/favorites.service';
import { Pokemon } from '../models/pokemon.model';

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.page.html',
  styleUrls: ['./pokemon-details.page.scss'],
  standalone: false
})
export class PokemonDetailsPage implements OnInit {
  pokemon!: Pokemon;
  tipos: string[] = [];
  habilidades: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private pokemonService: PokemonService,
    private favoritesService: FavoritesService
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.pokemonService.getPokemonDetails(id).subscribe((res) => {
      this.pokemon = res;
      this.tipos = res.types.map(t => t.type.name);
      this.habilidades = res.abilities.map(a => a.ability.name);
    });
  }

  isFavorite(): boolean {
    return this.pokemon && this.favoritesService.isFavorite(this.pokemon.name);
  }

  toggleFavorite() {
    if (this.isFavorite()) {
      this.favoritesService.removeFavorite(this.pokemon.name);
    } else {
      this.favoritesService.addFavorite(this.pokemon.name);
    }
  }
}
