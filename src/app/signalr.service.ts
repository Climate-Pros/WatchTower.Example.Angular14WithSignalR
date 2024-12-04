import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {
  private hubConnection!: signalR.HubConnection;
  private connectionStatusSubject = new BehaviorSubject<string>('Disconnected');
  private messagesSubject = new BehaviorSubject<string[]>([]);

  constructor() {
    this.startConnection();
    this.setupMessageSending();
  }

  public get connectionStatus$(): Observable<string> {
    return this.connectionStatusSubject.asObservable();
  }

  public get messages$(): Observable<string[]> {
    return this.messagesSubject.asObservable();
  }

  public startConnection(): void {
    if (this.hubConnection && this.hubConnection.state === signalR.HubConnectionState.Connected) {
      return;
    }

    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('https://devicemanager.az-dev.watchtower2.com/hubs/sitesync') // Replace with your SignalR endpoint
      .configureLogging(signalR.LogLevel.Information)
      .withAutomaticReconnect() // Enables automatic reconnection if the connection drops
      .build();

    this.hubConnection
      .start()
      .then(() => {
        console.log('SignalR Connection Started');
        this.connectionStatusSubject.next('Connected');
        this.joinGroup('test');
      })
      .catch(err => {
        console.error('Error while starting SignalR connection:', err);
        this.connectionStatusSubject.next('Disconnected');
      });

    this.hubConnection.onreconnecting(() => {
      this.connectionStatusSubject.next('Reconnecting...');
    });

    this.hubConnection.onreconnected(() => {
      this.connectionStatusSubject.next('Connected');
      this.joinGroup('test');
    });

    this.hubConnection.onclose(() => {
      this.connectionStatusSubject.next('Disconnected');
    });

    this.hubConnection.on('ReceiveMessage', (message: string) => {
      const currentMessages = this.messagesSubject.getValue();
      this.messagesSubject.next([...currentMessages, message]);
    });
  }

  public stopConnection(): void {
    if (this.hubConnection && this.hubConnection.state === signalR.HubConnectionState.Connected) {
      this.hubConnection.stop().then(() => {
        console.log('SignalR Connection Stopped');
        this.connectionStatusSubject.next('Disconnected');
      });
    }
  }

  private joinGroup(groupName: string): void {
    if (this.hubConnection && this.hubConnection.state === signalR.HubConnectionState.Connected) {
      this.hubConnection.invoke('JoinGroup', groupName)
        .then(() => {
          console.log(`Joined group: ${groupName}`);
        })
        .catch(err => {
          console.error('Error while joining group:', err);
        });
    }
  }

  private setupMessageSending(): void {
    setInterval(() => {
      if (this.hubConnection && this.hubConnection.state === signalR.HubConnectionState.Connected) {
        const currentTime = new Date().toLocaleTimeString();
        const message = `${currentTime}: test`;
        this.hubConnection.invoke('SendMessage', 'test', message)
          .then(() => {
            console.log(`Message sent: ${message}`);
          })
          .catch(err => {
            console.error('Error while sending message:', err);
          });
      }
    }, 5000);
  }
}
