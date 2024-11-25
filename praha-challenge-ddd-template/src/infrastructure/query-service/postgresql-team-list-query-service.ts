import { eq } from "drizzle-orm";
import type { Database } from "../../libs/drizzle/get-database";
import { Student, team, teamMember } from "../../libs/drizzle/schema";
import {
  TeamListQueryServiceInterface,
  TeamListQueryServicePayload,
} from "../../application/query-service/team-list-query-service";

export class PostgresqlTeamListQueryService
  implements TeamListQueryServiceInterface
{
  public constructor(private readonly database: Database) {}

  public async invoke(): Promise<TeamListQueryServicePayload> {
    const data = await this.database
      .select({
        id: team.id,
        name: team.name,
        Student: {
          id: Student.id,
          name: Student.name,
          mailAddress: Student.mailAddress,
        },
      })
      .from(teamMember)
      .innerJoin(team, eq(teamMember.teamId, team.id))
      .innerJoin(Student, eq(teamMember.StudentId, Student.id));

    return data.reduce<
      {
        id: string;
        team: string;
        member: {
          id: string;
          name: string;
          mailAddress: string;
        }[];
      }[]
    >((acc, { id, name, Student }) => {
      const index = acc.findIndex((obj) => obj.id === id);

      if (index === -1) {
        acc.push({ id: id, team: name, member: [Student] });
      } else {
        acc[index]?.member.push(Student);
      }

      return acc;
    }, []);
  }
}
