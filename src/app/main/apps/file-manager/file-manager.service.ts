import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FileManagerService {
  onFilesChanged: BehaviorSubject<any>;
  onFileSelected: BehaviorSubject<any>;

  /**
   * Constructor
   *
   * @param {HttpClient} _httpClient
   */
  constructor(private _httpClient: HttpClient)
  { }


/**
     * Resolver
     *
     * @param {ActivatedRouteSnapshot} route
     * @param {RouterStateSnapshot} state
     * @returns {Observable<any> | Promise<any> | any}
     */
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any
  {
      return new Promise((resolve, reject) => {

          Promise.all([
              this.getFiles()
          ]).then(
              ([files]) => {
                  resolve();
              },
              reject
          );
      });
  }

  /**
   * Get files
   *
   * @returns {Promise<any>}
   */
  getFiles(): Promise<any>
  {
      return new Promise((resolve, reject) => {
          this._httpClient.get('api/file-manager')
              .subscribe((response: any) => {
                  this.onFilesChanged.next(response);
                  this.onFileSelected.next(response[0]);
                  resolve(response);
              }, reject);
      });
  }

}

