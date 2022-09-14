import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StarWarsService } from '../star-wars.service';
import { Person } from '../interfaces/person.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit, OnDestroy{
  // Gets characters from tabs
  characters: Array<Person>;
  // Used to track changes to side depending on route
  loadedSide = 'all';

  // Manage our subscriptions for our own created Subjects.
  subscription: Subscription;

  constructor(private activatedRoute: ActivatedRoute, private starWarsService: StarWarsService) {}

  // Executes whenever this component is created
  ngOnInit() {
    this.activatedRoute.params.subscribe(
      // (params) is a function which receives the updated params which we can now handle
      // the (params) function will get executed evertime params changes
      (params) => {
        // used to load our data
        this.characters = this.starWarsService.getCharacters(params['side']);
        // Updates the current loadedSide when route changes
        this.loadedSide = params['side'];
      }
    );
    this.subscription = this.starWarsService.charactersChanges.subscribe(
      () => {
        // Gets the newly updated characters list from starwars service when side changes.
        this.characters = this.starWarsService.getCharacters(this.loadedSide);
      }
    )
  }

  // Executes whenever this component is about to get destroyed
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
