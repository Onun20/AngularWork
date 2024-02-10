import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { pokemon } from '../Pokemon';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.css']
})


export class PokemonDetailComponent implements OnInit{
  pokemon: pokemon | undefined;

  constructor(
    private route: ActivatedRoute,
    private pokemonService: PokemonService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getPokemon();
  }

  getPokemon(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    this.pokemonService.getHero(id)
      .subscribe(pokemon => this.pokemon = hero);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (this.hero) {
      this.heroService.updateHero(this.hero)
        .subscribe(() => this.goBack());
    }
  }
}
