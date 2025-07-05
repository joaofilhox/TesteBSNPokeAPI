import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PokemonFavoritesPage } from './pokemon-favorites.page';
import { IonicModule, NavController } from '@ionic/angular';
import { FavoritesService } from '../services/favorites.service';
import { PokemonService } from '../services/pokemon.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Router } from '@angular/router';

describe('PokemonFavoritesPage', () => {
  let component: PokemonFavoritesPage;
  let fixture: ComponentFixture<PokemonFavoritesPage>;
  let favoritesService: FavoritesService;
  let pokemonService: PokemonService;
  let httpMock: HttpTestingController;
  let routerSpy: jasmine.SpyObj<Router>;
  let navControllerSpy: jasmine.SpyObj<NavController>;

  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    navControllerSpy = jasmine.createSpyObj('NavController', ['navigateForward']);

    await TestBed.configureTestingModule({
      declarations: [PokemonFavoritesPage],
      imports: [
        IonicModule.forRoot(),
        HttpClientTestingModule
      ],
      providers: [
        FavoritesService,
        PokemonService,
        { provide: Router, useValue: routerSpy },
        { provide: NavController, useValue: navControllerSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PokemonFavoritesPage);
    component = fixture.componentInstance;
    favoritesService = TestBed.inject(FavoritesService);
    pokemonService = TestBed.inject(PokemonService);
    httpMock = TestBed.inject(HttpTestingController);

    localStorage.clear();
  });

  afterEach(() => {
    try {
      httpMock.verify();
    } catch (error) {
    }
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load favorite pokemons on init', (done) => {
    favoritesService.addFavorite('pikachu');
    favoritesService.addFavorite('bulbasaur');

    fixture.detectChanges();

    const req1 = httpMock.expectOne('https://pokeapi.co/api/v2/pokemon/pikachu');
    req1.flush({
      id: 25,
      name: 'pikachu',
      height: 4,
      weight: 60,
      base_experience: 112,
      forms: [{ name: 'pikachu' }],
      species: { name: 'pikachu', url: 'https://pokeapi.co/api/v2/pokemon-species/25/' },
      stats: [{ base_stat: 35, stat: { name: 'hp' } }],
      sprites: {
        front_default: 'pikachu.png',
        back_default: 'pikachu-back.png',
        front_shiny: 'pikachu-shiny.png',
        back_shiny: 'pikachu-back-shiny.png'
      },
      types: [{ slot: 1, type: { name: 'electric' } }],
      abilities: [{ slot: 1, ability: { name: 'static' } }]
    });

    const req2 = httpMock.expectOne('https://pokeapi.co/api/v2/pokemon/bulbasaur');
    req2.flush({
      id: 1,
      name: 'bulbasaur',
      height: 7,
      weight: 69,
      base_experience: 64,
      forms: [{ name: 'bulbasaur' }],
      species: { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon-species/1/' },
      stats: [{ base_stat: 45, stat: { name: 'hp' } }],
      sprites: {
        front_default: 'bulbasaur.png',
        back_default: 'bulbasaur-back.png',
        front_shiny: 'bulbasaur-shiny.png',
        back_shiny: 'bulbasaur-back-shiny.png'
      },
      types: [{ slot: 1, type: { name: 'grass' } }],
      abilities: [{ slot: 1, ability: { name: 'overgrow' } }]
    });

    setTimeout(() => {
      expect(component.favoritePokemons.length).toBe(2);
      done();
    }, 100);
  });

  it('should handle empty favorites list', () => {
    localStorage.clear();
    fixture.detectChanges();
    expect(component.favoritePokemons.length).toBe(0);
  });

  it('should remove favorite pokemon', (done) => {
    favoritesService.addFavorite('pikachu');
    fixture.detectChanges();

    const req = httpMock.expectOne('https://pokeapi.co/api/v2/pokemon/pikachu');
    req.flush({
      id: 25,
      name: 'pikachu',
      height: 4,
      weight: 60,
      base_experience: 112,
      forms: [{ name: 'pikachu' }],
      species: { name: 'pikachu', url: 'https://pokeapi.co/api/v2/pokemon-species/25/' },
      stats: [{ base_stat: 35, stat: { name: 'hp' } }],
      sprites: {
        front_default: 'pikachu.png',
        back_default: 'pikachu-back.png',
        front_shiny: 'pikachu-shiny.png',
        back_shiny: 'pikachu-back-shiny.png'
      },
      types: [{ slot: 1, type: { name: 'electric' } }],
      abilities: [{ slot: 1, ability: { name: 'static' } }]
    });

    setTimeout(() => {
      expect(component.favoritePokemons.length).toBe(1);

      component.removeFavorite('pikachu');

      expect(component.favoritePokemons.length).toBe(0);
      expect(favoritesService.getFavorites()).not.toContain('pikachu');
      done();
    }, 100);
  });

  it('should navigate to pokemon details', (done) => {
    favoritesService.addFavorite('pikachu');
    fixture.detectChanges();

    const req = httpMock.expectOne('https://pokeapi.co/api/v2/pokemon/pikachu');
    req.flush({
      id: 25,
      name: 'pikachu',
      height: 4,
      weight: 60,
      base_experience: 112,
      forms: [{ name: 'pikachu' }],
      species: { name: 'pikachu', url: 'https://pokeapi.co/api/v2/pokemon-species/25/' },
      stats: [{ base_stat: 35, stat: { name: 'hp' } }],
      sprites: {
        front_default: 'pikachu.png',
        back_default: 'pikachu-back.png',
        front_shiny: 'pikachu-shiny.png',
        back_shiny: 'pikachu-back-shiny.png'
      },
      types: [{ slot: 1, type: { name: 'electric' } }],
      abilities: [{ slot: 1, ability: { name: 'static' } }]
    });

    setTimeout(() => {
      const pokemon = component.favoritePokemons[0];
      component.goToDetails(pokemon);
      expect(routerSpy.navigate).toHaveBeenCalledWith(['/pokemon', 25]);
      done();
    }, 100);
  });

  it('should handle error when loading pokemon details', () => {
    localStorage.clear();
    favoritesService.addFavorite('invalid-pokemon');
    fixture.detectChanges();

    const req = httpMock.expectOne('https://pokeapi.co/api/v2/pokemon/invalid-pokemon');
    req.error(new ErrorEvent('Network error'));

    expect(component.favoritePokemons.length).toBe(0);
  });
});
