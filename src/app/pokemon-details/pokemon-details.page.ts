import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.page.html',
  styleUrls: ['./pokemon-details.page.scss'],
  standalone: false
})
export class PokemonDetailsPage implements OnInit {
  pokemon: any;
  tipos: string[] = [];
  habilidades: string[] = [];

  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.http.get(`https://pokeapi.co/api/v2/pokemon/${id}`).subscribe((res: any) => {
      this.pokemon = res;
      this.tipos = res.types.map((t: any) => t.type.name);
      this.habilidades = res.abilities.map((a: any) => a.ability.name);
    });
  }
}
