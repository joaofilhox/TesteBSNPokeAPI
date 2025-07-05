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

  it('should get all favorites', () => {
    service.addFavorite('pikachu');
    service.addFavorite('bulbasaur');

    const favorites = service.getFavorites();
    expect(favorites).toContain('pikachu');
    expect(favorites).toContain('bulbasaur');
    expect(favorites.length).toBe(2);
  });

  it('should not add duplicate favorites', () => {
    service.addFavorite('pikachu');
    service.addFavorite('pikachu');

    const favorites = service.getFavorites();
    expect(favorites.filter(f => f === 'pikachu').length).toBe(1);
  });

  it('should handle empty favorites list', () => {
    expect(service.getFavorites().length).toBe(0);
  });

  it('should persist favorites in localStorage', () => {
    service.addFavorite('pikachu');

    const newService = new FavoritesService();
    expect(newService.isFavorite('pikachu')).toBeTrue();
  });

  it('should handle localStorage errors gracefully', () => {
    spyOn(localStorage, 'getItem').and.throwError('Storage error');
    spyOn(localStorage, 'setItem').and.throwError('Storage error');

    spyOn(console, 'error');

    expect(() => service.addFavorite('pikachu')).not.toThrow();
    expect(() => service.getFavorites()).not.toThrow();
    expect(() => service.removeFavorite('pikachu')).not.toThrow();
    expect(() => service.isFavorite('pikachu')).not.toThrow();
  });
});
