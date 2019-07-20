import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileListComponent } from './file-list/file-list.component';
import { DetailsComponent } from './sidebars/details/details.component';
import { MainComponent } from './sidebars/main/main.component';
import { Routes, RouterModule } from '@angular/router';
import { FileManagerComponent } from './file-manager.component';
import { FileManagerService } from './file-manager.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatRippleModule } from '@angular/material/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseSidebarModule } from '@fuse/components';

const routes: Routes =[
      {
          path : '**',
          component : FileManagerComponent,
          children  :[],
          resolve   :{
                files: FileManagerService
          }
      }
];
@NgModule({
  declarations: [
    FileListComponent,
     DetailsComponent,
    MainComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatRippleModule,
    MatSlideToggleModule,
    MatTableModule,

    FuseSharedModule,
    FuseSidebarModule
  ],
  providers : [
    FileManagerService
  ]
})
export class FileManagerModule { }
