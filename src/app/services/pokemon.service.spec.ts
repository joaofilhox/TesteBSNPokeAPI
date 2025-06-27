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
    httpMock.verify(); // Verifica que não ficou requisição pendente
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
});
