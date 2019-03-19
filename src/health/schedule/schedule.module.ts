import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { ScheduleCalendarComponent } from './components/schedule-calendar/schedule-calendar.component';
import { ScheduleControlsComponent } from './components/schedule-controls/schedule-controls.component';
import { ScheduleDaysComponent } from './components/schedule-days/schedule-days.component';
import { ScheduleComponent } from './containers/schedule/schedule.component';

import { ScheduleRoutingModule } from './schedule-routing.module';
import { ScheduleSectionComponent } from './components/schedule-section/schedule-section.component';
import { ScheduleAssignComponent } from './components/schedule-assign/schedule-assign.component';

@NgModule({
    declarations: [
        ScheduleComponent,
        ScheduleCalendarComponent,
        ScheduleDaysComponent,
        ScheduleControlsComponent,
        ScheduleSectionComponent,
        ScheduleAssignComponent
    ],
    imports: [
        CommonModule,
        ScheduleRoutingModule,
        ReactiveFormsModule,
        SharedModule
    ]
})
export class ScheduleModule {
}
