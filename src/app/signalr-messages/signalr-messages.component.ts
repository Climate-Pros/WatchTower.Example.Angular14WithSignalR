import { Component, OnInit, OnDestroy } from '@angular/core';
import { SignalRService } from '../signalr.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-signalr-messages',
    templateUrl: './signalr-messages.component.html',
    standalone: true,
    styleUrls: ['./signalr-messages.component.css']
})
export class SignalRMessagesComponent implements OnInit, OnDestroy {
  messages: string[] = [];
  private subscription!: Subscription;

  constructor(private signalRService: SignalRService) {}

  ngOnInit(): void {
    this.subscription = this.signalRService.messages$.subscribe(messages => {
      this.messages = messages;
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
