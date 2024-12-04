import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignalRMessagesComponent } from './signalr-messages.component';

describe('SignalRMessagesComponent', () => {
  let component: SignalRMessagesComponent;
  let fixture: ComponentFixture<SignalRMessagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignalRMessagesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignalRMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
