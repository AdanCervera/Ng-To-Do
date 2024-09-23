import { Injectable } from '@angular/core';
import { HttpService } from './http-service.service';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskServiceService {
  constructor(private httpService: HttpService) { }

  private TasksSubject = new Subject<void>();

  updateTable$ = this.TasksSubject.asObservable();

  updateTable() {
    this.TasksSubject.next();
  }  

  getTasks(): Observable<any> {
    return this.httpService.get('TodoTasks');
  }

  saveTask(task: any) {
    return this.httpService.post("TodoTasks", task);
  }

  updateTask(task: any) {
    return this.httpService.put("TodoTasks", task);
  }

  doneTask(id: number) {
    return this.httpService.put("TodoTasks/done/"+id);
  }

  undoneTask(id: number) {
    return this.httpService.put("TodoTasks/undone/"+id);
  }

  deleteTask(id: number) {
    return this.httpService.delete("TodoTasks/"+id);
  }
}
