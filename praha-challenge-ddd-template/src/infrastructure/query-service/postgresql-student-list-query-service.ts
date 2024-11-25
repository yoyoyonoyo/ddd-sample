import type {
  StudentListQueryServiceInterface,
  StudentListQueryServicePayload,
} from "../../application/query-service/student-list-query-service";
import type { Database } from "../../libs/drizzle/get-database";
import { students } from "../../libs/drizzle/schema";

export class PostgresqlStudentListQueryService
  implements StudentListQueryServiceInterface
{
  public constructor(private readonly database: Database) {}

  public async invoke(): Promise<StudentListQueryServicePayload> {
    return this.database
      .select({
        id: students.id,
        name: students.name,
        mailAddress: students.mailAddress,
        status: students.status,
      })
      .from(students);
  }
}
