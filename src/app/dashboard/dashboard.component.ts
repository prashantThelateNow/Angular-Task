import { Component, OnInit, ViewChild } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { UserService } from '../user.service';
import Toastify from 'toastify-js'
import { NgxSpinnerService } from 'ngx-spinner';
import * as vex from 'vex-js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  usersList: any;
  @ViewChild('usermodal', { static: false }) public infoModal: any;
  user_data: any;
  user_support: any;

  constructor(private _userService: UserService, private ngxSpinner: NgxSpinnerService,) { }

  ngOnInit(): void {
    this.fetchUsersList();
  }

  notify(options: { message: string, status: string }) {
    Toastify({
      text: options.message,
      duration: 5000,
      className: (options.status === 'success') ? 'toastr-base toastr-success' : 'toastr-base toastr-error',
      close: true
    }).showToast();
  }

  fetchUsersList(){
    // this.ngxSpinner.show("spinner");
    this._userService.fetchUsers()
    .pipe(finalize(() => { this.ngxSpinner.hide("spinner"); } ))
    .subscribe(
      (res: any) => {
        // const notify = {
        //   message: 'Users fetched Successfully!',
        //   status: 'success'
        // };
        // this.notify(notify);
        this.usersList = res.data;
        
      },
      (err: any) => {
        const errMsg = (err.error.error) ? err.error.error : 'Server Error, Please, try again.';
        const notify = {
          message: `Failed: ${errMsg}`,
          status: 'error'
        };
        this.notify(notify);
      }
  );
  }

  showInfo(id: any){
    // this.ngxSpinner.show("spinner");
    this._userService.fetchUserInfo(id)
    .pipe(finalize(() => { this.ngxSpinner.hide("spinner"); } ))
    .subscribe(
      (res: any) => {
        this.user_data = res.data;
        this.user_support = res.support;
    //     vex.dialog.alert({ unsafeMessage: `<div class="row">
    //     <p><label>ID</label>: ${this.user_data.id}</p>
    //     <p><label>Email</label>: ${this.user_data.email}</p>
    //     <p><label>First Name</label>: ${this.user_data.first_name}</p>
    //     <p><label>Last Name</label>: ${this.user_data.last_name}</p>
    //     <p><label>Avatar</label>: ${this.user_data.avatar}</p>
    //     <p><label>URL</label>: ${this.user_support.url}</p>
    //     <p><label>Text</label>: ${this.user_support.text}</p>
    // </div>`});
       
      },
      (err: any) => {
        const errMsg = (err.error.error) ? err.error.error : 'Server Error, Please, try again.';
        const notify = {
          message: `Failed: ${errMsg}`,
          status: 'error'
        };
        this.notify(notify);
      }
  );
  }
}
