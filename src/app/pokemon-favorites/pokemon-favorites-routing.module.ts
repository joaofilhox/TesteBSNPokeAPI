import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PokemonFavoritesPage } from './pokemon-favorites.page';

const routes: Routes = [
  {
    path: '',
    component: PokemonFavoritesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PokemonFavoritesPageRoutingModule {}
