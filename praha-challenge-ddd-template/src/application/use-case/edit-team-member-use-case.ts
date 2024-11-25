import type { TeamRepositoryInterface } from "../../domain/team/team-repository";

export type EditTeamMemberUseCaseInput = {
  teamId: string;
  StudentId: string;
};

export type EditTeamMemberUseCasePayload = {
  id: string;
  team: string;
  member: string[];
};

export class EditTeamMemberUseCaseNotFoundError extends Error {
  public override readonly name = "EditTeamMemberUseCaseNotFoundError";

  public constructor() {
    super("team not found");
  }
}

export class EditTeamMemberUseCase {
  public constructor(
    private readonly teamRepository: TeamRepositoryInterface
  ) {}

  public async addMember(
    input: EditTeamMemberUseCaseInput
  ): Promise<EditTeamMemberUseCasePayload> {
    const team = await this.teamRepository.findByTeamId(input.teamId);

    if (!team) {
      throw new EditTeamMemberUseCaseNotFoundError();
    }

    team.addMember(input.StudentId);

    // チームが5人の場合はアラートを出す
    if (team.member.length >= 5) {
      console.log("sendMail: youさんにメールを送信しました");
      console.log(
        "sendMail:",
        `チームが5人以上です: ID:${team.id} 名前：${team.name}`
      );
    }

    const savedTeam = await this.teamRepository.save(team);

    return {
      id: savedTeam.id,
      team: savedTeam.name,
      member: savedTeam.member,
    };
  }

  public async removeMember(
    input: EditTeamMemberUseCaseInput
  ): Promise<EditTeamMemberUseCasePayload> {
    const team = await this.teamRepository.findByTeamId(input.teamId);

    if (!team) {
      throw new EditTeamMemberUseCaseNotFoundError();
    }

    team.removeMember(input.StudentId);

    // チームが2人以下の場合はアラートを出す
    if (team.member.length <= 2) {
      console.log("sendMail: youさんにメールを送信しました");
      console.log(
        "sendMail:",
        `チームが2人以下です: ID:${team.id} 名前：${team.name}`
      );
    }

    const savedTeam = await this.teamRepository.save(team);

    return {
      id: savedTeam.id,
      team: savedTeam.name,
      member: savedTeam.member,
    };
  }
}
