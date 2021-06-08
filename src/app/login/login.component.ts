import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { UserService } from '../user.service';
import Toastify from 'toastify-js'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
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

  loginUser() {
    this.signing = true;
      this._userService.signUser(this.signInForm.value)
        .pipe(finalize(() => this.signing = false))
        .subscribe(
          (res: any) => {
            const notify = {
              message: 'Login Successfull',
              status: 'success'
            };
            this.notify(notify);
            sessionStorage.setItem('CORE_SESSION', res.token);
            this.router.navigate(['/dashboard']);
          },
          (err: any) => {
            const errMsg = (err.error.error) ? err.error.error : 'Server Error, Please, try again.';
            const notify = {
              message: `Login Failed: ${errMsg}`,
              status: 'error'
            };
            this.notify(notify);
          }
      );
  }

}
