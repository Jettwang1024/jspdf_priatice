import { Component, Input, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { FunsrightInfo } from '../../../models/system/funsrightInfo';

@Component({
  selector: 'app-menubar',
  templateUrl: './menubar.component.html',
  styleUrl: './menubar.component.scss'
})
export class MenubarComponent implements OnInit {
  @Input() ProgNo: string = '';
  home: any;
  breadcrumbItems: MenuItem[] = [];
  menu: string[] = [];

  constructor() { }

  ngOnInit(): void {
    this.home = { icon: 'pi pi-home', routerLink: '/dashboard' };
    this.breadcrumbItems = [];
    if (localStorage.getItem("FunRightsInfo")) {
      let funs: FunsrightInfo[] = JSON.parse(localStorage.getItem("FunRightsInfo") || "");
      console.log(this.ProgNo);
      this.getMenuName(funs, this.ProgNo);
      for (var i = this.menu.length - 1; i >= 0; i--) {
        if (this.menu[i])
          this.breadcrumbItems.push({ label: this.menu[i] });
      }
    }
  }

  getMenuName(funs: any[], progNo: string) {
    var prog = funs.filter(x => x.prog_no == progNo && x.enable_fg == "1" && x.show_fg == "1");
    if (prog[0].parent_id != "0") {
      this.menu.push(prog[0].prog_name);
      this.getMenuName(funs, prog[0].parent_id)
    } else {
      this.menu.push(prog[0].prog_name);
    }
  }
}
