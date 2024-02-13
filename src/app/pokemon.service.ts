import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MessageService } from './message.service';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Pokemon } from './Pokemon';
import { PokemonDTO } from './PokemonDTO';

@Injectable({
  providedIn: 'root'
})

export class PokemonService {
  

  private pokemonUrl = 'https://softwium.com/api/pokemons'; 
  private imageUrl = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/'


  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };


  constructor(
    private http: HttpClient,private messageService: MessageService) { }


  getPokemons(): Observable<Pokemon[]> {
    return this.http.get<any[]>(this.pokemonUrl).pipe(
      tap(_ => this.log('fetched Pokemons')),
      catchError(this.handleError<Pokemon[]>('getPokemons', [])),
      map(pokemons => {
        return pokemons.map(pokemon => {
          return {
            id: pokemon.id,
            name: pokemon.name,
            height: pokemon.height,
            weight: pokemon.weight,
            types: pokemon.types,
            family: pokemon.family,
            imageUrl: `${this.imageUrl}${pokemon.id}.png`
          };
        });
      })
    );
  }
  
  getPokemonNo404<Data>(id: number): Observable<Pokemon> {
    const url = `${this.pokemonUrl}/?id=${id}`;
    return this.http.get<Pokemon[]>(url)
      .pipe(
        map(pokemons => pokemons[0]),
        tap(p => {
          const outcome = p ? 'fetched' : 'did not find';
          this.log(`${outcome} pokemon id=${id}`);
        }),
        catchError(this.handleError<Pokemon>(`getPokemon id=${id}`)),
      );
  }

  getPokemon(id: number): Observable<Pokemon> {
    const url = `${this.pokemonUrl}/${id}`;
    return this.http.get<Pokemon>(url).pipe(
      tap(_ => this.log(`fetched pokemon id=${id}`)),
      catchError(this.handleError<Pokemon>(`getPokemon id=${id}`)),
      map(pokemon => {
        return {
          id: pokemon.id,
          name: pokemon.name,
          height: pokemon.height,
          weight: pokemon.weight,
          types: pokemon.types,
          family: pokemon.family,
          imageUrl: `${this.imageUrl}${pokemon.id}.png`
        };
      })
    );
  }


  searchPokemons(term: string): Observable<Pokemon[]> {
    if (!term.trim()) {
      console.log('Nenhum termo de pesquisa fornecido.');
      return of([]);
    }
    return this.http.get<Pokemon[]>(`${this.pokemonUrl}/?name=${term}`).pipe(
      tap(p => p.length ?
        this.log(`found pokemons matching "${term}"`) :
        this.log(`no pokemons matching "${term}"`)),
      catchError(this.handleError<Pokemon[]>('searchsPokemons', []))
    );
  }

  searchById(id: number): Observable <any[]> {
    const url = `${this.pokemonUrl}/${id}`;
    return this.http.get<any[]>(url);
  }

  addPokemon(name: string): Observable<Pokemon> {
    const newPokemon: PokemonDTO = {
      name: name.trim(),
      height: 1,
      weight: 1,
      types: [],
      family: ''
    };

    return this.http.post<Pokemon>(this.pokemonUrl, newPokemon, this.httpOptions).pipe(
      tap((addedPokemon: Pokemon) => this.log(`added pokemon w/ id=${addedPokemon.id}`)),
      catchError(this.handleError<Pokemon>('addPokemon'))
    );
  }

  deletePokemon(id: number): Observable<Pokemon> {
    const url = `${this.pokemonUrl}/${id}`;

    return this.http.delete<Pokemon>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted pokemon id=${id}`)),
      catchError(this.handleError<Pokemon>('delete'))
    );
  }

  updatePokemon(pokemon: Pokemon): Observable<any> {
    const url = `${this.pokemonUrl}/${pokemon.id}`;
    return this.http.put(this.pokemonUrl, pokemon, this.httpOptions).pipe(
      tap(_ => this.log(`updated pokemon id=${pokemon.id}`)),
      catchError(this.handleError<any>('updatePokemon'))
    );
  }


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error); // log to console instead

      this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }

  private log(message: string) {
    this.messageService.add(`PokemonService: ${message}`);
  }
}
