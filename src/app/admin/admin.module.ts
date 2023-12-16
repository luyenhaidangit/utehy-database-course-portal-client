import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

import { AdminRoutingModule } from './admin-routing.module';
import { LayoutComponent } from './shared/components/layout/layout.component';
import { AdminComponent } from './admin.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { VerticalMenuComponent } from './shared/components/vertical-menu/vertical-menu.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { RightSideBarComponent } from './shared/components/right-side-bar/right-side-bar.component';

@NgModule({
  declarations: [LayoutComponent, AdminComponent, HeaderComponent, VerticalMenuComponent, FooterComponent, RightSideBarComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    CKEditorModule
  ],
})
export class AdminModule { }
