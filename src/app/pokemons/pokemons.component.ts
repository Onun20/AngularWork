import { Component, OnDestroy, OnInit } from '@angular/core';
import { Pokemon } from '../Pokemon';
import { PokemonService } from '../pokemon.service';
import { NumberSymbol } from '@angular/common';

@Component({
  selector: 'app-pokemons',
  templateUrl: './pokemons.component.html',
  styleUrls: ['./pokemons.component.css']
})
export class PokemonsComponent implements OnInit,OnDestroy {
  pokemons: Pokemon[] = [];
  page = 1;
  searchTerm: string = '';

  constructor(private pokemonService: PokemonService) { }


  ngOnInit(): void {
    this.getPokemons();
  }
  ngOnDestroy(): void {}

  getPokemons(): void {
    this.pokemonService.getPokemons()
    .subscribe(pokemons => this.pokemons = pokemons)
  }

  // getPokemons(): void {
  //   this.pokemonService.getPokemons()
  //   .subscribe((response: any) => {
  //     response.results.forEach(pokemon => {
  //       this.pokemonService.getPokemons(pokemon.name)
  //       .subscribe((uniqResponse: any)=> {
  //         this.pokemons.push(uniqResponse);
  //         console.log(this.pokemons);
          
  //       })
  //   })
  //   });
  // }

  add(name : string) : void {
    name = name.trim();
    if (!name) {return;}
    this.pokemonService.addPokemon(name)
  }
  
  delete(pokemon: Pokemon): void {
    this.pokemons = this.pokemons.filter(p => p !== pokemon);
    this.pokemonService.deletePokemon(pokemon.id).subscribe();
  }

  search(term: string): void {

    if (term) {
      this.pokemons = this.pokemons.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(term.toLowerCase()));
    } else {
      this.getPokemons();
    }
  }
}
