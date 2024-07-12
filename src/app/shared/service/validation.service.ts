
import { ActivatedRoute } from '@angular/router';
import { Injectable } from '@angular/core';
// taiwan-id-validator
// https://github.com/enylin/taiwan-id-validator
@Injectable({
  providedIn: 'root',
})
//
export class ValidationService {
  getValidatorErrorMessage(validatorName: string, validatorValue?: any) {
    const config :any = {
      required: '必填',
      email: '「電子郵件」，格式錯誤，請重新輸入。',
      invalidCreditCard: 'Is invalid credit card number',
      invalidEmailAddress: '「電子郵件」，格式錯誤，請重新輸入。',
      invalidPassword:
        'Invalid password. Password must be at least 6 characters long, and contain a number.',
      minlength: `Minimum length ${validatorValue.requiredLength}`,
      invalidIdn:'身分證號為必填',
      invalidDate:'請補上錯誤訊息',
      invalidDate2:'日期格式錯誤',
      invalidHealthInsurance:'請補上錯誤訊息',
      invalidTaxID:'請補上錯誤訊息',
      invalidHddocnum:'請補上錯誤訊息',
      invalidElectronicnum:'請補上錯誤訊息',
    };
    return config[validatorName];
  }
  // 身分證號
  identityValidator(control: { value: string | null; }) {

    // 這段被刪除了!! {
            // "英數字10碼，英數轉半形大寫，第一字為英文，第二字為數字"1"或"2"，其餘為數字
            // ＝＝＝
            // 第一碼必須為英文，第二碼若為數字１或２請以國民身分證驗證方式進行，若第二碼為英文Ａ、Ｂ、Ｃ、Ｄ請以統一居留證號驗證方式進行，第二碼非上述數字或代碼者，為異常資料。
            // ====
            // 0414 農保加保增加檢核說明 :　邏輯檢核，若有錯誤顯示＂身分證號邏輯檢核錯誤，確定要繼續申報嗎?”，若回應確定，則繼續進行作業。
    // }

    // ====NA=====
    // 長度最限不得超過10個長度，且為必填，否則顯示錯誤訊息="{對應欄位名稱}為必填"。"
    if (control.value !== null) {
      if (  !control.value.match(/^[A-Za-z][12]\d{8}$/) ) {
        return { invalidIdn: true };
      }
    }
    return null;
  }
  // 電子信箱
  emailValidator(control: { value: string | null; }) {
    // [驗證]
    // 非必填，若有輸入值，檢核輸入資料需為英數字含特殊符號並檢查是否有@符號
    // 長度限制40個字元，非必填，若有輸入值，檢核輸入資料需為英數字含特殊符號並檢查是否有@符號
    // [回傳]
    // 若檢核有誤，顯示提示訊息:「電子郵件」，格式錯誤，請重新輸入。
    // RFC 2822 compliant regex
    if (control.value !== null) {
      if (
        // let emailRegex = "^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$";
        !control.value.match(
          /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
        )
      ) {
        return { invalidEmailAddress: true };
      }
    }

    return null;
  }
}
