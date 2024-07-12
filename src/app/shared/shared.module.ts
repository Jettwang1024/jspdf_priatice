import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// FontAwesome
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
// primeng
import { BlockUIModule } from 'primeng/blockui';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { PanelModule } from 'primeng/panel';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ChipModule } from 'primeng/chip';
import { TreeSelectModule } from 'primeng/treeselect';
import { SelectButtonModule } from 'primeng/selectbutton';
import { MenuModule } from 'primeng/menu';
import { ColorPickerModule } from 'primeng/colorpicker';
import { TabViewModule } from 'primeng/tabview';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { DropdownModule } from 'primeng/dropdown';
import { SplitterModule } from 'primeng/splitter';
import { DividerModule } from 'primeng/divider';
import { DataViewModule } from 'primeng/dataview';
import { MultiSelectModule } from 'primeng/multiselect';
import { InputGroupModule } from 'primeng/inputgroup';
import { RippleModule } from 'primeng/ripple';
import { SplitButtonModule } from 'primeng/splitbutton';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { AutoCompleteModule } from "primeng/autocomplete";
import { ChipsModule } from "primeng/chips";
import { InputMaskModule } from "primeng/inputmask";
import { InputNumberModule } from "primeng/inputnumber";
import { CascadeSelectModule } from "primeng/cascadeselect";
import { InputTextareaModule } from "primeng/inputtextarea";
import { InputTextModule } from "primeng/inputtext";
import { PasswordModule } from "primeng/password";
import { MessagesModule } from 'primeng/messages';
import { AccordionModule } from 'primeng/accordion';
import { TreeTableModule } from "primeng/treetable";
import { CalendarModule } from "primeng/calendar";
import { CheckboxModule } from 'primeng/checkbox';
import { ListboxModule } from 'primeng/listbox';
import { PickListModule } from 'primeng/picklist';
import { FieldsetModule  } from 'primeng/fieldset';
import { MenubarModule } from 'primeng/menubar';
import { TabMenuModule } from 'primeng/tabmenu';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ContextMenuModule} from 'primeng/contextmenu';
import { ProgressBarModule} from 'primeng/progressbar';
import { RadioButtonModule } from 'primeng/radiobutton';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { SidebarModule } from 'primeng/sidebar';
import { InputSwitchModule } from 'primeng/inputswitch';
import { TreeModule } from 'primeng/tree';
import { StyleClassModule } from 'primeng/styleclass';
import { ChartModule } from 'primeng/chart';
import { PanelMenuModule } from 'primeng/panelmenu';
import { TagModule } from 'primeng/tag';
import { ToolbarModule } from 'primeng/toolbar';
import { StepperModule } from 'primeng/stepper';
import { PaginatorModule } from 'primeng/paginator';
import { ImageModule } from 'primeng/image';
import { StepsModule } from 'primeng/steps';
// Component
import { MenubarComponent } from './component/menubar/menubar.component';
import { ControlMessagesComponent } from './component/control-messages/control-messages.component';
// Pipe
import { HasPermissionDirective } from './directive/has-permission.directive';
// Webdatarocks
import { WebdatarocksPivotModule } from '@webdatarocks/ngx-webdatarocks';

@NgModule({
  declarations: [
    //
    MenubarComponent,
    //
    ControlMessagesComponent,
    // Directive
    HasPermissionDirective,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    // FontAwesome
    FontAwesomeModule,
    // primeng
    BlockUIModule,
    ProgressSpinnerModule,
    PanelModule,
    DialogModule,
    TableModule,
    ButtonModule,
    CardModule,
    ChipModule,
    TreeSelectModule,
    SelectButtonModule,
    MenuModule,
    ColorPickerModule,
    TabViewModule,
    BadgeModule,
    AvatarModule,
    DropdownModule,
    SplitterModule,
    DividerModule,
    DataViewModule,
    MultiSelectModule,
    InputGroupModule,
    RippleModule,
    SplitButtonModule,
    ToggleButtonModule,
    BreadcrumbModule,
    AutoCompleteModule,
    ChipsModule,
    InputMaskModule,
    InputNumberModule,
    CascadeSelectModule,
    InputTextareaModule,
    InputTextModule,
    PasswordModule,
    MessagesModule,
    AccordionModule,
    TreeTableModule,
    CalendarModule,
    CheckboxModule,
    ListboxModule,
    PickListModule,
    FieldsetModule,
    MenubarModule,
    TabMenuModule,
    MessageModule,
    ToastModule,
    ConfirmDialogModule,
    ContextMenuModule,
    ProgressBarModule,
    RadioButtonModule,
    OverlayPanelModule,
    SidebarModule,
    InputSwitchModule,
    TreeModule,
    StyleClassModule,
    ChartModule,
    PanelMenuModule,
    TagModule,
    ToolbarModule,
    StepperModule,
    PaginatorModule,
    ImageModule,
    StepsModule,
    //
    WebdatarocksPivotModule,
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    // FontAwesome
    FontAwesomeModule,
    // primeng
    BlockUIModule,
    ProgressSpinnerModule,
    PanelModule,
    DialogModule,
    TableModule,
    ButtonModule,
    CardModule,
    ChipModule,
    TreeSelectModule,
    SelectButtonModule,
    MenuModule,
    ColorPickerModule,
    TabViewModule,
    BadgeModule,
    AvatarModule,
    DropdownModule,
    SplitterModule,
    DividerModule,
    DataViewModule,
    MultiSelectModule,
    InputGroupModule,
    RippleModule,
    SplitButtonModule,
    ToggleButtonModule,
    BreadcrumbModule,
    AutoCompleteModule,
    ChipsModule,
    InputMaskModule,
    InputNumberModule,
    CascadeSelectModule,
    InputTextareaModule,
    InputTextModule,
    PasswordModule,
    MessagesModule,
    AccordionModule,
    TreeTableModule,
    CalendarModule,
    CheckboxModule,
    ListboxModule,
    PickListModule,
    FieldsetModule,
    MenubarModule,
    TabMenuModule,
    MessageModule,
    ToastModule,
    ConfirmDialogModule,
    ContextMenuModule,
    ProgressBarModule,
    RadioButtonModule,
    OverlayPanelModule,

    SidebarModule,
    InputSwitchModule,
    TreeModule,
    StyleClassModule,
    ChartModule,
    PanelMenuModule,
    TagModule,
    ToolbarModule,
    StepperModule,
    PaginatorModule,
    ImageModule,

    StepsModule,
    // other
    MenubarComponent,
    ControlMessagesComponent,
    //
    HasPermissionDirective,
    //
    WebdatarocksPivotModule,
  ],

})
export class SharedModule { }
