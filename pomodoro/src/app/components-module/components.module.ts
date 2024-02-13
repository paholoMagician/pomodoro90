import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {PortalModule} from '@angular/cdk/portal';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {CdkStepperModule} from '@angular/cdk/stepper';
import {CdkTableModule} from '@angular/cdk/table';
import {CdkTreeModule} from '@angular/cdk/tree';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatBadgeModule} from '@angular/material/badge';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatChipsModule} from '@angular/material/chips';
import {MatStepperModule} from '@angular/material/stepper';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDividerModule} from '@angular/material/divider';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {MatNativeDateModule, MatRippleModule} from '@angular/material/core';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSliderModule} from '@angular/material/slider';
import {CommonModule } from '@angular/common';
import { LoginComponent } from '../components/login/login.component';
import { PomodoroComponentsComponent } from '../components/pomodoro-components/pomodoro-components.component';
import { PomodoroComponent } from '../components/pomodoro-components/pomodoro/pomodoro.component';
import { ShortBreakComponent } from '../components/pomodoro-components/short-break/short-break.component';
import { LongBreakComponent } from '../components/pomodoro-components/long-break/long-break.component';
import { NavsideComponent } from '../components/shared/navside/navside.component';
import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { TasksComponent } from '../components/pomodoro-components/tasks/tasks.component';

/**Prime ng modules */
import { AccordionModule } from 'primeng/accordion';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { BadgeModule } from 'primeng/badge';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CarouselModule } from 'primeng/carousel';
import { CascadeSelectModule } from 'primeng/cascadeselect';
import { CheckboxModule } from 'primeng/checkbox';
import { ChipModule } from 'primeng/chip';
import { ChipsModule } from 'primeng/chips';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ColorPickerModule } from 'primeng/colorpicker';
import { ContextMenuModule } from 'primeng/contextmenu';
import { DataViewModule } from 'primeng/dataview';
import { VirtualScrollerModule } from 'primeng/virtualscroller';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';
import { DockModule } from 'primeng/dock';
import { DragDropModule } from 'primeng/dragdrop';
import { DropdownModule } from 'primeng/dropdown';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { FieldsetModule } from 'primeng/fieldset';
import { FileUploadModule } from 'primeng/fileupload';
import { GalleriaModule } from 'primeng/galleria';
import { InplaceModule } from 'primeng/inplace';
import { InputMaskModule } from 'primeng/inputmask';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ImageModule } from 'primeng/image';
import { KnobModule } from 'primeng/knob';
import { ListboxModule } from 'primeng/listbox';
import { MegaMenuModule } from 'primeng/megamenu';
import { MenuModule } from 'primeng/menu';
import { MenubarModule } from 'primeng/menubar';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { MultiSelectModule } from 'primeng/multiselect';
import { OrderListModule } from 'primeng/orderlist';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { PaginatorModule } from 'primeng/paginator';
import { PanelModule } from 'primeng/panel';
import { PanelMenuModule } from 'primeng/panelmenu';
import { PasswordModule } from 'primeng/password';
import { PickListModule } from 'primeng/picklist';
import { ProgressBarModule } from 'primeng/progressbar';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RatingModule } from 'primeng/rating';
import { ScrollerModule } from 'primeng/scroller';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { ScrollTopModule } from 'primeng/scrolltop';
import { SelectButtonModule } from 'primeng/selectbutton';
import { SidebarModule } from 'primeng/sidebar';
import { SkeletonModule } from 'primeng/skeleton';
import { SlideMenuModule } from 'primeng/slidemenu';
import { SliderModule } from 'primeng/slider';
import { SpeedDialModule } from 'primeng/speeddial';
import { SpinnerModule } from 'primeng/spinner';
import { SplitButtonModule } from 'primeng/splitbutton';
import { SplitterModule } from 'primeng/splitter';
import { StepsModule } from 'primeng/steps';
import { TabMenuModule } from 'primeng/tabmenu';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { TagModule } from 'primeng/tag';
import { TerminalModule } from 'primeng/terminal';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { TimelineModule } from 'primeng/timeline';
import { ToastModule } from 'primeng/toast';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { ToolbarModule } from 'primeng/toolbar';
import { TooltipModule } from 'primeng/tooltip';
import { TriStateCheckboxModule } from 'primeng/tristatecheckbox';
import { TreeModule } from 'primeng/tree';
import { TreeSelectModule } from 'primeng/treeselect';
import { TreeTableModule } from 'primeng/treetable';
import { AnimateModule } from 'primeng/animate';
import { CardModule } from 'primeng/card';
import { BlockUIModule } from 'primeng/blockui';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { RippleModule } from 'primeng/ripple';
import { ModalConfiguracionesComponent } from '../components/shared/modals/modal-configuraciones/modal-configuraciones.component';


@NgModule({
  
  declarations: [
    LoginComponent,
    PomodoroComponentsComponent,
    PomodoroComponent,
    ShortBreakComponent,
    LongBreakComponent,
    NavsideComponent,
    DashboardComponent,
    TasksComponent,
    ModalConfiguracionesComponent
  ],

  imports: [
    AccordionModule,
AutoCompleteModule,
AvatarModule,
AvatarGroupModule,
BadgeModule,
BreadcrumbModule,
ButtonModule,
CalendarModule,
CarouselModule,
CascadeSelectModule,
CheckboxModule,
ChipModule,
ChipsModule,
ConfirmDialogModule,
ConfirmPopupModule,
ColorPickerModule,
ContextMenuModule,
DataViewModule,
VirtualScrollerModule,
DialogModule,
DividerModule,
DockModule,
DragDropModule,
DropdownModule,
DynamicDialogModule,
FieldsetModule,
FileUploadModule,
GalleriaModule,
InplaceModule,
InputMaskModule,
InputSwitchModule,
InputTextModule,
InputNumberModule,
InputTextareaModule,
ImageModule,
KnobModule,
ListboxModule,
MegaMenuModule,
MenuModule,
MenubarModule,
MessageModule,
MessagesModule,
MultiSelectModule,
OrderListModule,
OverlayPanelModule,
PaginatorModule,
PanelModule,
PanelMenuModule,
PasswordModule,
PickListModule,
ProgressBarModule,
RadioButtonModule,
RatingModule,
ScrollerModule,
ScrollPanelModule,
ScrollTopModule,
SelectButtonModule,
SidebarModule,
SkeletonModule,
SlideMenuModule,
SliderModule,
SpeedDialModule,
SpinnerModule,
SplitButtonModule,
SplitterModule,
StepsModule,
TabMenuModule,
TableModule,
TabViewModule,
TagModule,
TerminalModule,
TieredMenuModule,
TimelineModule,
ToastModule,
ToggleButtonModule,
ToolbarModule,
TooltipModule,
TriStateCheckboxModule,
TreeModule,
TreeSelectModule,
TreeTableModule,
AnimateModule,
CardModule,
BlockUIModule,
ProgressSpinnerModule,
RippleModule,

    /** Angular Material import modules */
    MatRippleModule,
    PortalModule,
    ScrollingModule,
    CdkStepperModule,
    CdkTableModule,
    MatAutocompleteModule,
    CdkTreeModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatSelectModule,
    MatTooltipModule,
    MatSliderModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  
  exports: [
    LoginComponent,
    PomodoroComponentsComponent,
    PomodoroComponent,
    LongBreakComponent,
    ShortBreakComponent
  ]

})

export class componentModule { }
