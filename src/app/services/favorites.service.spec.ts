import { TestBed } from '@angular/core/testing';
import { FavoritesService } from './favorites.service';

describe('FavoritesService', () => {
  let service: FavoritesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FavoritesService);
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add a favorite', () => {
    service.addFavorite('pikachu');
    expect(service.getFavorites()).toContain('pikachu');
  });

  it('should remove a favorite', () => {
    service.addFavorite('bulbasaur');
    service.removeFavorite('bulbasaur');
    expect(service.getFavorites()).not.toContain('bulbasaur');
  });

  it('should check if a pokemon is favorite', () => {
    service.addFavorite('charmander');
    expect(service.isFavorite('charmander')).toBeTrue();
    expect(service.isFavorite('squirtle')).toBeFalse();
  });
});
