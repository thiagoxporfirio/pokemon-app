import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private apiUrl = 'https://pokeapi.co/api/v2/pokemon';
  private cachedPokemons: any[] | null = null;

  constructor(private http: HttpClient) {}

  getPokemons(limit: number = 151): Observable<any> {
    if (this.cachedPokemons) {
      return of({ results: this.cachedPokemons });
    }
    return this.http.get<any>(`${this.apiUrl}?limit=${limit}`).pipe(
      tap(response => (this.cachedPokemons = response.results))
    );
  }

  getPokemonDetails(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
}
