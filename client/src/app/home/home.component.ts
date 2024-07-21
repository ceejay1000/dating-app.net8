import { Component, inject, OnInit } from '@angular/core';
import { RegisterComponent } from '../register/register.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RegisterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  registerMode = false;
  users: any[] = [];
  http = inject(HttpClient);

  ngOnInit(): void {
    this.getUsers();
  }

  registerToggle() {
    this.registerMode = !this.registerMode;
  }

  cancelRegisterMode($event: boolean) {
    this.registerMode = $event;
  }

  getUsers() {
    this.http.get<any[]>('http://localhost:5213/api/users').subscribe({
      next: (data) => {
        console.log('Data ', data);
        this.users = data;
      },
    });
  }
}
