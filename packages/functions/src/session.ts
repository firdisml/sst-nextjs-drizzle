import { Table } from "sst/node/table";
import { ApiHandler } from "sst/node/api";
import { useSession } from "sst/node/auth";
import { database } from "../../shared/database"
import { users } from "../../schema/user"
import { eq } from 'drizzle-orm';

export const handler = ApiHandler(async () => {
  const session = useSession();

  // Check user is authenticated
  if (session.type !== "user") {
    throw new Error("Not authenticated");
  }

  const user = await database.select().from(users).where(eq(users.id, session.properties.user_id));
  
  console.log(user)

  return {
    statusCode: 200,
    body: JSON.stringify(user),
  };
});