import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

interface Message {
  severity: string;
  summary: string;
  detail: string;
}
@Injectable({
  providedIn: 'root'
})
export class MyMsgService implements OnInit {
  private bubbleMsgSource = new BehaviorSubject<Message>({ severity: '', summary: '', detail: '' });
  // Observable stream
  bubbleMsg$ = this.bubbleMsgSource.asObservable();

  private boxMsgSource = new Subject<any>();
  boxMsg = this.boxMsgSource.asObservable();

  private blockUiSource = new BehaviorSubject<boolean>(false);
  blockUiMsg = this.blockUiSource.asObservable();

  private unblockUiSource = new BehaviorSubject<boolean>(false);
  unblockUiMsg = this.unblockUiSource.asObservable();

  private confirmMsgSource = new Subject<any>();
  confirmMsg = this.confirmMsgSource.asObservable();

  private inputBoxSource = new Subject<any>();
  inputBoxMsg = this.inputBoxSource.asObservable();

  constructor() { }

  ngOnInit() { }

  blockUi() {
    this.blockUiSource.next(true);
  }

  unblockUi() {
    this.blockUiSource.next(false);
    this.unblockUiSource.next(true);
  }

  confirm(opts?: {
    header: string,
    message: string,
    accept?: () => void,
    reject?: () => void,
  }) {
    this.confirmMsgSource.next(opts);
  }

  showInputBox(opts?: {
    header: string,
    message?: string,
    ok?: (value: string) => void,
    cancel?: () => void,
  }) {
    this.inputBoxSource.next(opts);
  }

  messageBox(opts?: { header?: string, message: string }) {
    this.boxMsgSource.next(opts);
  }

  infoBox(message: string) {
    this.messageBox({ header: 'Information', message: message });
  }

  successBox(message: string) {
    this.messageBox({ header: 'Success', message: message });
  }

  warnBox(message: string) {
    this.messageBox({ header: 'Warning', message: message });
  }

  errorBox(message: string) {
    this.messageBox({ header: 'Error', message: message });
  }

  infoBubble(message: string) {
    this.bubbleMsgSource.next({ severity:'info', summary: 'Info', detail: message });
  }

  successBubble(message: string) {
    this.bubbleMsgSource.next({ severity:'success', summary: 'Success', detail: message });
  }

  warnBubble(message: string) {
    this.bubbleMsgSource.next({ severity:'warn', summary: 'Warn', detail: message });
  }

  errorBubble(message: string) {
    this.bubbleMsgSource.next({ severity:'error', summary: 'Error', detail: message });
  }
}
