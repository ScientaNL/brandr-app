import {Component, Inject, OnInit} from '@angular/core';
import {BRANDrApiUrl} from "../brandr/brandr-api.service";

@Component({
  selector: 'app-page-api',
  templateUrl: './page-api.component.html',
  styleUrls: ['./page-api.component.scss']
})
export class PageApiComponent {

  constructor(@Inject(BRANDrApiUrl) public apiUrl: string) {
  }
}
