import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Pokemon } from '../Pokemon';
import { PokemonService } from '../pokemon.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.css']
})


export class PokemonDetailComponent implements OnInit{
  pokemons: Pokemon[] = [];
  pokemon: Pokemon | undefined ;
  imageUrl = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/'

  constructor(
    private route: ActivatedRoute,
    private pokemonService: PokemonService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getPokemon();
  }

  // getPokemon(): void {
  //   const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
  //   this.pokemonService.getPokemon(id)
  //     .subscribe(pokemon => this.pokemon = pokemon);
  // }

  getPokemon(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    this.pokemonService.getPokemon(id)
      .subscribe(pokemon => {
        this.pokemon = pokemon;
        this.pokemon.imageUrl = pokemon.imageUrl; // Certifique-se de substituir 'imageURL' pelo nome da propriedade que contém a URL da imagem
      });
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (this.pokemon) {
      this.pokemonService.updatePokemon(this.pokemon)
        .subscribe(() => this.goBack());
    }
  }
}
