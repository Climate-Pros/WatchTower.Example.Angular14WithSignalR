import { Component, OnInit, OnDestroy } from '@angular/core';
import { SignalRService } from '../signalr.service'
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-signalr-status',
  templateUrl: './signalr-status.component.html',
  standalone: true,
  styleUrls: ['./signalr-status.component.html']
})
export class SignalRStatusComponent implements OnInit, OnDestroy {
  connectionStatus: string = 'Disconnected';
  private subscription!: Subscription;

  constructor(private signalRService: SignalRService) {}

  ngOnInit(): void {
    this.subscription = this.signalRService.connectionStatus$.subscribe(status => {
      this.connectionStatus = status;
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
