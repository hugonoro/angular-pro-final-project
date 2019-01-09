import { Component } from '@angular/core';

import { Meal } from '../../../shared/services/meals/meals.service';

@Component({
    selector: 'app-meal',
    styleUrls: ['./meal.component.scss'],
    template: `
      <div class="meal">
        <div class="meal__title">
          <h1>
            <img src="/assets/img/food.svg">
            <span>Create meal</span>
          </h1>
        </div>
        <app-meal-form
                (create)="addMeal($event)">
        </app-meal-form>
      </div>
    `
})
export class MealComponent {

    constructor() {
    }

    addMeal(meal: Meal) {
        console.log(meal);
    }

}
