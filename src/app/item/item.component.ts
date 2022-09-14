import { Component, Input } from '@angular/core';
import { StarWarsService } from '../star-wars.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent{

  @Input() character: any;

  constructor(private starWarsService: StarWarsService) {}

  onSideChosen(side: string) {
    this.starWarsService.onSideChosen({name: this.character.name, side: side});
  }
}
