import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from '../services/pokemon.service';
import { FavoritesService } from '../services/favorites.service';
import { Pokemon } from '../models/pokemon.model';
import { HttpClient } from '@angular/common/http';

interface SpriteItem {
  src: string;
  label: string;
}

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.page.html',
  styleUrls: ['./pokemon-details.page.scss'],
  standalone: false
})
export class PokemonDetailsPage implements OnInit, OnDestroy {
  pokemon!: Pokemon;
  tipos: string[] = [];
  habilidades: string[] = [];
  loading = false;
  error: string | null = null;

  sprites: SpriteItem[] = [];
  currentSpriteIndex = 0;
  private animationTimer: any;
  private speciesColor: string = '';

  constructor(
    private route: ActivatedRoute,
    private pokemonService: PokemonService,
    private favoritesService: FavoritesService,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.loadPokemon();
  }

  ngOnDestroy() {
    if (this.animationTimer) {
      clearInterval(this.animationTimer);
    }
  }

  loadPokemon() {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.loading = true;
    this.error = null;

    this.pokemonService.getPokemonDetails(id).subscribe({
      next: (res) => {
        this.pokemon = res;
        this.tipos = res.types.map(t => t.type.name);
        this.habilidades = res.abilities.map(a => a.ability.name);
        this.setupSprites();
        this.startCinematicAnimation();
        this.loading = false;
        this.loadSpeciesColor(res.species.url);
      },
      error: (error) => {
        console.error('Erro ao carregar Pokémon:', error);
        this.error = 'Não foi possível carregar os detalhes do Pokémon. Tente novamente.';
        this.loading = false;
      }
    });
  }

  loadSpeciesColor(speciesUrl: string) {
    this.http.get<any>(speciesUrl).subscribe({
      next: (species) => {
        const colorName = species.color?.name || 'blue';
        this.speciesColor = colorName;
        this.applySpeciesColor(colorName);
      },
      error: () => {
        this.applySpeciesColor('blue');
      }
    });
  }

  applySpeciesColor(colorName: string) {
    const colorMap: { [key: string]: string } = {
      black: '#333333',
      blue: '#6390F0',
      brown: '#B6866E',
      gray: '#A8A8A8',
      green: '#7AC74C',
      pink: '#EE99AC',
      purple: '#A33EA1',
      red: '#E63946',
      white: '#F5F5F5',
      yellow: '#F7D02C',
    };
    const main = colorMap[colorName] || '#6390F0';
    const secondary = colorName === 'white' ? '#e0e0e0' : '#fff';
    const gradient = `linear-gradient(135deg, ${main}, ${secondary})`;

    const card = document.querySelector('.details-card') as HTMLElement;
    if (card) {
      card.style.setProperty('--pokemon-type-gradient', gradient);
    }
    const spriteContainer = document.querySelector('.sprite-container.cinematic') as HTMLElement;
    if (spriteContainer) {
      spriteContainer.style.setProperty('background', gradient);
    }
  }

  setupSprites() {
    if (this.pokemon && this.pokemon.sprites) {
      this.sprites = [
        {
          src: this.pokemon.sprites.front_default,
          label: 'Front'
        },
        {
          src: this.pokemon.sprites.back_default,
          label: 'Back'
        },
        {
          src: this.pokemon.sprites.front_shiny,
          label: 'Front Shiny'
        },
        {
          src: this.pokemon.sprites.back_shiny,
          label: 'Back Shiny'
        }
      ].filter(sprite => sprite.src);
    }
  }

  startCinematicAnimation() {
    if (this.sprites.length > 1) {
      this.animationTimer = setInterval(() => {
        this.currentSpriteIndex = (this.currentSpriteIndex + 1) % this.sprites.length;
      }, 2000);
    }
  }

  setActiveSprite(index: number) {
    this.currentSpriteIndex = index;
    if (this.animationTimer) {
      clearInterval(this.animationTimer);
      this.startCinematicAnimation();
    }
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

  getStatName(statName: string): string {
    const statNames: { [key: string]: string } = {
      'hp': 'HP',
      'attack': 'Ataque',
      'defense': 'Defesa',
      'special-attack': 'Ataque Especial',
      'special-defense': 'Defesa Especial',
      'speed': 'Velocidade'
    };
    return statNames[statName] || statName;
  }
}
