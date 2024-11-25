import "dotenv/config";
import {
  students,
  tasks,
  taskContents,
  taskStatus,
  teams,
  teamMember,
} from "./schema";
import { getDatabase } from "./get-database";

const db = getDatabase();

async function main() {
  const studentsData: (typeof students.$inferInsert)[] = [
    {
      id: "01JASH2PBKVGJKDHA6B4N1KRRG",
      name: "図子稔勝",
      mailAddress: "test1@example.com",
      status: "在籍中",
    },
    {
      id: "01JASH2PBKZADP7C8W1D8PC0AV",
      name: "図子亜実",
      mailAddress: "test2@example.com",
      status: "在籍中",
    },
    {
      id: "01JASH2PBKXGK96KHZD8ACPR1Y",
      name: "瀬尾相模",
      mailAddress: "test3@example.com",
      status: "在籍中",
    },
    {
      id: "01JASH2PBK6S7J8ZREJWZTSBN6",
      name: "瀬尾淳子",
      mailAddress: "test4@example.com",
      status: "在籍中",
    },
    {
      id: "01JASH2PBKD67B7XNWSKBNPK5B",
      name: "矢島渉",
      mailAddress: "test5@example.com",
      status: "休会中",
    },
    {
      id: "01JASJQXYSC6KV1E11T3VM7ABA",
      name: "矢島曜",
      mailAddress: "test6@example.com",
      status: "退会済",
    },
  ];

  await db.insert(students).values(studentsData);

  const taskContentsData: (typeof taskContents.$inferInsert)[] = [
    {
      id: "01JASHREBAJW2FTV66XAJV18JV",
      title: "課題1",
      content: "課題1のコンテンツ",
    },
    {
      id: "01JASHREBAXSB5QR47PZWNS5GD",
      title: "課題2",
      content: "課題2のコンテンツ",
    },
    {
      id: "01JASHREBABFGJNBJANV2PQEQJ",
      title: "課題3",
      content: "課題3のコンテンツ",
    },
  ];

  await db.insert(taskContents).values(taskContentsData);

  const taskStatusList: (typeof taskStatus.$inferInsert)[] = [
    {
      id: 0,
      name: "未着手",
    },
    {
      id: 1,
      name: "取組中",
    },
    {
      id: 2,
      name: "レビュー待ち",
    },
    {
      id: 3,
      name: "完了",
    },
  ];

  await db.insert(taskStatus).values(taskStatusList);

  const tasksData: (typeof tasks.$inferInsert)[] = [
    {
      studentId: "01JASH2PBKVGJKDHA6B4N1KRRG",
      taskContentId: "01JASHREBAJW2FTV66XAJV18JV",
      taskStatusId: 0,
    },
    {
      studentId: "01JASH2PBKVGJKDHA6B4N1KRRG",
      taskContentId: "01JASHREBAXSB5QR47PZWNS5GD",
      taskStatusId: 0,
    },
    {
      studentId: "01JASH2PBKVGJKDHA6B4N1KRRG",
      taskContentId: "01JASHREBABFGJNBJANV2PQEQJ",
      taskStatusId: 0,
    },
    {
      studentId: "01JASH2PBKZADP7C8W1D8PC0AV",
      taskContentId: "01JASHREBAJW2FTV66XAJV18JV",
      taskStatusId: 0,
    },
    {
      studentId: "01JASH2PBKZADP7C8W1D8PC0AV",
      taskContentId: "01JASHREBAXSB5QR47PZWNS5GD",
      taskStatusId: 0,
    },
    {
      studentId: "01JASH2PBKZADP7C8W1D8PC0AV",
      taskContentId: "01JASHREBABFGJNBJANV2PQEQJ",
      taskStatusId: 0,
    },
    {
      studentId: "01JASH2PBKXGK96KHZD8ACPR1Y",
      taskContentId: "01JASHREBAJW2FTV66XAJV18JV",
      taskStatusId: 0,
    },
    {
      studentId: "01JASH2PBKXGK96KHZD8ACPR1Y",
      taskContentId: "01JASHREBAXSB5QR47PZWNS5GD",
      taskStatusId: 0,
    },
    {
      studentId: "01JASH2PBKXGK96KHZD8ACPR1Y",
      taskContentId: "01JASHREBABFGJNBJANV2PQEQJ",
      taskStatusId: 0,
    },
    {
      studentId: "01JASH2PBK6S7J8ZREJWZTSBN6",
      taskContentId: "01JASHREBAJW2FTV66XAJV18JV",
      taskStatusId: 0,
    },
    {
      studentId: "01JASH2PBK6S7J8ZREJWZTSBN6",
      taskContentId: "01JASHREBAXSB5QR47PZWNS5GD",
      taskStatusId: 0,
    },
    {
      studentId: "01JASH2PBK6S7J8ZREJWZTSBN6",
      taskContentId: "01JASHREBABFGJNBJANV2PQEQJ",
      taskStatusId: 0,
    },
    {
      studentId: "01JASH2PBKD67B7XNWSKBNPK5B",
      taskContentId: "01JASHREBAJW2FTV66XAJV18JV",
      taskStatusId: 0,
    },
    {
      studentId: "01JASH2PBKD67B7XNWSKBNPK5B",
      taskContentId: "01JASHREBAXSB5QR47PZWNS5GD",
      taskStatusId: 0,
    },
    {
      studentId: "01JASH2PBKD67B7XNWSKBNPK5B",
      taskContentId: "01JASHREBABFGJNBJANV2PQEQJ",
      taskStatusId: 0,
    },
    {
      studentId: "01JASJQXYSC6KV1E11T3VM7ABA",
      taskContentId: "01JASHREBAJW2FTV66XAJV18JV",
      taskStatusId: 0,
    },
    {
      studentId: "01JASJQXYSC6KV1E11T3VM7ABA",
      taskContentId: "01JASHREBAXSB5QR47PZWNS5GD",
      taskStatusId: 0,
    },
    {
      studentId: "01JASJQXYSC6KV1E11T3VM7ABA",
      taskContentId: "01JASHREBABFGJNBJANV2PQEQJ",
      taskStatusId: 0,
    },
  ];

  await db.insert(tasks).values(tasksData);

  const teamsData: (typeof teams.$inferInsert)[] = [
    {
      id: "01JASJKWYGF85S1YTRBMTM9JER",
      name: "a",
    },
    {
      id: "01JASJKWYGSMRR63BEQ69W0FXG",
      name: "b",
    },
  ];

  await db.insert(teams).values(teamsData);

  const teamMembersData: (typeof teamMember.$inferInsert)[] = [
    {
      studentId: "01JASH2PBKVGJKDHA6B4N1KRRG",
      teamId: "01JASJKWYGF85S1YTRBMTM9JER",
    },
    {
      studentId: "01JASH2PBKZADP7C8W1D8PC0AV",
      teamId: "01JASJKWYGF85S1YTRBMTM9JER",
    },
    {
      studentId: "01JASH2PBKXGK96KHZD8ACPR1Y",
      teamId: "01JASJKWYGSMRR63BEQ69W0FXG",
    },
    {
      studentId: "01JASH2PBK6S7J8ZREJWZTSBN6",
      teamId: "01JASJKWYGSMRR63BEQ69W0FXG",
    },
  ];

  await db.insert(teamMember).values(teamMembersData);

  console.log("add complete");
}

main();
