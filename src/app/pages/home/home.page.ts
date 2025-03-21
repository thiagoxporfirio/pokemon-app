import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TitleCasePipe } from '@angular/common';
import { PokemonService } from 'src/app/services/pokemon.service';
import { catchError, finalize } from 'rxjs/operators';
import { of } from 'rxjs';
import { Platform } from '@ionic/angular';

interface Pokemon {
	id: number;
	name: string;
	image: string;
	types?: string[];
}

@Component({
	selector: 'app-home',
	templateUrl: './home.page.html',
	styleUrls: ['./home.page.scss'],
	standalone: true,
	imports: [IonicModule, RouterModule, CommonModule, TitleCasePipe]
})
export class HomePage implements OnInit {
	pokemons: Pokemon[] = [];
	filteredPokemons: Pokemon[] = [];
	loading = true;
	error = false;
	searchTerm = '';
	pageSize = 20;
	currentPage = 1;
	hasMorePokemon = true;
	isFiltering = false;
	logoExists = false;

	constructor(
		private pokemonService: PokemonService,
		private platform: Platform
	) {}

	ngOnInit() {
		this.checkLogoExists();
		this.loadPokemons();

		this.adjustPageSize();
		this.platform.resize.subscribe(() => {
			this.adjustPageSize();
		});
	}

	adjustPageSize() {
		if (this.platform.width() < 576) {
			this.pageSize = 10;
		} else if (this.platform.width() < 992) {
			this.pageSize = 20;
		} else {
			this.pageSize = 30;
		}
	}

	checkLogoExists() {
		const img = new Image();
		img.onload = () => {
			this.logoExists = true;
		};
		img.onerror = () => {
			this.logoExists = false;
		};
		img.src = 'assets/pokedex-logo.png';
	}

	loadPokemons(limit = 151) {
		this.loading = true;
		this.error = false;

		this.pokemonService
			.getPokemons(limit)
			.pipe(
				catchError(error => {
					console.error('Error fetching Pokémon:', error);
					this.error = true;
					return of({ results: [] });
				}),
				finalize(() => {
					this.loading = false;
				})
			)
			.subscribe(response => {
				const results = response.results || [];
				this.pokemons = results.map((p: any, index: number) => ({
					id: index + 1,
					name: p.name,
					image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${index + 1}.png`
				}));

				this.filteredPokemons = this.pokemons.slice(0, this.pageSize);
				this.hasMorePokemon = this.pokemons.length > this.pageSize;

				this.loadPokemonDetails();
			});
	}

	loadPokemonDetails() {
		this.filteredPokemons.forEach((pokemon, index) => {
			if (!pokemon.types) {
				this.pokemonService.getPokemonDetails(pokemon.id.toString()).subscribe(
					details => {
						if (details) {
							this.filteredPokemons[index] = {
								...pokemon,
								types: details.types.map((t: any) => t.type.name)
							};

							const mainIndex = this.pokemons.findIndex(
								p => p.id === pokemon.id
							);
							if (mainIndex >= 0) {
								this.pokemons[mainIndex] = {
									...this.pokemons[mainIndex],
									types: details.types.map((t: any) => t.type.name)
								};
							}
						}
					},
					error =>
						console.error(`Error loading details for ${pokemon.name}:`, error)
				);
			}
		});
	}

	filterPokemons(event: any) {
		this.searchTerm = event.target.value.toLowerCase().trim();
		this.isFiltering = !!this.searchTerm;
		this.loading = true;

		setTimeout(() => {
			if (this.searchTerm) {
				this.filteredPokemons = this.pokemons.filter(
					pokemon =>
						pokemon.name.toLowerCase().includes(this.searchTerm) ||
						pokemon.id.toString() === this.searchTerm
				);
			} else {
				this.filteredPokemons = this.pokemons.slice(0, this.pageSize);
				this.currentPage = 1;
				this.hasMorePokemon = this.pokemons.length > this.pageSize;
				this.isFiltering = false;
			}
			this.loading = false;
		}, 300);
	}

	loadMorePokemon(event: any) {
		if (this.isFiltering || !this.hasMorePokemon) {
			event.target.complete();
			return;
		}

		setTimeout(() => {
			this.currentPage++;
			const nextItems = this.pokemons.slice(
				(this.currentPage - 1) * this.pageSize,
				this.currentPage * this.pageSize
			);

			this.filteredPokemons = [...this.filteredPokemons, ...nextItems];

			this.hasMorePokemon =
				this.currentPage * this.pageSize < this.pokemons.length;

			this.loadPokemonDetails();

			event.target.complete();
		}, 500);
	}
}
