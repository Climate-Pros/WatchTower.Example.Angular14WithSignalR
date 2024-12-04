import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignalRControlComponent } from './signalr-control.component';

describe('SignalRControlComponent', () => {
  let component: SignalRControlComponent;
  let fixture: ComponentFixture<SignalRControlComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SignalRControlComponent]
    });
    fixture = TestBed.createComponent(SignalRControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
