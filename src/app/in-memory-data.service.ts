import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Hero } from './hero';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const heroes = [
      { id: 11, name: 'All Mignt' },
      { id: 12, name: 'Eraserhead' },
      { id: 13, name: 'Present Mic' },
      { id: 14, name: 'Best Jeanist' },
      { id: 15, name: 'Endeavor' },
      { id: 16, name: 'Midnight' },
      { id: 17, name: 'Hawks' },
      { id: 18, name: 'Rock Lock' },
      { id: 19, name: 'Genos' },
      { id: 20, name: 'Saitama' }
    ];
    return {heroes};
  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.
  genId(heroes: Hero[]): number {
    return heroes.length > 0 ? Math.max(...heroes.map(hero => hero.id)) + 1 : 11;
  }
}