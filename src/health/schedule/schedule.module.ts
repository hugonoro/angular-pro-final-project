import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ScheduleComponent } from './containers/schedule/schedule.component';

import { ScheduleRoutingModule } from './schedule-routing.module';

@NgModule({
    declarations: [
        ScheduleComponent
    ],
    imports: [
        CommonModule,
        ScheduleRoutingModule,
        ReactiveFormsModule
    ]
})
export class ScheduleModule {
}
