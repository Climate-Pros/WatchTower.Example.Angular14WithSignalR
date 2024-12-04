import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {SignalRMessagesComponent} from "./signalr-messages/signalr-messages.component";
import {SignalRStatusComponent} from "./signalr.status/signalr-status.component.spec";
import {SignalRControlComponent} from "./signalr-control/signalr-control.component";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    SignalRMessagesComponent,
    SignalRStatusComponent,
    SignalRControlComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
