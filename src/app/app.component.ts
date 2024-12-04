import { Component } from '@angular/core';
import {SignalRService} from "./signalr.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [SignalRService],
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'untitled5';
}
