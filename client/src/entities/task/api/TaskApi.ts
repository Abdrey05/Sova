import { axiosInstance } from '@/shared/lib/axiosInstance';
import type { ServerResponseType } from '@/shared/types';
import type { NewTaskType, TaskArrayType, TaskType } from '../model';

export default class TaskApi {
  static async getAllTasks(): Promise<ServerResponseType<TaskArrayType>> {
    const { data } = await axiosInstance.get('/tasks');
    return data;
  }
  static async getOneTask(id: number): Promise<ServerResponseType<TaskType>> {
    const { data } = await axiosInstance.get(`/tasks/${id}`);
    return data;
  }

  static async createTask(
    taskData: NewTaskType
  ): Promise<ServerResponseType<TaskType>> {
    const { data } = await axiosInstance.post('/tasks', taskData);

    return data;
  }

  static async updateTask(
    taskId: number,
    taskData: NewTaskType
  ): Promise<ServerResponseType<TaskType>> {
    const { data } = await axiosInstance.put(`/tasks/${taskId}`, taskData);
    return data;
  }

  static async deleteTask(id: number): Promise<ServerResponseType<null>> {
    const { data } = await axiosInstance.delete(`/tasks/${id}`);

    return data;
  }
}
