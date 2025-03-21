import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { TitleCasePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from 'src/app/services/pokemon.service';
import { catchError, finalize } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, TitleCasePipe]
})
export class DetailsPage implements OnInit {
  pokemon: any;
  loading = true;
  error = false;

  constructor(
    private route: ActivatedRoute,
    private pokemonService: PokemonService
  ) {}

  ngOnInit() {
    this.loadPokemonDetails();
  }

  loadPokemonDetails() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loading = true;
      this.error = false;
      
      this.pokemonService.getPokemonDetails(id).pipe(
        catchError(err => {
          console.error('Error fetching pokemon details', err);
          this.error = true;
          return of(null);
        }),
        finalize(() => {
          this.loading = false;
        })
      ).subscribe(response => {
        if (response) {
          this.pokemon = {
            id: response.id,
            name: response.name,
            image: response.sprites.other['official-artwork'].front_default || response.sprites.front_default,
            height: response.height,
            weight: response.weight,
            types: response.types.map((t: any) => t.type.name),
            abilities: response.abilities.map((a: any) => a.ability.name),
          };
        }
      });
    }
  }
}
