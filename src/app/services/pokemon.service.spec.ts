import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PokemonService } from './pokemon.service';
import { IonicModule } from '@ionic/angular';

describe('PokemonService', () => {
  let service: PokemonService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [IonicModule.forRoot(), HttpClientTestingModule]
    });
    service = TestBed.inject(PokemonService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch list of pokemons', () => {
    service.getPokemons(10, 0).subscribe(res => {
      expect(res).toBeTruthy();
    });

    const req = httpMock.expectOne('https://pokeapi.co/api/v2/pokemon?limit=10&offset=0');
    expect(req.request.method).toBe('GET');
    req.flush({ results: [], count: 0 });
  });

  it('should fetch pokemon details', () => {
    service.getPokemonDetails('1').subscribe(res => {
      expect(res).toBeTruthy();
    });

    const req = httpMock.expectOne('https://pokeapi.co/api/v2/pokemon/1');
    expect(req.request.method).toBe('GET');
    req.flush({});
  });

  it('should search pokemons', () => {
    service.searchPokemon('pika').subscribe(res => {
      expect(res).toBeTruthy();
    });

    const req = httpMock.expectOne('https://pokeapi.co/api/v2/pokemon?limit=1025');
    expect(req.request.method).toBe('GET');
    req.flush({
      results: [
        { name: 'pikachu', url: 'https://pokeapi.co/api/v2/pokemon/25/' }
      ],
      count: 1
    });
  });

  it('should handle error in pokemon list request', () => {
    service.getPokemons(10, 0).subscribe({
      next: () => fail('should have failed'),
      error: (error) => {
        expect(error).toBeTruthy();
      }
    });

    const req = httpMock.expectOne('https://pokeapi.co/api/v2/pokemon?limit=10&offset=0');
    req.error(new ErrorEvent('Network error'));
  });

  it('should handle error in pokemon details request', () => {
    service.getPokemonDetails('1').subscribe({
      next: () => fail('should have failed'),
      error: (error) => {
        expect(error).toBeTruthy();
      }
    });

    const req = httpMock.expectOne('https://pokeapi.co/api/v2/pokemon/1');
    req.error(new ErrorEvent('Network error'));
  });
});
