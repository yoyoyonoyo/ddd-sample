import type { Team } from "./team";

export type TeamRepositoryInterface = {
  save(team: Team): Promise<Team>;
  findByTeamId(teamId: string): Promise<Team | undefined>;
  findByStudentId(StudentId: string): Promise<Team | undefined>;
  getAllTeam(): Promise<Team[]>;
};
