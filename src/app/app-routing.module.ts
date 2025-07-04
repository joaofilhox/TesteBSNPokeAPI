import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'pokemon/:id',
    loadChildren: () => import('./pokemon-details/pokemon-details.module').then(m => m.PokemonDetailsPageModule)
  },  {
    path: 'pokemon-favorites',
    loadChildren: () => import('./pokemon-favorites/pokemon-favorites.module').then( m => m.PokemonFavoritesPageModule)
  },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
