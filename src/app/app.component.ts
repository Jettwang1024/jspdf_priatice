import { Component, OnInit, } from '@angular/core';
import { AuthService } from './service/system/auth.service';
import { InactivityService } from './shared/service/inactivity.service';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService, PrimeNGConfig } from 'primeng/api';
import { MyMsgService } from './shared/service/my-msg.service';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  blockedDocument: boolean = false;
  //
  msgBoxDisplay: boolean = false;
  msgBoxHeader: string = "Information";
  msgBoxMessage: string = '';
  //
  inputBoxDisplay: boolean = false;
  inputBoxHeader: string = 'Comment';
  inputBoxMessage: string = '';
  inputBoxInputText: string = '';
  //
  inputBoxCancel?: () => void;
  //
  inputBoxOK?: (value: string) => void;

  constructor(
    private inactivityService: InactivityService,
    private authService: AuthService,
    private router: Router,
    private primengConfig: PrimeNGConfig,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    public msgService: MyMsgService,) {
    //
    this.primengConfig.ripple = true;
  }

  ngOnInit(): void {

    // InactivityService will start monitoring user activity automatically
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/account/login']);
    }

    this.primengConfig.ripple = true;

    // Message service for whole system
    this.msgService.bubbleMsg$.subscribe((message: any) => {
      this.messageService.add(message);
    });

    this.msgService.boxMsg.subscribe((opts) => {
      this.msgBoxHeader = opts?.header ? opts?.header : 'Alert';
      this.msgBoxMessage = opts?.message ? opts?.message : '';
      this.msgBoxDisplay = true;
    });

    // Confirmation
    this.msgService.confirmMsg.subscribe((opts?: {
      header?: string,
      message?: string,
      accept?: () => void,
      reject?: () => void,
    }) => {
      this.confirmationService.confirm({
        header: opts?.header,
        message: opts?.message,
        accept: () => {
          this.confirmationService.close();
          if (opts?.accept != null) {
            opts.accept();
          }
        },
        reject: () => {
          this.confirmationService.close();
          if (opts?.reject != null) {
            opts.reject();
          }
        }
      });
    });

    // 只有 block UI 要等候 500ms
    // unblock UI 立即執行
    this.msgService.blockUiMsg.pipe(
      // 延後 500 毫秒還在 Loading 才 blockUI
      debounceTime(500),
      distinctUntilChanged(),
    )
      .subscribe((blocked) => {
        if (blocked) this.blockedDocument = true;
      });
    this.msgService.unblockUiMsg
      .subscribe((unblocked) => {
        if (unblocked) this.blockedDocument = false;
      });

    // InputBox
    this.msgService.inputBoxMsg.subscribe((opts?: {
      header: string,
      message: string,
      ok?: (value: string) => void,
      cancel?: () => void,
    }) => {
      this.inputBoxDisplay = true;
      this.inputBoxHeader = opts?.header ? opts.header : 'Input';
      this.inputBoxMessage = opts?.message ? opts.message : '';
      this.inputBoxInputText = '';
      // this.txtInputBoxInputText
      if (opts?.ok) {
        this.inputBoxOK = opts.ok;
      } else {
        this.inputBoxOK = undefined;
      }
      if (opts?.cancel) {
        this.inputBoxCancel = opts.cancel;
      } else {
        this.inputBoxCancel = undefined;
      }
    });
  }

  hideAndCleanMsgBox() {
    this.msgBoxDisplay = false;
    this.msgBoxHeader = '';
    this.msgBoxMessage = '';
  }

  onClickInputBoxCancel() {
    if (this.inputBoxCancel) {
      this.inputBoxCancel();
    }
    this.inputBoxDisplay = false;
    this.inputBoxCancel = undefined;
    this.inputBoxHeader = '';
    this.inputBoxInputText = '';
    this.inputBoxMessage = '';
  }

  onClickInputBoxOK() {
    if (this.inputBoxOK) {
      this.inputBoxOK(this.inputBoxInputText);
    }
    this.inputBoxDisplay = false;
    this.inputBoxOK = undefined;
    this.inputBoxHeader = '';
    this.inputBoxInputText = '';
    this.inputBoxMessage = '';
  }
}
