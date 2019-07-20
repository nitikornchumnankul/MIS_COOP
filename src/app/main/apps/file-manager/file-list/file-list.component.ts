import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { DataSource } from '@angular/cdk/table';
import { takeUntil } from 'rxjs/operators';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { FileManagerService } from '../file-manager.service';

@Component({
  selector: 'app-file-list',
  templateUrl: './file-list.component.html',
  styleUrls: ['./file-list.component.scss']
})
export class FileListComponent implements OnInit
{
  files: any;
  dataSource: FilesDataSource | null;
  displayedColumns = ['icon', 'name', 'type', 'owner', 'size', 'modified', 'detail-button'];
  selected: any;

  // Private
  private _unsubscribeAll: Subject<any>;

  /**
   * Constructor
   *
   * @param {FileManagerService} _fileManagerService
   * @param {FuseSidebarService} _fuseSidebarService
   */
  constructor(
      private _fileManagerService: FileManagerService,
      private _fuseSidebarService: FuseSidebarService
  )
  {
      // Set the private defaults
      this._unsubscribeAll = new Subject();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void
  {
      this.dataSource = new FilesDataSource(this._fileManagerService);

      this._fileManagerService.onFilesChanged
          .pipe(takeUntil(this._unsubscribeAll))
          .subscribe(files => {
              this.files = files;
          });

      this._fileManagerService.onFileSelected
          .pipe(takeUntil(this._unsubscribeAll))
          .subscribe(selected => {
              this.selected = selected;
          });
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void
  {
      // Unsubscribe from all subscriptions
      this._unsubscribeAll.next();
      this._unsubscribeAll.complete();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * On select
   *
   * @param selected
   */
  onSelect(selected): void
  {
      this._fileManagerService.onFileSelected.next(selected);
  }

  /**
   * Toggle the sidebar
   *
   * @param name
   */
  toggleSidebar(name): void
  {
      this._fuseSidebarService.getSidebar(name).toggleOpen();
  }
}

export class FilesDataSource extends DataSource<any>
{
  /**
   * Constructor
   *
   * @param {FileManagerService} _fileManagerService
   */
  constructor(
      private _fileManagerService: FileManagerService
  )
  {
      super();
  }

  /**
   * Connect function called by the table to retrieve one stream containing the data to render.
   *
   * @returns {Observable<any[]>}
   */
  connect(): Observable<any[]>
  {
      return this._fileManagerService.onFilesChanged;
  }

  /**
   * Disconnect
   */
  disconnect(): void
  {
  }
}
