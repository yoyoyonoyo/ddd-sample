import "dotenv/config";
import {
  participant,
  participant_status,
  task,
  task_content,
  task_status,
  team,
  team_member,
} from "./schema";
import { getDatabase } from "./get-database";

const db = getDatabase();

async function main() {
  const participantStatus: (typeof participant_status.$inferInsert)[] = [
    {
      id: 1,
      name: "在籍中",
    },
    {
      id: 2,
      name: "休会中",
    },
    {
      id: 3,
      name: "退会済",
    },
  ];

  await db.insert(participant_status).values(participantStatus);

  const participants: (typeof participant.$inferInsert)[] = [
    {
      id: "01JASH2PBKVGJKDHA6B4N1KRRG",
      name: "図子稔勝",
      mailaddress: "test1@example.com",
      participant_status_id: 1,
    },
    {
      id: "01JASH2PBKZADP7C8W1D8PC0AV",
      name: "図子亜実",
      mailaddress: "test2@example.com",
      participant_status_id: 1,
    },
    {
      id: "01JASH2PBKXGK96KHZD8ACPR1Y",
      name: "瀬尾相模",
      mailaddress: "test3@example.com",
      participant_status_id: 1,
    },
    {
      id: "01JASH2PBK6S7J8ZREJWZTSBN6",
      name: "瀬尾淳子",
      mailaddress: "test4@example.com",
      participant_status_id: 1,
    },
    {
      id: "01JASH2PBKD67B7XNWSKBNPK5B",
      name: "矢島渉",
      mailaddress: "test5@example.com",
      participant_status_id: 2,
    },
    {
      id: "01JASJQXYSC6KV1E11T3VM7ABA",
      name: "矢島曜",
      mailaddress: "test6@example.com",
      participant_status_id: 3,
    },
  ];

  await db.insert(participant).values(participants);

  const taskContents: (typeof task_content.$inferInsert)[] = [
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

  await db.insert(task_content).values(taskContents);

  const taskStatus: (typeof task_status.$inferInsert)[] = [
    {
      id: 1,
      name: "未着手",
    },
    {
      id: 2,
      name: "取組中",
    },
    {
      id: 3,
      name: "レビュー待ち",
    },
    {
      id: 4,
      name: "完了",
    },
  ];

  await db.insert(task_status).values(taskStatus);

  const tasks: (typeof task.$inferInsert)[] = [
    {
      participant_id: "01JASH2PBKVGJKDHA6B4N1KRRG",
      task_content_id: "01JASHREBAJW2FTV66XAJV18JV",
      task_status_id: 1,
    },
    {
      participant_id: "01JASH2PBKVGJKDHA6B4N1KRRG",
      task_content_id: "01JASHREBAXSB5QR47PZWNS5GD",
      task_status_id: 1,
    },
    {
      participant_id: "01JASH2PBKVGJKDHA6B4N1KRRG",
      task_content_id: "01JASHREBABFGJNBJANV2PQEQJ",
      task_status_id: 1,
    },
    {
      participant_id: "01JASH2PBKZADP7C8W1D8PC0AV",
      task_content_id: "01JASHREBAJW2FTV66XAJV18JV",
      task_status_id: 1,
    },
    {
      participant_id: "01JASH2PBKZADP7C8W1D8PC0AV",
      task_content_id: "01JASHREBAXSB5QR47PZWNS5GD",
      task_status_id: 1,
    },
    {
      participant_id: "01JASH2PBKZADP7C8W1D8PC0AV",
      task_content_id: "01JASHREBABFGJNBJANV2PQEQJ",
      task_status_id: 1,
    },
    {
      participant_id: "01JASH2PBKXGK96KHZD8ACPR1Y",
      task_content_id: "01JASHREBAJW2FTV66XAJV18JV",
      task_status_id: 1,
    },
    {
      participant_id: "01JASH2PBKXGK96KHZD8ACPR1Y",
      task_content_id: "01JASHREBAXSB5QR47PZWNS5GD",
      task_status_id: 1,
    },
    {
      participant_id: "01JASH2PBKXGK96KHZD8ACPR1Y",
      task_content_id: "01JASHREBABFGJNBJANV2PQEQJ",
      task_status_id: 1,
    },
    {
      participant_id: "01JASH2PBK6S7J8ZREJWZTSBN6",
      task_content_id: "01JASHREBAJW2FTV66XAJV18JV",
      task_status_id: 1,
    },
    {
      participant_id: "01JASH2PBK6S7J8ZREJWZTSBN6",
      task_content_id: "01JASHREBAXSB5QR47PZWNS5GD",
      task_status_id: 1,
    },
    {
      participant_id: "01JASH2PBK6S7J8ZREJWZTSBN6",
      task_content_id: "01JASHREBABFGJNBJANV2PQEQJ",
      task_status_id: 1,
    },
    {
      participant_id: "01JASH2PBKD67B7XNWSKBNPK5B",
      task_content_id: "01JASHREBAJW2FTV66XAJV18JV",
      task_status_id: 1,
    },
    {
      participant_id: "01JASH2PBKD67B7XNWSKBNPK5B",
      task_content_id: "01JASHREBAXSB5QR47PZWNS5GD",
      task_status_id: 1,
    },
    {
      participant_id: "01JASH2PBKD67B7XNWSKBNPK5B",
      task_content_id: "01JASHREBABFGJNBJANV2PQEQJ",
      task_status_id: 1,
    },
    {
      participant_id: "01JASJQXYSC6KV1E11T3VM7ABA",
      task_content_id: "01JASHREBAJW2FTV66XAJV18JV",
      task_status_id: 1,
    },
    {
      participant_id: "01JASJQXYSC6KV1E11T3VM7ABA",
      task_content_id: "01JASHREBAXSB5QR47PZWNS5GD",
      task_status_id: 1,
    },
    {
      participant_id: "01JASJQXYSC6KV1E11T3VM7ABA",
      task_content_id: "01JASHREBABFGJNBJANV2PQEQJ",
      task_status_id: 1,
    },
  ];

  await db.insert(task).values(tasks);

  const teams: (typeof team.$inferInsert)[] = [
    {
      id: "01JASJKWYGF85S1YTRBMTM9JER",
      name: "team-a",
    },
    {
      id: "01JASJKWYGSMRR63BEQ69W0FXG",
      name: "team-a",
    },
  ];

  await db.insert(team).values(teams);

  const teamMembers: (typeof team_member.$inferInsert)[] = [
    {
      participant_id: "01JASH2PBKVGJKDHA6B4N1KRRG",
      team_id: "01JASJKWYGF85S1YTRBMTM9JER",
    },
    {
      participant_id: "01JASH2PBKZADP7C8W1D8PC0AV",
      team_id: "01JASJKWYGF85S1YTRBMTM9JER",
    },
    {
      participant_id: "01JASH2PBKXGK96KHZD8ACPR1Y",
      team_id: "01JASJKWYGSMRR63BEQ69W0FXG",
    },
    {
      participant_id: "01JASH2PBK6S7J8ZREJWZTSBN6",
      team_id: "01JASJKWYGSMRR63BEQ69W0FXG",
    },
  ];

  await db.insert(team_member).values(teamMembers);

  console.log("add complete");
}

main();
