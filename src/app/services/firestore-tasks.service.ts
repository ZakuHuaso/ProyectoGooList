import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

export interface Task {
  id?: string;
  task_name: string;
  task_desc: string;
  task_tag?: string;
  task_date?: string;
  task_alarm?: string;
  task_state: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private firestore: AngularFirestore) {}

  // === CREATE ===
  async addTask(userId: string, task: Task): Promise<void> {
    try {
      const tasksCollection = this.firestore.collection(`usuario/${userId}/tareas`);
      await tasksCollection.add(task);
    } catch (error) {
      console.error('Error al agregar tarea:', error);
    }
  }

  // === READ ===
  getTasks(userId: string): Observable<Task[]> {
    const tasksCollection: AngularFirestoreCollection<Task> = this.firestore.collection(`usuario/${userId}/tareas`);
    return tasksCollection.valueChanges({ idField: 'id' });
  }

  async getTaskById(userId: string, taskId: string): Promise<Task | undefined> {
    try {
      const taskDoc = await this.firestore.doc<Task>(`usuario/${userId}/tareas/${taskId}`).ref.get();
      return taskDoc.exists ? (taskDoc.data() as Task) : undefined;
    } catch (error) {
      console.error('Error al obtener tarea por ID:', error);
      return undefined;
    }
  }

  // === UPDATE ===
  async updateTask(userId: string, taskId: string, taskData: Partial<Task>): Promise<void> {
    try {
      await this.firestore.doc(`usuario/${userId}/tareas/${taskId}`).update(taskData);
    } catch (error) {
      console.error('Error al actualizar tarea:', error);
    }
  }

  // === DELETE ===
  async deleteTask(userId: string, taskId: string): Promise<void> {
    try {
      await this.firestore.doc(`usuario/${userId}/tareas/${taskId}`).delete();
    } catch (error) {
      console.error('Error al eliminar tarea:', error);
    }
  }
}
