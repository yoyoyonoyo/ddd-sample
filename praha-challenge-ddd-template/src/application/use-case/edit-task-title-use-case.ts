import type { TaskRepositoryInterface } from "../../domain/task/task-repository";
import { TaskStatusList } from "../../domain/task/task_status";

export type EditTaskTitleUseCaseInput = {
  taskContentId: string;
  taskStatus: (typeof TaskStatusList)[number];
  studentId: string;
};

export type EditTaskTitleUseCasePayload = {
  studentId: string;
  taskStatus: {
    id: number;
    status: (typeof TaskStatusList)[number];
  };
  taskContent: {
    id: string;
    title: string;
    content: string | undefined;
  };
};

export class EditTaskTitleUseCaseNotFoundError extends Error {
  public override readonly name = "EditTaskTitleUseCaseNotFoundError";

  public constructor() {
    super("task not found");
  }
}

export class EditTaskTitleUseCase {
  public constructor(
    private readonly taskRepository: TaskRepositoryInterface
  ) {}

  public async invoke(
    input: EditTaskTitleUseCaseInput
  ): Promise<EditTaskTitleUseCasePayload> {
    const task = await this.taskRepository.findById(
      input.taskContentId,
      input.studentId
    );

    if (!task) {
      throw new EditTaskTitleUseCaseNotFoundError();
    }

    task.updateTaskStatus(input.taskStatus);

    const savedTask = await this.taskRepository.update(task);

    return savedTask.getTask();
  }
}
