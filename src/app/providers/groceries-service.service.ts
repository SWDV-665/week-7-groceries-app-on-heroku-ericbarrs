import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import {map , catchError } from 'rxjs/operators'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GroceriesServiceService {
  items: any = []
  
  baseURL = 'http://localhost:5000';

  constructor(public http: HttpClient) { 

  }

  getItems():any{
    return this.http.get(this.baseURL + '/items').pipe(
      map(this.extraData),
      catchError(this.handleError)
    )
  }

  private extraData(res: Response){
    let body = res;
    return body || [];
  }

  private handleError(error: Response | any){
    let errMsg: string;
    if(error instanceof Response){
      const err = error || "";
      errMsg = `${error.status} - ${error.statusText} || '' ${err}}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg)
  }
}
