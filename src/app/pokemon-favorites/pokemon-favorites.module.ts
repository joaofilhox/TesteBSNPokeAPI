import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PokemonFavoritesPageRoutingModule } from './pokemon-favorites-routing.module';

import { PokemonFavoritesPage } from './pokemon-favorites.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PokemonFavoritesPageRoutingModule
  ],
  declarations: [PokemonFavoritesPage]
})
export class PokemonFavoritesPageModule {}
