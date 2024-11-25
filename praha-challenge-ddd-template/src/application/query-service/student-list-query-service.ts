export type StudentListQueryServicePayload = Array<{
  id: string;
  name: string;
  mailAddress: string;
  status: string;
}>;

export interface StudentListQueryServiceInterface {
  invoke: () => Promise<StudentListQueryServicePayload>;
}
