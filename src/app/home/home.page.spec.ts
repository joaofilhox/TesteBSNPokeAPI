import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomePage } from './home.page';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { IonicModule, NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FavoritesService } from '../services/favorites.service';
import { FormsModule } from '@angular/forms';
import { PokemonService } from '../services/pokemon.service';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;
  let httpMock: HttpTestingController;
  let routerSpy: jasmine.SpyObj<Router>;
  let favoritesService: FavoritesService;
  let pokemonService: PokemonService;

  beforeEach(async () => {
    const routerSpyObj = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [HomePage],
      imports: [IonicModule.forRoot(), HttpClientTestingModule, FormsModule],
      providers: [
        FavoritesService,
        PokemonService,
        { provide: Router, useValue: routerSpyObj },
        { provide: NavController, useValue: jasmine.createSpyObj('NavController', ['navigateForward', 'navigateBack']) }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    favoritesService = TestBed.inject(FavoritesService);
    pokemonService = TestBed.inject(PokemonService);
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load pokemons on init', () => {
    fixture.detectChanges();

    const req1 = httpMock.expectOne('https://pokeapi.co/api/v2/pokemon?limit=20&offset=0');
    expect(req1.request.method).toBe('GET');

    req1.flush({
      results: [
        { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' }
      ],
      count: 1
    });

    const req2 = httpMock.expectOne('https://pokeapi.co/api/v2/pokemon?limit=1025');
    req2.flush({
      results: [
        { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' }
      ],
      count: 1
    });

    expect(component.pokemons.length).toBe(1);
    expect(component.total).toBe(1);
  });

  it('should return pokemon id from URL', () => {
    const id = component.getPokemonId('https://pokeapi.co/api/v2/pokemon/25/');
    expect(id).toBe('25');
  });

  it('should check if pokemon is favorite', () => {
    spyOn(favoritesService, 'isFavorite').and.returnValue(true);
    expect(component.isFavorite('pikachu')).toBeTrue();
  });

  it('should add favorite if not favorite', () => {
    spyOn(favoritesService, 'isFavorite').and.returnValue(false);
    const addSpy = spyOn(favoritesService, 'addFavorite');
    component.toggleFavorite('pikachu');
    expect(addSpy).toHaveBeenCalledWith('pikachu');
  });

  it('should remove favorite if already favorite', () => {
    spyOn(favoritesService, 'isFavorite').and.returnValue(true);
    const removeSpy = spyOn(favoritesService, 'removeFavorite');
    component.toggleFavorite('pikachu');
    expect(removeSpy).toHaveBeenCalledWith('pikachu');
  });

  it('should navigate to pokemon details', () => {
    const pokemon = { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' };
    component.goToDetails(pokemon);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/pokemon', '1']);
  });

  it('should load all pokemons for search on init', () => {
    fixture.detectChanges();

    const req1 = httpMock.expectOne('https://pokeapi.co/api/v2/pokemon?limit=20&offset=0');
    req1.flush({
      results: [{ name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' }],
      count: 1
    });

    const req2 = httpMock.expectOne('https://pokeapi.co/api/v2/pokemon?limit=1025');
    req2.flush({
      results: [
        { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
        { name: 'pikachu', url: 'https://pokeapi.co/api/v2/pokemon/25/' }
      ],
      count: 2
    });

    expect(component.allPokemons.length).toBe(2);
  });

  it('should filter pokemons on search', () => {
    component.allPokemons = [
      { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
      { name: 'pikachu', url: 'https://pokeapi.co/api/v2/pokemon/25/' },
      { name: 'charizard', url: 'https://pokeapi.co/api/v2/pokemon/6/' }
    ];

    const searchEvent = { detail: { value: 'pika' } };
    component.onSearchChange(searchEvent);

    expect(component.isSearching).toBeTrue();
    expect(component.searchTerm).toBe('pika');
    expect(component.filteredPokemons.length).toBe(1);
    expect(component.filteredPokemons[0].name).toBe('pikachu');
    expect(component.total).toBe(1);
  });

  it('should return to normal pagination when search is cleared', () => {
    component.isSearching = true;
    component.searchTerm = 'pika';
    component.filteredPokemons = [{ name: 'pikachu', url: 'https://pokeapi.co/api/v2/pokemon/25/' }];

    const searchEvent = { detail: { value: '' } };
    component.onSearchChange(searchEvent);

    const req = httpMock.expectOne('https://pokeapi.co/api/v2/pokemon?limit=20&offset=0');
    req.flush({
      results: [{ name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' }],
      count: 1
    });

    expect(component.isSearching).toBeFalse();
    expect(component.searchTerm).toBe('');
    expect(component.offset).toBe(0);
  });

  it('should handle pagination for search results', () => {
    component.isSearching = true;
    component.filteredPokemons = Array.from({ length: 50 }, (_, i) => ({
      name: `pokemon${i + 1}`,
      url: `https://pokeapi.co/api/v2/pokemon/${i + 1}/`
    }));
    component.total = 50;
    component.limit = 20;

    component.updateDisplayedPokemons();
    expect(component.pokemons.length).toBe(20);
    expect(component.pokemons[0].name).toBe('pokemon1');

    component.offset = 20;
    component.updateDisplayedPokemons();
    expect(component.pokemons.length).toBe(20);
    expect(component.pokemons[0].name).toBe('pokemon21');
  });

  it('should handle next page for search results', () => {
    component.isSearching = true;
    component.filteredPokemons = Array.from({ length: 50 }, (_, i) => ({
      name: `pokemon${i + 1}`,
      url: `https://pokeapi.co/api/v2/pokemon/${i + 1}/`
    }));
    component.total = 50;
    component.limit = 20;

    spyOn(component, 'updateDisplayedPokemons');
    component.nextPage();

    expect(component.offset).toBe(20);
    expect(component.updateDisplayedPokemons).toHaveBeenCalled();
  });

  it('should handle previous page for search results', () => {
    component.isSearching = true;
    component.offset = 20;
    component.limit = 20;

    spyOn(component, 'updateDisplayedPokemons');
    component.previousPage();

    expect(component.offset).toBe(0);
    expect(component.updateDisplayedPokemons).toHaveBeenCalled();
  });

  it('should handle next page for normal pagination', () => {
    component.isSearching = false;
    component.total = 50;
    component.limit = 20;

    spyOn(component, 'loadPokemons');
    component.nextPage();

    expect(component.offset).toBe(20);
    expect(component.loadPokemons).toHaveBeenCalled();
  });

  it('should handle previous page for normal pagination', () => {
    component.isSearching = false;
    component.offset = 20;
    component.limit = 20;

    spyOn(component, 'loadPokemons');
    component.previousPage();

    expect(component.offset).toBe(0);
    expect(component.loadPokemons).toHaveBeenCalled();
  });

  it('should not go to next page if at the end', () => {
    component.isSearching = false;
    component.offset = 40;
    component.total = 50;
    component.limit = 20;

    spyOn(component, 'loadPokemons');
    component.nextPage();

    expect(component.offset).toBe(40);
    expect(component.loadPokemons).not.toHaveBeenCalled();
  });

  it('should not go to previous page if at the beginning', () => {
    component.isSearching = false;
    component.offset = 0;
    component.limit = 20;

    spyOn(component, 'loadPokemons');
    component.previousPage();

    expect(component.offset).toBe(0);
    expect(component.loadPokemons).not.toHaveBeenCalled();
  });
});
