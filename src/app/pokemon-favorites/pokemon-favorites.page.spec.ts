import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PokemonFavoritesPage } from './pokemon-favorites.page';
import { IonicModule, NavController } from '@ionic/angular';
import { FavoritesService } from '../services/favorites.service';
import { PokemonService } from '../services/pokemon.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('PokemonFavoritesPage', () => {
  let component: PokemonFavoritesPage;
  let fixture: ComponentFixture<PokemonFavoritesPage>;

  beforeEach(async () => {
    const navControllerSpy = jasmine.createSpyObj('NavController', ['navigateForward']);

    await TestBed.configureTestingModule({
      declarations: [PokemonFavoritesPage],
      imports: [
        IonicModule.forRoot(),
        HttpClientTestingModule
      ],
      providers: [
        FavoritesService,
        PokemonService,
        { provide: NavController, useValue: navControllerSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PokemonFavoritesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
