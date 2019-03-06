import { Injectable } from '@angular/core';
import { Observable, of, throwError, EMPTY } from 'rxjs';
import { HttpClient, HttpResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { switchMap, catchError, retry, map } from 'rxjs/operators';
import { LoginRegisterReset } from '../models/login-register-reset';
import {AddDevics} from '../models/add-device-request';
import {DeleteDevics} from '../models/delete-device-request';
import { ResponseLogin } from '../models/responselogin-register-reset';
import { baseUrl, UrlNames, VantivURLs } from '../url.provider';
import { ErrorHandlerService } from '../shared/services/error-handler.service';
import { AuthService } from '../auth.service';
import { URLSearchParams, RequestOptions } from '@angular/http';
@Injectable()
export class CustomerService {
  LoginResponse: ResponseLogin;
  private profileDetails: any;
  customerAddressList: any;
  customerPaymentMethodGetList: any;
  headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
  productlist: any;

  constructor(private http: HttpClient, private authService: AuthService, private errorHandler: ErrorHandlerService) {

  }

  loginCustomer(reqParams: LoginRegisterReset): Observable<any> {

    const body = new HttpParams()
    .set(`UserName`, reqParams.UserName)
    .set(`Password`, reqParams.Password)
    .set(`grant_type`, reqParams.grant_type);
  const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    // tslint:disable-next-line:max-line-length
    return this.http.post<any>('/gettoken/api/GetToken', body.toString(), { headers} ).pipe(
      switchMap((res: any) => {
        console.log(res);
        this.LoginResponse = res;
        return of(res);
      }),

      catchError((error: any, caught: Observable<any>) => {
        return this.errorHandler.processError(error);
      })
    );
  }

  getLoginCustomerParams(UserName?: string, pwd?: string, grant_type?: string) {
    return {

      UserName: UserName,
        Password: pwd,
        grant_type: grant_type
    } ;
  }
  getStoreDevices(): Observable<any> {
    const params = new HttpParams().set('StoreID', '8');
    return this.http.get<any>(baseUrl + UrlNames.GetDEvices, {headers: this.headers, params: params}).pipe(
      switchMap((res: any) => {
        this.profileDetails = res;
        return of(res);

      }),
      retry(3),
      catchError((error: any, caught: Observable<any>) => {
        return this.errorHandler.processError(error);
      })
    );
  }
  getStoreContent(ContentTypeID): Observable<any> {
    let params = new HttpParams().set('StoreID', '8');
    params = params.set('ContentTypeID', ContentTypeID);
    params = params.set('StoreContentID', '');
    return this.http.get<any>(baseUrl + UrlNames.getstorecontent, {params: params}).pipe(
      switchMap((res: any) => {
        return of(res);

      }),
      retry(3),
      catchError((error: any, caught: Observable<any>) => {
        return this.errorHandler.processError(error);
      })
    );
  }
  getbyPriority(priority, playlistid): Observable<any> {
    const bodyprioritycontent = {};
    let params = new HttpParams().set('priority', priority);
    params = params.set('StorePlayListID', playlistid);
    return this.http.post<any>(baseUrl + UrlNames.getbyPriority, bodyprioritycontent, {params: params}).pipe(
      switchMap((res: any) => {
        return of(res);

      }),
      retry(3),
      catchError((error: any, caught: Observable<any>) => {
        return of(error);
      })
    );
  }
//   deleteStoreContent(StoreContentID): Observable<any> {
//     const bodydeletecontent = {};
//     const params = new HttpParams().set('StoreContentID', StoreContentID);
//     return this.http.post<any>(baseUrl + UrlNames.deletestorecontent, bodydeletecontent, {params: params}).pipe(
//       switchMap((res: any) => {
//         return of(res);

//       }),
//       retry(3),
//       catchError((error: any, caught: Observable<any>) => {
//         return this.errorHandler.processError(error);
//       })
//     );
//   }
//   addStoreContent(ContentTypeID, data): Observable<any> {
//     console.log(data);
//     let params = new HttpParams().set('StoreID', '8');
//     params = params.set('ContentTypeID', ContentTypeID);
//     return this.http.post<any>(baseUrl + UrlNames.addstorecontent, data, {params: params}).pipe(
//       switchMap((res: any) => {
//         return of(res);

//       }),
//       retry(3),
//       catchError((error: any, caught: Observable<any>) => {
//         return this.errorHandler.processError(error);
//       })
//     );
//   }
//   deleteStoreProductsList(deleteid, index): Observable<any> {
//     const params = new HttpParams().set('ListID', deleteid);

//     return this.http.delete<any>(baseUrl + UrlNames.deleteStoreProductsList, {params: params}).pipe(
//       switchMap((res: any) => {
//         this.productlist.splice(index, 1);
//         return of(res);

//       }),
//       retry(3),
//       catchError((error: any, caught: Observable<any>) => {
//         return this.errorHandler.processError(error);
//       })
//     );
//   }
//   getStoreProductsList(): Observable<any> {
//     const params = new HttpParams().set('StoreID', '6');
//     if (this.profileDetails) {
//       return of(this.profileDetails);
//     }
//     return this.http.get<any>(baseUrl + UrlNames.GetProductsList, {headers: this.headers, params: params}).pipe(
//       switchMap((res: any) => {
//         this.productlist = res;
//         return of(res);

//       }),
//       retry(3),
//       catchError((error: any, caught: Observable<any>) => {
//         return this.errorHandler.processError(error);
//       })
//     );
//   }
//     addDevicesforStore(add: AddDevics): Observable<any> {
//       const bodyadddevices = {
//         STOREID: 8,
//         'LstDevices': [
// add
//         ]
//       };
//       console.log(bodyadddevices);
//       return this.http.post<any>(baseUrl + UrlNames.AddDevices,
//         bodyadddevices, { headers: this.headers }).pipe(
//           switchMap((res: any) => {
//             return of(res);
//           }),
//           retry(3),
//           catchError((error: any, caught: Observable<any>) => {
//             return this.errorHandler.processError(error);
//           })
//         );
//     }
//     updateDevicesforStore(bodyparams, editindex, editydeviceuid): Observable<any> {
//       const bodyadddevices = {
//           STOREID: 8,
//           'LstDevices': [
//             bodyparams
//           ]
//         };
//       console.log(bodyadddevices);
//       return this.http.post<any>(baseUrl + UrlNames.UpdateDevices,
//         bodyadddevices, { headers: this.headers }).pipe(
//           switchMap((res: any) => {
//             const obj = bodyparams;

//             if (bodyparams.DEVICETYPEID === 1) {
//               Object.assign(obj, {DEVICETYPE: 'TV', ACCESSKEY: editydeviceuid});
//             } else if (bodyparams.DEVICETYPEID === 2) {
//               Object.assign(obj, {DEVICETYPE: 'TAB', ACCESSKEY: editydeviceuid});
//              }
//             this.profileDetails[editindex] = obj;
//             console.log(this.profileDetails);
//             return of(res);
//           }),
//           retry(3),
//           catchError((error: any, caught: Observable<any>) => {
//             return this.errorHandler.processError(error);
//           })
//         );
//     }
//     deleteDevicesforStore(reqParams, index): Observable<any> {
//       const body = {};
//           const params = new HttpParams().set('StoreDeviceID', reqParams);
//           // tslint:disable-next-line:max-line-length
//           return this.http.post<any>(baseUrl + UrlNames.DelecteDevices, body,  {params: params} ).pipe(
//             switchMap((res: any) => {
//                 console.log(res);
//                 this.profileDetails.splice(index, 1);
//               return of(res);
//             }),
//             catchError((error: any, caught: Observable<any>) => {
//               return this.errorHandler.processError(error);
//             })
//           );
//         }


//         addStorePlaylist(playlistbody ): Observable<any> {
//           console.log(playlistbody);
//           return this.http.post<any>(baseUrl + UrlNames.addStorePlaylist,
//             playlistbody, { headers: this.headers }).pipe(
//               switchMap((res: any) => {
//                 return of(res);
//               }),
//               retry(3),
//               catchError((error: any, caught: Observable<any>) => {
//                 return this.errorHandler.processError(error);
//               })
//             );
//         }
//         updateaddStorePlaylist(playlistbody ): Observable<any> {
//           console.log(playlistbody);
//           return this.http.post<any>(baseUrl + UrlNames.UpdateStorePlaylist,
//             playlistbody, { headers: this.headers }).pipe(
//               switchMap((res: any) => {
//                 return of(res);
//               }),
//               retry(3),
//               catchError((error: any, caught: Observable<any>) => {
//                 return this.errorHandler.processError(error);
//               })
//             );
//         }
//         deleteStorePlaylist(PlayListiD ): Observable<any> {
//           const deleteplaylistbody = {};
//           const params = new HttpParams().set('PlayListID', PlayListiD);
//           return this.http.post<any>(baseUrl + UrlNames.deleteStorePlaylist, deleteplaylistbody, {params: params}).pipe(
//               switchMap((res: any) => {
//                 return of(res);
//               }),
//               retry(3),
//               catchError((error: any, caught: Observable<any>) => {
//                 return this.errorHandler.processError(error);
//               })
//             );
//         }

//         getStorePlaylist(): Observable<any> {
//           const getstoreplaylistbody = {};
//           const params = new HttpParams().set('StoreID', '8');
//           return this.http.post<any>(baseUrl + UrlNames.getStorePlaylist, getstoreplaylistbody, {params: params}).pipe(
//               switchMap((res: any) => {
//                 return of(res);
//               }),
//               retry(3),
//               catchError((error: any, caught: Observable<any>) => {
//                 return this.errorHandler.processError(error);
//               })
//             );
//         }
  }
