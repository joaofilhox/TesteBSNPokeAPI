import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomePage } from './home.page';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { IonicModule, NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FavoritesService } from '../services/favorites.service';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;
  let httpMock: HttpTestingController;
  let routerSpy: jasmine.SpyObj<Router>;
  let favoritesService: FavoritesService;

  beforeEach(async () => {
    const routerSpyObj = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [HomePage],
      imports: [IonicModule.forRoot(), HttpClientTestingModule],
      providers: [
        FavoritesService,
        { provide: Router, useValue: routerSpyObj },
        { provide: NavController, useValue: jasmine.createSpyObj('NavController', ['navigateForward', 'navigateBack']) }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    favoritesService = TestBed.inject(FavoritesService);
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load pokemons on init', () => {
    // Dispara ngOnInit
    fixture.detectChanges();

    // Prepara o request esperado
    const req = httpMock.expectOne('https://pokeapi.co/api/v2/pokemon?limit=20&offset=0');
    expect(req.request.method).toBe('GET');

    req.flush({
      results: [
        { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' }
      ],
      count: 1
    });

    // Valida os dados carregados
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
});
