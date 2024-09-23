import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContextMenuService } from '../../services/context-menu-service';
import { TaskServiceService } from '../services/task-service.service';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-todo-task',
  templateUrl: './todo-task.component.html',
  styleUrl: './todo-task.component.css'
})
export class TodoTaskComponent implements OnInit {
  taskForm: FormGroup = new FormGroup({});
  task: any = {};
  items: any[] = [];
  tasks: any[] =  [];
  constructor(private fb: FormBuilder, private contextMenuService: ContextMenuService, private taskService: TaskServiceService, private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {
    this.taskForm = this.fb.group({
      task: ['', [Validators.required, Validators.minLength(3)]]
    });

    this.initContextMenuItems();
  }

  ngOnInit(): void {
    this.getTasks();
  }

  getTasks(): void {
    this.taskService.getTasks().subscribe((res: any) => {
      this.tasks = res;
    }
    );
  }

  private initContextMenuItems(): void {
    this.items = [
        {
            label: 'Editar',
            icon: 'pi pi-pencil',
            command: () => this.onEdit(this.task)
        },
        {
          label: 'Completar',
          icon: 'pi pi-check', 
          command: () => this.onCompleted(this.task)
        },
        {
          label: 'Deshacer',
          icon: 'pi pi-undo',
          command: () => this.onUndo(this.task)
        },
        {
            label: 'Eliminar',
            icon: 'pi pi-trash',
            command: () => this.confirm()
        }
    ];
  }

  onSaving(): void {
    if (this.taskForm.valid) {
      if(this.task.id !== undefined) {
        const { task } = this.taskForm.value;
        this.task.title = task;
        this.taskService.updateTask(this.task).subscribe(() => {
          this.getTasks();
          this.taskForm.reset();
        }
        );
       
       
      }
      else {
      const { task } = this.taskForm.value;
      this.taskService.saveTask({ title: task, isDone: false }).subscribe(() => {
        this.getTasks();
        this.taskForm.reset();
      });
      }
    }
  }

  openMenu(event: MouseEvent, menu: any, task: any): void {
    this.contextMenuService.setActiveMenu(menu);
    menu.show(event);
    this.task = task;
  }

  onEdit(task: any): void {
    this.task = task;
    this.taskForm.patchValue({ task: task.title });

    this.taskService.doneTask(task.id).subscribe(() => {
      this.taskService.updateTable();
    }
    );
  }

  onCompleted(task: any): void {
    this.task.status = true;
    this.taskService.doneTask(this.task.id).subscribe(() => {
      this.getTasks();
    }
    );
  }

  onDelete(task: any): void {
    this.taskService.deleteTask(this.task.id).subscribe(() => {
      this.getTasks();
    }
    );
  }

  onUndo(task: any): void {
    this.task.status = false;
    this.taskService.undoneTask(this.task.id).subscribe(() => {
      this.getTasks();
    }
    );
  }

  confirm() {
    this.confirmationService.confirm({
        //target: event.target as EventTarget,
        message: '¿Estás seguro de que quieres eliminar esta tarea?',
        header: 'Confirmar',
        icon: 'pi pi-exclamation-triangle',
        acceptIcon:"none",
        rejectIcon:"none",
        rejectButtonStyleClass:"p-button-text",
        accept: () => {
            this.onDelete(this.task);
            this.messageService.add({ severity: 'info', summary: 'Eliminado', detail: 'Registro eliminado correctamente' });
        },
        reject: () => {
            this.messageService.add({ severity: 'error', summary: 'Cancelado', detail: 'Usted cancelo la accion', life: 3000 });
        }
    });
}





}
