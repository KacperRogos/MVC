import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { EventList } from './event-list';

describe('EventList', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventList],
      providers: [provideRouter([])]
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(EventList);
    expect(fixture.componentInstance).toBeTruthy();
  });
});