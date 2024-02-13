import { Component, OnDestroy, OnInit } from '@angular/core';
import { Pokemon } from '../Pokemon';
import { PokemonService } from '../pokemon.service';
import { NumberSymbol } from '@angular/common';

@Component({
  selector: 'app-pokemons',
  templateUrl: './pokemons.component.html',
  styleUrls: ['./pokemons.component.css']
})
export class PokemonsComponent implements OnInit {
  pokemons: Pokemon[] = [];
  page = 1;
  searchTerm: string = '';

  constructor(private pokemonService: PokemonService) { }


  ngOnInit(): void {
    this.getPokemons();
  }

  getPokemons(): void {
    this.pokemonService.getPokemons()
    .subscribe(pokemons => this.pokemons = pokemons)
  }

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
