import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../Pokemon';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
    pokemons: Pokemon[] = [];

    constructor(private pokemonService: PokemonService) {}

    ngOnInit(): void {
      this.getPokemons();
    }
    getPokemons(): void {
      this.pokemonService.getPokemons()
        .subscribe(allPokemons => {
          const shuffledPokemons = this.pokemonRandom(allPokemons);
          this.pokemons = shuffledPokemons.slice(0, 5);
        });
    }

    private pokemonRandom(array: any[]): any[] {
      const randomPokemons = [...array];
      for (let i = randomPokemons.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [randomPokemons[i], randomPokemons[j]] = [randomPokemons[j], randomPokemons[i]];
      }
      return randomPokemons;
    }
}
