import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../services/pokemon.service';

interface Pokemon {
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
  pokemons: Pokemon[] = [];

  constructor(private pokemonService: PokemonService) { }

  ngOnInit() {
    this.pokemonService.getPokemons().subscribe((res: any) => {
      this.pokemons = res.results;
    });
  }

  getPokemonId(url: string): string {
    return url.split('/').filter(Boolean).pop()!;
  }
}
