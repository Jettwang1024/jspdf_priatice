import { animate, state, style, transition, trigger } from '@angular/animations';
import { ElementRef, EventEmitter, OnInit, Output } from '@angular/core';
import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-menu',
  templateUrl: './app.menu.component.html',
  styleUrl: './app.menu.component.scss',
  animations: [
    trigger('children', [
      state('collapsed', style({
        height: '0',
        overflow: 'hidden'
      })),
      state('expanded', style({
        height: '*'
      })),
      transition('collapsed <=> expanded',
        animate('400ms cubic-bezier(0.86, 0, 0.07, 1)'))
    ])
  ]
})
export class AppMenuComponent implements OnInit {
  @Output() menuaddTab: EventEmitter<any> = new EventEmitter<any>();
  model: MenuItem[] = [];

  constructor(
    public el: ElementRef) { }

  ngOnInit() {
    if (localStorage.getItem("FunRightsInfo")) {
      const funs = JSON.parse(localStorage.getItem("FunRightsInfo") || "");
      //console.log("funs=" + funs + ";len=" + funs.length);
      this.getFunctinLists(funs);
    }
  }

  getFunctinLists(lists: any[], parent_id: string = "0"): any {
    var items: any[] = [];
    if (lists.length > 0) {
      var filterItems = this.filterItemsByParentId(lists, parent_id);
      if (filterItems) {
        if (parent_id == "0") {
          filterItems.forEach(async (element: any) => {
            var progNo = element.prog_no;
            var f_items = (await this.getFunctinLists(lists, progNo));
            if (f_items.length > 0)
              element.items = f_items;
            if (!this.checkExists(this.model, element)) {
              this.model.push(element);
            }
          });
        } else {
          filterItems.forEach(async (element: any) => {
            var progNo = element.prog_no;
            var f_items = (await this.getFunctinLists(lists, progNo));
            if (f_items.length > 0)
              element.items = f_items;
          });

          return filterItems;
        }

        lists.forEach((element, index) => {
          if (element.parent_id == parent_id) delete lists[index];
        });
      } else {
        var item = lists[0];
        var label = item.prog_name;
        var parentid = item.parent_id;
        var group_no = item.group_no;
        var path = item.path;
        var progNo = item.prog_no;
        //if (!this.checkExists(this.model, item)) {
        items.push({ label: label, routerLink: [path] });
        //}
        return items;
      }
    }
  }

  filterItemsByParentId(lists: any[], parent_id: string): any {
    var tmp = lists.filter(item => item.parent_id == parent_id && item.enable_fg == 1 && item.show_fg == 1);
    var items: any[] = [];
    tmp.forEach((element: any) => {
      var item = element;
      var label = item.prog_name;
      var parentid = item.parent_id;
      var group_no = item.group_no;
      var progNo = item.prog_no;
      var path = item.path;

      if (!this.checkExists(items, item)) {
        if (path) {
          items.push({
            label: label,
            icon: 'pi pi-fw pi-bookmark',
            routerLink: [path],
            prog_no: progNo,
          });
        } else {
          items.push({ label: label, icon: 'pi pi-fw pi-home', prog_no: progNo });
        }
      }
    });
    //console.log(items);
    return items;
  }

  checkExists(arr: any[], element: any): boolean {
    //檢查array是否存在
    if (!Array.isArray(arr)) {
      return false;
    }

    //檢查索引對應元素是否存在
    if (arr.find(e => e.prog_no == element.prog_no)) {
      return true;
    }

    return false;
  }

  toggleActive(item: MenuItem) {
    console.log('toggleActive' + item);
    item.expanded = !item.expanded;
  }

  onAddTab(item: any) {
    console.log('onAddTab' + item.label);
    this.menuaddTab.emit(item);
  }
}
