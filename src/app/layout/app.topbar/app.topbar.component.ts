import { Router } from '@angular/router';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from '../../shared/service/layout.service';
import { AuthService } from '../../service/system/auth.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserInfo } from '../../models/system/userInfo';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html',
    styleUrl: './app.topbar.component.scss'
})
export class AppTopbarComponent implements OnInit {
  items!: MenuItem[];
  user!: string;

  @ViewChild('menubutton') menuButton!: ElementRef;

  @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

  @ViewChild('topbarmenu') menu!: ElementRef;

  queryForm = this.formBuilder.nonNullable.group({
    query_data: ['']
  });

  constructor(
    public layoutService: LayoutService,
    public authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
  ) { }

  ngOnInit() {
    this.items = [
        {
          label: 'profile',
          icon: 'pi pi-refresh',
          command: () => {
            this.profile();
        }},
        {label: 'Logout', icon: 'pi pi-times', command: () => {
            this.logout();
        }},
        //{label: 'Angular.io', icon: 'pi pi-info', url: 'http://angular.io'},
        {separator: true},
        //{label: 'Setup', icon: 'pi pi-cog', routerLink: ['/setup']}
    ];

    let data =JSON.parse(localStorage.getItem('UserInfo') || '') as UserInfo
    this.user = data.user_id || '';
  };

  profile() {

  }

  logout() {
    this.authService.logout();
  }

  get f() { return this.queryForm.controls; }

  submitQuery(frm: FormGroup) {
    this.onSubmit(frm)
  }

  onSubmit(frm: FormGroup) {
  //console.log(frm.controls["query_data"].value);
  if (localStorage.getItem("FunRightsInfo") && (frm.controls["query_data"] && frm.controls["query_data"].value != ""))
  {
      const funs = JSON.parse(localStorage.getItem("FunRightsInfo") || "");
      console.log('funs:', funs);
      //先check 名稱(prog_name)
      let findFuns = funs.filter((x: any) => x.prog_name.includes(frm.controls["query_data"].value))
      console.log(findFuns);
      //console.log(findFuns);
      if (findFuns.length >= 1) {
        for (var i = 0; i < findFuns.length; i++) {
          if (findFuns[i].path != '') {
            this.router.navigate([findFuns[i].path]);
            this.queryForm.reset();
            break;
          }
        }
      } else {
        //再check 編號(prog_id)
        let findFuns = funs.filter((x: any) => x.prog_id == frm.controls["query_data"].value)
        if (findFuns.length >= 1) {
          for (var i = 0; i < findFuns.length; i++) {
            if (findFuns[i].path != '') {
              this.router.navigate([findFuns[i].path]);
              this.queryForm.reset();
              break;
            }
          }
        }
      }
    }
  }
}
