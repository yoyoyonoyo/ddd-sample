// タスクのコンテンツ
export class TaskContent {
  readonly #id: string;
  #title: string;
  #content: string | undefined;

  constructor(props: {
    id: string;
    title: string;
    content: string | undefined;
  }) {
    this.#id = props.id;
    this.#title = props.title;
    this.#content = props.content;
  }

  public getTask(): {
    id: string;
    title: string;
    content: string | undefined;
  } {
    return {
      id: this.#id,
      title: this.#title,
      content: this.#content,
    };
  }
}
