import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service'
import { finalize } from "rxjs/operators";
import Toastify from 'toastify-js'

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  signInForm: FormGroup;
  userImg = 'https://firebasestorage.googleapis.com/v0/b/iserveu_storage/o/AdminFolder%2FinHouse%2Fphoto.png?alt=media&token=b0198a05-5988-4469-bdce-d52afb30ff19';
  signing: boolean = false;

  constructor(private _userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.signInForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  
  notify(options: { message: string, status: string }) {
    Toastify({
      text: options.message,
      duration: 5000,
      className: (options.status === 'success') ? 'toastr-base toastr-success' : 'toastr-base toastr-error',
      close: true
    }).showToast();
  }

  registrationUser() {
    this.signing = true;
      this._userService.registerUser(this.signInForm.value)
        .pipe(finalize(() => this.signing = false))
        .subscribe(
          (res: any) => {
            const notify = {
              message: 'Successfully Registered!',
              status: 'success'
            };
            this.notify(notify);
          },
          (err: any) => {
            const errMsg = (err.error.error) ? err.error.error : 'Server Error, Please, try again.';
            const notify = {
              message: `User Registration Failed: ${errMsg}`,
              status: 'error'
            };
            this.notify(notify);
          }
      );
  }

}


