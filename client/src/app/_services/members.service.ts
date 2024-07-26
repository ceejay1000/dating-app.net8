import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Member } from '../_models/User';
import { AccountsService } from './accounts.service';

@Injectable({
  providedIn: 'root',
})
export class MembersService {
  private http = inject(HttpClient);
  private accountService = inject(AccountsService);
  baseUrl = environment.apiUrl;

  getMembers() {
    return this.http.get<Member[]>(this.baseUrl + '/users');
  }

  getMember(username: string) {
    return this.http.get<Member>(this.baseUrl + '/users/' + username);
  }
  // getMember(username: string) {
  //   return this.http.get<Member>(
  //     this.baseUrl + '/users/' + username,
  //     this.getHttpOptions()
  //   );
  // }

  getHttpOptions() {
    return {
      headers: new HttpHeaders().set(
        'Authorization',
        `Bearer ${this.accountService.currentUser()?.token}`
      ),
    };
  }
}
