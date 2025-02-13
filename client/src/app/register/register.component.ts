import { Component, inject, input, Input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../_models/User';
import { AccountsService } from '../_services/accounts.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  // @Input({ required: true }) usersFromHomeComponent: any[] = [];
  // usersFromHomeComponent: any = input.required<any>();
  // @Output() cancelRegister = new EventEmitter<boolean>();
  private accountService = inject(AccountsService);
  private toastr = inject(ToastrService);
  cancelRegister = output<boolean>();
  model: any = {};

  register() {
    this.accountService.register(this.model).subscribe({
      next: (response) => {
        console.log(response);
        this.cancel();
      },
      error: (err) => {
        console.log(err);
        this.toastr.error(err.error);
      },
    });
  }

  cancel() {
    console.log('Cancelled');
    this.cancelRegister.emit(false);
  }
}
