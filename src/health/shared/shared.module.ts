import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularFireDatabaseModule } from '@angular/fire/database';

import { MealsService } from './services/meals/meals.service';
import { WorkoutsService } from './services/workouts/workouts.service';
import { SharedRoutingModule } from './shared-routing.module';
import { ListItemComponent } from './components/list-item/list-item.component';

@NgModule({
    declarations: [
        ListItemComponent
    ],
    imports: [
        CommonModule,
        SharedRoutingModule,
        AngularFireDatabaseModule
    ],
    exports: [
        ListItemComponent
    ]
})
export class SharedModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: SharedModule,
            providers: [
                MealsService,
                WorkoutsService
            ]
        };
    }
}
