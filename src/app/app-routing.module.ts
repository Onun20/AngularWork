import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PokemonDetailComponent } from './pokemon-detail/pokemon-detail.component';
import { VerifyAuthService } from './verify-auth.service';
import { PokemonsComponent } from './pokemons/pokemons.component';
import { PokemonSearchComponent } from './pokemon-search/pokemon-search.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent, canActivate: [VerifyAuthService]},
  { path: 'detail/:id', component: PokemonDetailComponent, canActivate: [VerifyAuthService]},
  { path: 'pokemons', component: PokemonsComponent},
  { path: 'pokemon-search', component: PokemonSearchComponent},
  { path: '**', component: NotFoundComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
