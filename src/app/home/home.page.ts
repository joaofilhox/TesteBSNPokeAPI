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
  limit = 20;
  offset = 0;
  total = 0;

  constructor(private pokemonService: PokemonService) { }

  ngOnInit() {
    this.loadPokemons();
  }

  loadPokemons() {
    this.pokemonService.getPokemons(this.limit, this.offset).subscribe((res: any) => {
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
}