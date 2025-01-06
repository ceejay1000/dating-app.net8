import { Component, inject, input, OnInit, output, Pipe } from '@angular/core';
import { Member } from '../../_models/User';
import { FileUploader, FileUploadModule } from 'ng2-file-upload';
import { DecimalPipe, NgClass, NgFor, NgIf, NgStyle } from '@angular/common';
import { AccountsService } from '../../_services/accounts.service';
import { environment } from '../../../environments/environment';
import { MembersService } from '../../_services/members.service';
import { Photo } from '../../_models/Photo';

@Component({
  selector: 'app-photo-editor',
  standalone: true,
  imports: [NgIf, NgFor, NgStyle, NgClass, FileUploadModule, DecimalPipe],
  templateUrl: './photo-editor.component.html',
  styleUrl: './photo-editor.component.css',
})
export class PhotoEditorComponent implements OnInit {
  member = input.required<Member>();
  private accountService = inject(AccountsService);
  uploader!: FileUploader;
  hasBaseDropZoneOver!: boolean;
  hasAnotherDropZoneOver!: boolean;
  response!: string;
  url = environment.apiUrl;
  memberChange = output<Member>();
  private memberService = inject(MembersService);

  constructor() {
    // this.initializeUpload();
  }
  private initializeUpload() {
    this.uploader = new FileUploader({
      url: this.url,
      disableMultipart: true, // 'DisableMultipart' must be 'true' for formatDataFunction to be called.
      formatDataFunctionIsAsync: true,
      authToken: 'Bearer ' + this.accountService.currentUser()?.token,
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024,
      // formatDataFunction: async (item) => {
      //   return new Promise((resolve, reject) => {
      //     resolve({
      //       name: item._file.name,
      //       length: item._file.size,
      //       contentType: item._file.type,
      //       date: new Date(),
      //     });
      //   });
      // },
    });

    this.hasBaseDropZoneOver = false;
    this.hasAnotherDropZoneOver = false;

    this.response = '';
    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    };
    this.uploader.onSuccessItem = (item, response, status, headers) => {
      const photo = JSON.parse(response);
      const updatedMember = { ...this.member() };
      updatedMember.photos.push(photo);
      this.memberChange.emit(updatedMember);
    };
    this.uploader.response.subscribe((res) => (this.response = res));
  }

  ngOnInit(): void {
    this.initializeUpload();
  }

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  deletePhoto(photo: Photo) {
    this.memberService.deletePhoto(photo).subscribe({
      next: (_) => {
        const updatedMember = { ...this.member() };
        updatedMember.photos = updatedMember.photos.filter(
          (p) => p.id !== photo.id
        );
        this.memberChange.emit(updatedMember);
      },
    });
  }

  setMainPhoto(photo: Photo) {
    this.memberService.setMainPhoto(photo).subscribe({
      next: (_) => {
        const user = this.accountService.currentUser();
        if (user) {
          user.PhotoUrl = photo.url;
          this.accountService.setCurrentUser(user);
        }
        const updatedMember = { ...this.member() };
        updatedMember.photoUrl = photo.url;
        updatedMember.photos.forEach((p) => {
          if (!p.isMain) {
            p.isMain = false;
          }
          if (p.id === photo.id) {
            p.isMain = true;
          }
          this.memberChange.emit(updatedMember);
        });
      },
    });
  }

  public fileOverAnother(e: any): void {
    this.hasAnotherDropZoneOver = e;
  }
}
