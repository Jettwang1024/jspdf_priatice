import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';
import { registerLocaleData } from '@angular/common';
import zhHant from '@angular/common/locales/zh-Hant';
import { AuthService } from '../../service/system/auth.service';
import { MyMsgService } from '../../shared/service/my-msg.service';
import { CommonService } from '../../shared/service/common.service';
import { userLogin } from '../../models/system/userLogin';

registerLocaleData(zhHant, 'zh-tw');

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  loginForm = this.formBuilder.group({
    account_id: ['' as string, Validators.required],
    account_psw: ['' as string, Validators.required],
    client_ip: ['' as string]
  });
  submitted: boolean = false;
  loading: boolean = false;
  ipAddress: string = '';
  // constructor
  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private messageService: MyMsgService,
    private route: ActivatedRoute,
    private router: Router,
    private commService: CommonService,
  ) {
  }

  ngOnInit(): void {
    // Get ipAddress
    this.commService.getIPAddress().subscribe((result: any) => {
      this.ipAddress = result.ip;
    });
  }

  async onSubmit(frm: FormGroup) {
    this.submitted = true;
    if (frm.invalid) {
      return;
    }

    this.loading = true;

    this.messageService.blockUi();

    this.loginForm.value.client_ip = this.ipAddress;
    this.authService.login(this.loginForm.value as userLogin)
      .pipe(first())
      .subscribe({
        next: () => {
          console.log('登入成功');
          this.messageService.successBubble('登入成功');
          // get return url from query parameters or default to home page
          const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
          this.router.navigateByUrl(returnUrl);
        },
        error: error => {
          console.log('登入失敗');
          this.messageService.errorBubble('登入失敗');
          this.loading = false;
        }
      });
    this.messageService.unblockUi();
  }
}
