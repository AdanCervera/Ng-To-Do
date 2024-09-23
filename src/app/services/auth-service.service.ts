import { Injectable } from '@angular/core';
import { HttpService } from './http-service.service';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private httpService: HttpService) { }

  private TasksSubject = new Subject<void>();

  updateTable$ = this.TasksSubject.asObservable();

  updateTable() {
    this.TasksSubject.next();
  }  

  login(login: any): Observable<any> {
    return this.httpService.post('Auth/login', login);
  }
}
