export type TeamListQueryServicePayload = {
  id: string;
  team: string;
  member: {
    id: string;
    name: string;
    mailAddress: string;
  }[];
}[];

export interface TeamListQueryServiceInterface {
  invoke: () => Promise<TeamListQueryServicePayload>;
}
