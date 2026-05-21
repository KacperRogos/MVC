import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { EventForm } from './event-form';

describe('EventForm', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventForm],
      providers: [provideRouter([])]
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(EventForm);
    expect(fixture.componentInstance).toBeTruthy();
  });
});