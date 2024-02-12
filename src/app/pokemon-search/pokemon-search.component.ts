// import { Component, OnInit } from '@angular/core';
// import { Observable, Subject } from 'rxjs';
// import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
// import { Pokemon } from '../Pokemon';
// import { PokemonService } from '../pokemon.service';
// import { ActivatedRoute } from '@angular/router';



// @Component({
//   selector: 'app-pokemon-search',
//   templateUrl: './pokemon-search.component.html',
//   styleUrls: [ './pokemon-search.component.css' ]
// })

// export class PokemonSearchComponent implements OnInit {
//   allPokemons: any[] = [];
//   pokemons: any[] = [];
//   pokemons$!: Observable<Pokemon[]>;
//   private searchTerms = new Subject<string>();

//   constructor(private pokemonService: PokemonService, private route: ActivatedRoute,) {}

//   ngOnInit(): void {
//     this.pokemons$ = this.searchTerms.pipe(
//       debounceTime(300),
//       distinctUntilChanged(),
//       switchMap((term: string) => this.pokemonService.searchPokemons(term))
//     );
//   }

//   search(term: string): void {
//     if (term) {
//       this.pokemons = this.allPokemons.filter((pokemon) =>
//         pokemon.name.toLowerCase().includes(term.toLowerCase())
//       );
//     } else {
//       this.pokemons = this.allPokemons.slice(0, 300);
//     }
//   }
// }

import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pokemon-search',
  templateUrl: './pokemon-search.component.html',
  styleUrls: ['./pokemon-search.component.css'],
})
export class PokemonSearchComponent {
  searchTerm: string = '';

  @Output() search = new EventEmitter<string>();

}