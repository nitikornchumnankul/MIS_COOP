import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileListComponent } from './file-list/file-list.component';
import { DetailsComponent } from './sidebars/details/details.component';
import { MainComponent } from './sidebars/main/main.component';

@NgModule({
  declarations: [FileListComponent, DetailsComponent, MainComponent],
  imports: [
    CommonModule
  ]
})
export class FileManagerModule { }
