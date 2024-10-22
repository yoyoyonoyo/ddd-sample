import { serve } from "@hono/node-server";
import { Hono } from "hono";
import "dotenv/config";
import { createStudentController } from "./presentation/student/create-student-controller";
import { editStudentController } from "./presentation/student/edit-student-controller";
import { getStudentListController } from "./presentation/student/get-student-list-controller";
import { createTaskController } from "./presentation/task/create-task-controller";
import { editTaskTitleController } from "./presentation/task/edit-task-title-controller";
import { getTaskController } from "./presentation/task/get-task-controller";
import { getTaskListController } from "./presentation/task/get-task-list-controller";
import { setTaskDoneController } from "./presentation/task/set-task-done-controller";

const app = new Hono();

// ヘルスチェック
app.get("/health", (c) =>
  c.json({
    message: "Health Check OK!",
  }),
);

// 参加者の一覧取得、新規追加、更新（在籍ステータスを変更できること）
// 参加者の一覧取得
app.route("/", getStudentListController);

// 参加者の新規追加
// app.route("/", createStudentController);

// // 参加者の更新（在籍ステータスを変更できること）
// app.route("/", editStudentController);

// (管理者)チームの一覧取得、更新（チームに所属する参加者を変更できること）
// チームの一覧取得
// app.route("/", getTeamListController);

// チームの更新（チームに所属する参加者を変更できること）
// app.route("/", editTeamController);

// (生徒)課題の更新（特定の参加者の課題進捗ステータスを変更できること）
// app.route("/", editTaskController);

// (管理者)「特定の課題（複数可能）」が「特定の進捗ステータス」になっている参加者の一覧を、10人単位でページングして取得する
//   - 例１：「設計原則（SOLID）」と「DBモデリング１」を「レビュー完了」している参加者一覧を取得する
//   - 例２：「DBモデリング3」を「未着手」の参加者一覧を取得する
//   - 条件に合致する参加者を全て取得するのではなく、10名ずつ取得する点（ページング）にご注意ください！
// app.route("/", getTaskController);

app.route("/", getTaskController);
app.route("/", getTaskListController);
app.route("/", createTaskController);
app.route("/", editTaskTitleController);
app.route("/", setTaskDoneController);

const port = 3000;
console.log(`Server is running on port ${port}`);

const server = serve({
  fetch: app.fetch,
  port,
});

if (import.meta.hot) {
  // HMR時に同一ポートでサーバーが立ち上がろうとする為、リロードが発生する前にサーバーを閉じる
  import.meta.hot.on("vite:beforeFullReload", () => {
    server.close();
  });
}
