import { Component, OnInit } from '@angular/core';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  title = 'Smart Event Planner';
  events: any[] = [];

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api.getEvents().subscribe((data) => {
      this.events = data;
    });
  }

  book(event: any) {
    this.api
      .bookEvent({
        event_id: event.id,
        attendee_id: 1,
        tickets_booked: 1,
        total_price: 500,
      })
      .subscribe({
        next: () => {
          alert('Booking successful');

          event.capacity -= 1; // seat counter update
          event.booked = true; // UI status update
        },
        error: (err) => {
          alert(err.error.message || 'Booking failed');
        },
      });
  }
}
