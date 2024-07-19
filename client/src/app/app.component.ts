import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  http = inject(HttpClient);
  title = 'client';
  users: any[] = [];

  ngOnInit(): void {
    this.http.get<any[]>('http://localhost:5213/api/users').subscribe({
      next: (data) => {
        console.log('Data ', data);
        this.users = data;
      },
    });
  }
}
