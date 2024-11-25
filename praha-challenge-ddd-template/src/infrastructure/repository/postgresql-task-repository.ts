import { and, eq } from "drizzle-orm";
import { Task } from "../../domain/task/task";
import type { TaskRepositoryInterface } from "../../domain/task/task-repository";
import type { Database } from "../../libs/drizzle/get-database";
import { students, taskContents, tasks } from "../../libs/drizzle/schema";
import { taskStatus } from "../../libs/drizzle/schema";
import { TaskStatus } from "../../domain/task/task_status";
import { TaskContent } from "../../domain/task/task_content";

export class PostgresqlTaskRepository implements TaskRepositoryInterface {
  public constructor(private readonly database: Database) {}

  public async update(task: Task) {
    const taskData = task.getTask();

    const [row] = await this.database
      .update(tasks)
      .set({
        taskStatusId: taskData.taskStatus.id,
      })
      .where(
        and(
          eq(tasks.studentId, taskData.studentId),
          eq(tasks.taskContentId, taskData.taskContent.id)
        )
      )
      .returning({
        taskContentId: tasks.taskContentId,
        taskStatusId: tasks.taskContentId,
        studentId: tasks.studentId,
      });

    console.log(row);

    if (!row?.studentId || !row.taskContentId) {
      throw new Error("Failed to update a task");
    }

    const updateData = await this.findById(row.taskContentId, row.studentId);

    console.log(updateData);

    if (!updateData) {
      throw new Error("Failed to error a task");
    }

    return updateData;
  }

  public async findById(
    taskContentId: string,
    studentId: string
  ): Promise<Task | undefined> {
    const [row] = await this.database
      .select({
        taskContentId: taskContents.id,
        title: taskContents.title,
        content: taskContents.content,
        taskStatusId: taskStatus.id,
        status: taskStatus.name,
        studentId: students.id,
      })
      .from(tasks)
      .innerJoin(students, eq(tasks.studentId, students.id))
      .innerJoin(taskContents, eq(tasks.taskContentId, taskContents.id))
      .innerJoin(taskStatus, eq(tasks.taskStatusId, taskStatus.id))
      .where(
        and(eq(taskContents.id, taskContentId), eq(students.id, studentId))
      );

    if (!row) {
      return undefined;
    }

    return new Task({
      studentId: row.studentId,
      taskStatus: new TaskStatus({
        id: row.taskStatusId,
        taskStatus: row.status,
      }),
      taskContent: new TaskContent({
        id: row.taskContentId,
        title: row.title,
        content: row.content ?? undefined,
      }),
    });
  }
}
