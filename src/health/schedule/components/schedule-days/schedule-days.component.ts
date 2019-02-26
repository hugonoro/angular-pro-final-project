import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'app-schedule-days',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['./schedule-days.component.scss'],
    template: `
      <div class="days">
        <button *ngFor="let day of days; index as i;"
                (click)="selectDay(i)"
                type="button"
                class="day">
          <span [class.active]="i === selected">{{ day }}</span>
        </button>
      </div>
    `
})
export class ScheduleDaysComponent {

    @Input()
    selected: number;

    @Output()
    select = new EventEmitter<number>();

    days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

    selectDay(index: number) {
        this.select.emit(index);
    }

}
