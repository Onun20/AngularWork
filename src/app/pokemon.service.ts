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
  private pokemonUrl = 'https://softwium.com/api/pokemons';  // URL to web api
  private imgUrl = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/'

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,private messageService: MessageService) { }

  /** GET pokemons from the server */
  // getPokemons(): Observable<Pokemon[]> {
  //   return this.http.get<Pokemon[]>(this.pokemonUrl)
  //     .pipe(
  //       tap(_ => this.log('fetched Pokemons')),
  //       catchError(this.handleError<Pokemon[]>('getPokemons', []))
  //     );
  // }
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
            imageUrl: `${this.imgUrl}${pokemon.id}.png` // Montando o URL da imagem
          };
        });
      })
    );
  }


  /** GET pokemon by id. Return `undefined` when id not found */
  getPokemonNo404<Data>(id: number): Observable<Pokemon> {
    const url = `${this.pokemonUrl}/?id=${id}`;
    return this.http.get<Pokemon[]>(url)
      .pipe(
        map(pokemons => pokemons[0]),
        tap(p => {
          const outcome = p ? 'fetched' : 'did not find';
          this.log(`${outcome} pokemon id=${id}`);
        }),
        catchError(this.handleError<Pokemon>(`getPokemon id=${id}`))
      );
  }

  /** GET pokemons by id. Will 404 if id not found */
  getPokemon(id: number): Observable<Pokemon> {
    const url = `${this.pokemonUrl}/${id}`;
    return this.http.get<Pokemon>(url).pipe(
      tap(_ => this.log(`fetched pokemon id=${id}`)),
      catchError(this.handleError<Pokemon>(`getPokemon id=${id}`))
    );
  }

  /* GET pokemons whose name contains search term */
  searchPokemons(term: string): Observable<Pokemon[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<Pokemon[]>(`${this.pokemonUrl}/?name=${term}`).pipe(
      tap(x => x.length ?
        this.log(`found pokemons matching "${term}"`) :
        this.log(`no pokemons matching "${term}"`)),
      catchError(this.handleError<Pokemon[]>('searchs', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new hero to the server */
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

  /** DELETE: delete the hero from the server */
  deletePokemon(id: number): Observable<Pokemon> {
    const url = `${this.pokemonUrl}/${id}`;

    return this.http.delete<Pokemon>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted pokemon id=${id}`)),
      catchError(this.handleError<Pokemon>('delete'))
    );
  }

  /** PUT: update the hero on the server */
  updatePokemon(pokemon: Pokemon): Observable<any> {
    const url = `${this.pokemonUrl}/${pokemon.id}`;
    return this.http.put(this.pokemonUrl, pokemon, this.httpOptions).pipe(
      tap(_ => this.log(`updated pokemon id=${pokemon.id}`)),
      catchError(this.handleError<any>('updatePokemon'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`PokemonService: ${message}`);
  }
}
