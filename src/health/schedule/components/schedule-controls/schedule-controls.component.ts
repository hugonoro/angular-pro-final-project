import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'app-schedule-controls',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['./schedule-controls.component.scss'],
    template: `
      <div class="controls">
        <button type="button" (click)="moveDate(offSet - 1)">
          <img src="/assets/img/chevron-left.svg">
        </button>
        <p>{{ selected | date: 'mediumDate' }}</p>
        <button type="button" (click)="moveDate(offSet + 1)">
          <img src="/assets/img/chevron-right.svg">
        </button>
      </div>
    `
})
export class ScheduleControlsComponent implements OnInit {

    @Input()
    selected: Date;

    @Output()
    move = new EventEmitter<number>();

    offSet = 0;

    constructor() {
    }

    ngOnInit() {
    }

    moveDate(offset: number) {
        this.offSet = offset;
        this.move.emit(offset);
    }

}
