import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { TitleCasePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, TitleCasePipe] // Add necessary imports
})
export class DetailsPage implements OnInit {
  pokemon: any;

  constructor(
    private route: ActivatedRoute,
    private pokemonService: PokemonService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.pokemonService.getPokemonDetails(id).subscribe(response => {
        this.pokemon = {
          name: response.name,
          image: response.sprites.front_default,
          height: response.height,
          weight: response.weight,
          types: response.types.map((t: any) => t.type.name),
          abilities: response.abilities.map((a: any) => a.ability.name),
        };
      });
    }
  }
}
