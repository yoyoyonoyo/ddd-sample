import { eq } from "drizzle-orm";
import { Team } from "../../domain/team/team";
import type { TeamRepositoryInterface } from "../../domain/team/team-repository";
import type { Database } from "../../libs/drizzle/get-database";
import { teams, teamMember } from "../../libs/drizzle/schema";

export class PostgresqlTeamRepository implements TeamRepositoryInterface {
  public constructor(private readonly database: Database) {}

  public async save(teamData: Team) {
    await this.database
      .delete(teamMember)
      .where(eq(teamMember.teamId, teamData.id));

    const insertData = [];

    for (const studentId of teamData.member) {
      console.log(studentId);
      insertData.push({ teamId: teamData.id, studentId });
    }

    await this.database.insert(teamMember).values(insertData);

    const data = await this.database
      .select({
        id: teams.id,
        name: teams.name,
        studentId: teamMember.studentId,
      })
      .from(teamMember)
      .innerJoin(teams, eq(teamMember.teamId, teams.id));

    if (!data[0]) {
      throw new Error();
    }

    const member = data.reduce<string[]>((acc, { studentId }) => {
      if (studentId) {
        acc.push(studentId);
      }
      return acc;
    }, []);

    return new Team({
      id: data[0].id,
      name: data[0].name,
      member,
    });
  }

  public async findByTeamId(id: string) {
    const data = await this.database
      .select({
        id: teams.id,
        name: teams.name,
        studentId: teamMember.studentId,
      })
      .from(teams)
      .where(eq(teams.id, id))
      .innerJoin(teamMember, eq(teamMember.teamId, teams.id));

    if (!data[0]) {
      return undefined;
    }

    const member = data.reduce<string[]>((acc, { studentId }) => {
      if (studentId) {
        acc.push(studentId);
      }
      return acc;
    }, []);

    return new Team({
      id: data[0].id,
      name: data[0].name,
      member,
    });
  }

  public async findByStudentId(id: string) {
    const data = await this.database
      .select({
        id: teams.id,
        name: teams.name,
        studentId: teamMember.studentId,
      })
      .from(teams)
      .innerJoin(teamMember, eq(teamMember.teamId, teams.id))
      .where(eq(teamMember.studentId, id));

    if (!data[0]) {
      return undefined;
    }

    const member = data.reduce<string[]>((acc, { studentId }) => {
      if (studentId) {
        acc.push(studentId);
      }
      return acc;
    }, []);

    return new Team({
      id: data[0].id,
      name: data[0].name,
      member,
    });
  }

  public async getAllTeam() {
    const teamsData = await this.database.select().from(teams);
    const teamMemberData = await this.database.select().from(teamMember);

    const teamList = [];

    for (const { id, name } of teamsData) {
      const teamMember = teamMemberData.reduce<string[]>(
        (acc, { teamId, studentId }) => {
          // データがない場合は何もしない
          if (!teamId || !studentId) return acc;

          if (id === teamId) {
            acc.push(studentId);
          }
          return acc;
        },
        []
      );

      teamList.push(
        new Team({
          id: id,
          name: name,
          member: teamMember,
        })
      );
    }

    return teamList;
  }
}
