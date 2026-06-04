import { TestBed } from '@angular/core/testing';
import { EventService } from './event.service';

describe('EventService', () => {
  let service: EventService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EventService);
  });

  it('powinien zostać utworzony', () => {
    expect(service).toBeTruthy();
  });

  it('powinien zwrócić listę wydarzeń', () => {
    const events = service.getAll();
    expect(events.length).toBeGreaterThan(0);
  });

  it('powinien dodać nowe wydarzenie', () => {
    const before = service.getAll().length;
    service.add({ name: 'Test', date: '2027-01-01', totalSeats: 50, takenSeats: 0 });
    const after = service.getAll().length;
    expect(after).toBe(before + 1);
  });

  it('powinien usunąć wydarzenie', () => {
    service.add({ name: 'DoUsuniecia', date: '2027-02-01', totalSeats: 10, takenSeats: 0 });
    const events = service.getAll();
    const id = events[events.length - 1].id;
    service.delete(id);
    expect(service.getById(id)).toBeUndefined();
  });

  it('powinien zarezerwować bilet', () => {
    service.add({ name: 'Rezerwacja', date: '2027-03-01', totalSeats: 10, takenSeats: 0 });
    const events = service.getAll();
    const event = events[events.length - 1];
    const success = service.reserve(event.id);
    expect(success).toBeTruthy();
  });

  it('nie powinien zarezerwować gdy brak miejsc', () => {
    service.add({ name: 'Pelne', date: '2027-04-01', totalSeats: 1, takenSeats: 1 });
    const events = service.getAll();
    const event = events[events.length - 1];
    const success = service.reserve(event.id);
    expect(success).toBeFalsy();
  });
});