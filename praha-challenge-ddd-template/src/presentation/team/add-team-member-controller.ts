import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { createMiddleware } from "hono/factory";
import { z } from "zod";
import { getDatabase } from "../../libs/drizzle/get-database";
import {
  EditTeamMemberUseCase,
  EditTeamMemberUseCaseNotFoundError,
} from "../../application/use-case/edit-team-member-use-case";
import { PostgresqlTeamRepository } from "../../infrastructure/repository/postgresql-team-repository";

type Env = {
  Variables: {
    editTeamMemberUseCase: EditTeamMemberUseCase;
  };
};

export const addTeamMemberController = new Hono<Env>();

addTeamMemberController.post(
  "/teams/:id/add",
  zValidator("param", z.object({ id: z.string() }), (result, c) => {
    if (!result.success) {
      return c.text("invalid id", 400);
    }
    return;
  }),
  zValidator("json", z.object({ id: z.string() }), (result, c) => {
    if (!result.success) {
      console.log(result.error);
      return c.text("invalid body", 400);
    }
    return;
  }),
  createMiddleware<Env>(async (context, next) => {
    const database = getDatabase();
    const teamRepository = new PostgresqlTeamRepository(database);
    const editTeamMemberUseCase = new EditTeamMemberUseCase(teamRepository);
    context.set("editTeamMemberUseCase", editTeamMemberUseCase);

    await next();
  }),
  async (context) => {
    try {
      const param = context.req.valid("param");
      const body = context.req.valid("json");

      const payload = await context.var.editTeamMemberUseCase.addMember({
        teamId: param.id,
        StudentId: body.id,
      });

      return context.json(payload);
    } catch (error) {
      if (error instanceof EditTeamMemberUseCaseNotFoundError) {
        return context.text(error.message, 404);
      }

      throw error;
    }
  }
);
