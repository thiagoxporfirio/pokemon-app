import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class PokemonService {
	private apiUrl = 'https://pokeapi.co/api/v2/pokemon';
	private cachedPokemons: any[] | null = null;
	private cachedPokemonDetails: Map<string, any> = new Map();

	constructor(private http: HttpClient) {}

	getPokemons(limit: number = 151): Observable<any> {
		if (this.cachedPokemons) {
			return of({ results: this.cachedPokemons });
		}
		return this.http.get<any>(`${this.apiUrl}?limit=${limit}`).pipe(
			tap(response => (this.cachedPokemons = response.results)),
			catchError(error => {
				console.error('Error fetching Pokemon list:', error);
				return of({ results: [] });
			})
		);
	}

	getPokemonDetails(id: string): Observable<any> {
		if (this.cachedPokemonDetails.has(id)) {
			return of(this.cachedPokemonDetails.get(id));
		}

		return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(
			tap(details => {
				this.cachedPokemonDetails.set(id, details);
			}),
			catchError(error => {
				console.error(`Error fetching details for Pokemon ${id}:`, error);
				return of(null);
			})
		);
	}
}
