import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { EventDetail } from './event-detail';

describe('EventDetail', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventDetail],
      providers: [provideRouter([])]
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(EventDetail);
    expect(fixture.componentInstance).toBeTruthy();
  });
});