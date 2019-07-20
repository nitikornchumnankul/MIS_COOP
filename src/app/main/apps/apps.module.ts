import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FuseSharedModule } from '@fuse/shared.module';
import { RouterModule } from '@angular/router';
const routes =[
  {
    path          : 'file-manager',
    loadChildren  : './file-manager/file-manager.module#FileManagerModule'
  }
]
@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
    FuseSharedModule,
  
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
],
})
export class AppsModule { }
