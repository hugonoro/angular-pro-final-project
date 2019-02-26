import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ScheduleCalendarComponent } from './components/schedule-calendar/schedule-calendar.component';
import { ScheduleControlsComponent } from './components/schedule-controls/schedule-controls.component';
import { ScheduleDaysComponent } from './components/schedule-days/schedule-days.component';
import { ScheduleComponent } from './containers/schedule/schedule.component';

import { ScheduleRoutingModule } from './schedule-routing.module';

@NgModule({
    declarations: [
        ScheduleComponent,
        ScheduleCalendarComponent,
        ScheduleDaysComponent,
        ScheduleControlsComponent
    ],
    imports: [
        CommonModule,
        ScheduleRoutingModule,
        ReactiveFormsModule
    ]
})
export class ScheduleModule {
}
