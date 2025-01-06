import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { Member } from '../_models/User';
import { AccountsService } from './accounts.service';
import { of, tap } from 'rxjs';
import { Photo } from '../_models/Photo';

@Injectable({
  providedIn: 'root',
})
export class MembersService {
  private http = inject(HttpClient);
  private accountService = inject(AccountsService);
  baseUrl = environment.apiUrl;
  members = signal<Member[]>([]);

  getMembers() {
    return this.http.get<Member[]>(this.baseUrl + '/users').subscribe({
      next: (members) => this.members.set(members),
    });
  }

  getMember(username: string) {
    const member = this.members().find(
      (member) => member.userName === username
    );

    if (member !== undefined) return of(member);
    return this.http.get<Member>(this.baseUrl + '/users/' + username);
  }
  // getMember(username: string) {
  //   return this.http.get<Member>(
  //     this.baseUrl + '/users/' + username,
  //     this.getHttpOptions()
  //   );
  // }

  updateMember(member: Member) {
    return this.http.put<Member>(this.baseUrl + 'users/', member).pipe(
      tap(() => {
        this.members.update((members) =>
          members.map((m) => (m.userName === member.userName ? member : m))
        );
      })
    );
  }

  setMainPhoto(photo: Photo) {
    return this.http
      .put(this.baseUrl + 'users/set-main-photo/' + photo.id, {})
      .pipe(
        tap(() => {
          this.members.update((members) =>
            members.map((m) => {
              if (m.photos.includes(photo)) {
                m.photoUrl = photo.url;
              }

              return m;
            })
          );
        })
      );
  }

  deletePhoto(photo: Photo) {
    return this.http
      .delete(this.baseUrl + 'users/delete-photo/' + photo.id)
      .pipe(
        tap(() => {
          this.members.update((members) =>
            members.map((m) => {
              m.photos = m.photos.filter((p) => p.id !== photo.id);
              return m;
            })
          );
        })
      );
  }

  getHttpOptions() {
    return {
      headers: new HttpHeaders().set(
        'Authorization',
        `Bearer ${this.accountService.currentUser()?.token}`
      ),
    };
  }
}
