import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TitleCasePipe } from '@angular/common';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonicModule, RouterModule, CommonModule, TitleCasePipe] // Add necessary imports
})
export class HomePage implements OnInit {
  pokemons: any[] = [];
  filteredPokemons: any[] = [];
  loading: boolean = false; // Add loading property

  constructor(private pokemonService: PokemonService) {}

  ngOnInit() {
    this.pokemonService.getPokemons().subscribe(response => {
      this.pokemons = response.results.map((p: any, index: number) => ({
        id: index + 1,
        name: p.name,
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`
      }));
      this.filteredPokemons = this.pokemons;
    });
  }

  filterPokemons(event: any) {
    const searchTerm = event.target.value.toLowerCase();
    this.loading = true; // Start loading
    setTimeout(() => {
      this.filteredPokemons = this.pokemons.filter(pokemon =>
        pokemon.name.toLowerCase().includes(searchTerm)
      );
      this.loading = false; // Stop loading
    }, 500); // Simulate a delay for better UX
  }
}
