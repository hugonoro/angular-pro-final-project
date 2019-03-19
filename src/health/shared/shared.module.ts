import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularFireDatabaseModule } from '@angular/fire/database';

import { MealsService } from './services/meals/meals.service';
import { ScheduleService } from './services/schedule/schedule.service';
import { WorkoutsService } from './services/workouts/workouts.service';
import { SharedRoutingModule } from './shared-routing.module';
import { ListItemComponent } from './components/list-item/list-item.component';
import { JoinPipe } from './pipes/join.pipe';
import { WorkoutPipe } from './pipes/workout.pipe';

@NgModule({
    declarations: [
        ListItemComponent,
        JoinPipe,
        WorkoutPipe
    ],
    imports: [
        CommonModule,
        SharedRoutingModule,
        AngularFireDatabaseModule
    ],
    exports: [
        ListItemComponent,
        JoinPipe,
        WorkoutPipe
    ]
})
export class SharedModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: SharedModule,
            providers: [
                MealsService,
                WorkoutsService,
                ScheduleService
            ]
        };
    }
}
