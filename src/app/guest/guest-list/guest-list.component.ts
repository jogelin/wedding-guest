import {Component, OnInit} from '@angular/core';
import {Http, Response} from "@angular/http";
import {Guest} from "../types/guest";
import 'rxjs/add/operator/map';


@Component({
  selector: 'wg-guest-list',
  template: `<div *ngFor="let guest of guests$ | async">
    {{guest.name}}
</div>`,
  styleUrls: ['guest-list.component.css']
})
export class GuestListComponent implements OnInit {

  guests$;

  constructor(private http:Http) {
  }

  ngOnInit() {
    this.guests$ = this.http.get('app/guests')
      .map((res: Response) => res.json().data as Guest[]);
  }

}
