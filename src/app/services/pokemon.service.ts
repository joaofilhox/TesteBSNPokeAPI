import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  constructor(private httpClient: HttpClient) { }

  public getPokemons() {
    return this.httpClient.get('https://pokeapi.co/api/v2/pokemon?limit=20&offset=0');
  }
}
