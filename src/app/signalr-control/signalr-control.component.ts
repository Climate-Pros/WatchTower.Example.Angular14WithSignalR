import {Component} from '@angular/core';
import {SignalRService} from '../signalr.service';

@Component({
  standalone: true,
  selector: 'app-signalr-control',
  templateUrl: './signalr-control.component.html',
  styleUrls: ['./signalr-control.component.css']
})
export class SignalRControlComponent {
  constructor(private signalRService: SignalRService) {
  }

  startConnection(): void {
    this.signalRService.startConnection();
  }

  stopConnection(): void {
    this.signalRService.stopConnection();
  }
}
