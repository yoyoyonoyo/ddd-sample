import { z } from "zod";

export const TaskStatusList = [
  "未着手",
  "取組中",
  "レビュー待ち",
  "完了",
] as const satisfies string[];

// タスクの状態
export class TaskStatus {
  #id: number;
  #status: (typeof TaskStatusList)[number];

  private readonly StatusSchema = z.enum(TaskStatusList);

  constructor(props: { id: number; taskStatus: string } | undefined) {
    if (props) {
      this.#id = props.id;
      this.#status = this.StatusSchema.parse(props.taskStatus);
    } else {
      // 初期値は未着手
      this.#id = TaskStatusList.indexOf("未着手");
      this.#status = "未着手";
    }
  }

  public getTaskStatus() {
    return {
      id: this.#id,
      status: this.#status,
    };
  }

  public updateStatus(taskStatus: (typeof TaskStatusList)[number]): void {
    // - 「完了」は変更できない
    if (this.#status === "完了") return;

    if (
      // - 「未着手」は、「取組中」にのみ変更できる
      (this.#status === "未着手" && taskStatus === "取組中") ||
      // - 「取組中」は「レビュー待ち」にのみ変更できる
      (this.#status === "取組中" && taskStatus === "レビュー待ち") ||
      // - 「レビュー待ち」は、「取組中」もしくは「完了」に変更できる
      (this.#status === "レビュー待ち" &&
        (taskStatus === "取組中" || taskStatus === "完了"))
    ) {
      this.#id = TaskStatusList.indexOf(taskStatus);
      this.#status = taskStatus;
      return;
    }

    console.log(`タスクが変更できません。`);
    console.log(`現在のステータス:${this.#status}`);
    console.log(`変更のステータス:${taskStatus}`);
  }
}
