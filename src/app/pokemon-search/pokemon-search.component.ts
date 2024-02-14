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