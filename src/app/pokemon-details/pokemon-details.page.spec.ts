import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PokemonDetailsPage } from './pokemon-details.page';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { FavoritesService } from '../services/favorites.service';

describe('PokemonDetailsPage', () => {
  let component: PokemonDetailsPage;
  let fixture: ComponentFixture<PokemonDetailsPage>;
  let httpMock: HttpTestingController;
  let favoritesService: FavoritesService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PokemonDetailsPage],
      imports: [IonicModule.forRoot(), HttpClientTestingModule],
      providers: [
        FavoritesService,
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: () => '1'
              }
            }
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PokemonDetailsPage);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    favoritesService = TestBed.inject(FavoritesService);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create', () => {
    fixture.detectChanges();

    const req = httpMock.expectOne('https://pokeapi.co/api/v2/pokemon/1');
    req.flush({
      id: 1,
      name: 'bulbasaur',
      height: 7,
      weight: 69,
      base_experience: 64,
      forms: [{ name: 'bulbasaur' }],
      species: { name: 'bulbasaur' },
      stats: [
        { base_stat: 45, stat: { name: 'hp' } },
        { base_stat: 49, stat: { name: 'attack' } }
      ],
      sprites: {
        front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
        back_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/1.png',
        front_shiny: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/1.png',
        back_shiny: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/1.png'
      },
      types: [{ type: { name: 'grass' } }],
      abilities: [{ ability: { name: 'overgrow' } }]
    });

    expect(component).toBeTruthy();
    expect(component.pokemon?.name).toBe('bulbasaur');
  });

  it('should handle error when loading pokemon', () => {
    fixture.detectChanges();

    const req = httpMock.expectOne('https://pokeapi.co/api/v2/pokemon/1');
    req.error(new ErrorEvent('Network error'));

    expect(component.error).toBeTruthy();
  });

  it('should check if pokemon is favorite', () => {
    fixture.detectChanges();
    const req = httpMock.expectOne('https://pokeapi.co/api/v2/pokemon/1');
    req.flush({
      id: 1,
      name: 'bulbasaur',
      height: 7,
      weight: 69,
      base_experience: 64,
      forms: [{ name: 'bulbasaur' }],
      species: { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon-species/1/' },
      stats: [{ base_stat: 45, stat: { name: 'hp' } }],
      sprites: {
        front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
        back_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/1.png',
        front_shiny: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/1.png',
        back_shiny: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/1.png'
      },
      types: [{ slot: 1, type: { name: 'grass' } }],
      abilities: [{ slot: 1, ability: { name: 'overgrow' } }]
    });

    const speciesReq = httpMock.expectOne('https://pokeapi.co/api/v2/pokemon-species/1/');
    speciesReq.flush({ color: { name: 'green' } });

    spyOn(favoritesService, 'isFavorite').and.returnValue(true);
    expect(component.isFavorite()).toBeTrue();
  });

  it('should toggle favorite', () => {
    fixture.detectChanges();
    const req = httpMock.expectOne('https://pokeapi.co/api/v2/pokemon/1');
    req.flush({
      id: 1,
      name: 'bulbasaur',
      height: 7,
      weight: 69,
      base_experience: 64,
      forms: [{ name: 'bulbasaur' }],
      species: { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon-species/1/' },
      stats: [{ base_stat: 45, stat: { name: 'hp' } }],
      sprites: {
        front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
        back_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/1.png',
        front_shiny: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/1.png',
        back_shiny: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/1.png'
      },
      types: [{ slot: 1, type: { name: 'grass' } }],
      abilities: [{ slot: 1, ability: { name: 'overgrow' } }]
    });

    const speciesReq = httpMock.expectOne('https://pokeapi.co/api/v2/pokemon-species/1/');
    speciesReq.flush({ color: { name: 'green' } });

    spyOn(favoritesService, 'isFavorite').and.returnValue(false);
    const addSpy = spyOn(favoritesService, 'addFavorite');

    component.toggleFavorite();

    expect(addSpy).toHaveBeenCalledWith('bulbasaur');
  });

  it('should get stat name correctly', () => {
    expect(component.getStatName('hp')).toBe('HP');
    expect(component.getStatName('attack')).toBe('Ataque');
    expect(component.getStatName('defense')).toBe('Defesa');
    expect(component.getStatName('special-attack')).toBe('Ataque Especial');
    expect(component.getStatName('special-defense')).toBe('Defesa Especial');
    expect(component.getStatName('speed')).toBe('Velocidade');
    expect(component.getStatName('unknown')).toBe('unknown');
  });
});
