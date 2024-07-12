import { Injectable } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
//
export class FormDataService {
  private formGroups: { [key: string]: FormGroup } = {};
  private data: any = {};

  checkExist(formArray: FormArray, formGroup: FormGroup, key: string) {
    var i = 0;
    var exist = 0;
      formArray.controls.forEach((element: any) => {
        //console.log("group vlaue:", formGroup.value[key]);
        //console.log('array value:', element.value[key]);
        if (formGroup.value[key] == element.value[key]) {
          exist++;
        }
        i++;
      });
      //找到兩次表示新增的form原本就已包含在array裡
      //console.log(exist);
    return (exist >= 2 ? true: false);
  }

  setData(key: string, value: any): void {
    this.data[key] = value;
  }

  getData(key: string): any {
    return this.data[key];
  }

  clearData(): void {
    this.data = {};
  }

  setFormGroup(key: string, form: FormGroup): void {
    this.formGroups[key] = form;
  }

  getFormGroup(key: string): FormGroup | null {
    return this.formGroups[key] || null;
  }

  clearFormGroups(): void {
    this.formGroups = {};
  }
}
