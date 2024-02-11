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
          // Embaralhar a lista completa de Pokémon
          const shuffledPokemons = this.shuffleArray(allPokemons);
          // Selecionar os primeiros 5 Pokémon da lista embaralhada
          this.pokemons = shuffledPokemons.slice(0, 5);
        });
    }

    private shuffleArray(array: any[]): any[] {
      const shuffledArray = [...array];
      for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
      }
      return shuffledArray;
    }
}
