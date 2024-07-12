import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, ValidationErrors, Validators } from '@angular/forms';
import { MyMsgService } from '../../../shared/service/my-msg.service';

@Component({
    selector: 'app-changepsw',
    templateUrl: './changepsw.component.html',
    styleUrl: './changepsw.component.scss',
})
export class ChangepswComponent {
  ProgNo: string = '110002';
  error = '';
  loading = false;
  submitted!: boolean;

  userForm = this.formBuilder.group({
    oldpass: ['', Validators.required],
    newpass1: ['', Validators.required],
    newpass2: ['', Validators.required]
  },
  {
    validators: [
      this.matchPassword("newpass1", "newpass2"),
    ],
  });

  constructor(
    private formBuilder: FormBuilder,
    private messageService: MyMsgService,) {
  }

  get f() { return this.userForm.controls; }

  changePass() {
    this.submitted = true;
    if (this.userForm.invalid) {
      return;
    }

    this.messageService.blockUi();
/*
    this.userService.changepass((localStorage.getItem("User") || ""), this.f.oldpass.value!, this.f.newpass1.value!)
      .subscribe((response: any) => {
        //var response = JSON.parse(JSON.stringify(data));
        if (response && response.rc == "0000") {
          this.messageService.successBubble('更新成功');
        } else if (response && response.rc == "9904") {
          this.messageService.warnBubble("Token已過期，請重新登入");
          this.authService.logout(localStorage.getItem("Token") || "");
        } else {
          this.messageService.errorBox("更新失敗 " + response.rm);
        }
      })
*/
      this.submitted = false;
      this.userForm.reset();
      this.messageService.unblockUi();
  }

  matchPassword(password: string, confirmPassword: string) {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const passwordControl = formGroup.get(password);
      const confirmPasswordControl = formGroup.get(confirmPassword);

      if (!passwordControl || !confirmPasswordControl) {
        return null;
      }

      if (
        confirmPasswordControl.errors &&
        !confirmPasswordControl.errors["passwordMismatch"]
      ) {
        return null;
      }

      if (passwordControl.value !== confirmPasswordControl.value) {
        confirmPasswordControl.setErrors({ passwordMismatch: true });
        return { passwordMismatch: true };
      } else {
        confirmPasswordControl.setErrors(null);
        return null;
      }
    };
  }
}
