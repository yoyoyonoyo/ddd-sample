import type { Task } from "./task";

export type TaskRepositoryInterface = {
  update: (task: Task) => Promise<Task>;
  findById(taskId: string, studentId: string): Promise<Task | undefined>;
};
