import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Result } from '../model/Result';

@Injectable({
  providedIn: 'root'
})
export class ExecuteService {

  constructor(
    private httpClient: HttpClient
  ) { }

  executeidecodeinput(sourcecode, input, filetype): Observable<Result>{
    const url = "http://cpp-online-compiler-api/executeidecode/";
    let body = {
      sourcecode: sourcecode,
      input: input,
      filetype: filetype
    };

    let httpOptions = {
      headers: new HttpHeaders({
       'Content-Type': 'application/json'
      })
    };

    return this.httpClient.post<Result>(url, body, httpOptions);
  }

}
