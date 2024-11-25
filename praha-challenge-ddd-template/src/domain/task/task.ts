import { TaskContent } from "./task_content";
import { TaskStatus, TaskStatusList } from "./task_status";

export class Task {
  readonly #studentId: string;
  #taskContent: TaskContent;
  #taskStatus: TaskStatus;

  public constructor(props: {
    studentId: string;
    taskContent: TaskContent;
    taskStatus: TaskStatus;
  }) {
    this.#studentId = props.studentId;
    this.#taskContent = props.taskContent;
    this.#taskStatus = props.taskStatus;
  }

  public get studentId() {
    return this.#studentId;
  }

  public getTask() {
    return {
      studentId: this.#studentId,
      taskStatus: this.#taskStatus.getTaskStatus(),
      taskContent: this.#taskContent.getTask(),
    };
  }

  public updateTaskStatus(status: (typeof TaskStatusList)[number]) {
    this.#taskStatus.updateStatus(status);
  }
}
