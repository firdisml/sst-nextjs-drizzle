import { Session, AuthHandler, GoogleAdapter,  } from "sst/node/auth";
import { database } from "../../shared/database"
import { InferModel } from 'drizzle-orm';
import { users } from "../../schema/user"


declare module "sst/node/auth" {
  export interface SessionTypes {
    user: {
      user_id: string;
    };
  }
}

export const handler = AuthHandler({
  providers: {
    google: GoogleAdapter({
      mode: "oidc",
      clientID: "85203977808-e3k1hb0dv8pf2e7pighn59li87atqus1.apps.googleusercontent.com",
      onSuccess: async (tokenset) => {
        const claims = tokenset.claims();

        type NewUser = InferModel<typeof users, 'insert'>;

        const newUser: NewUser = {
          id: claims.sub,
          email: claims.email,
          picture: claims.picture,
          name: claims.given_name,
          
        };

        const insert = await database.insert(users).values(newUser);

        console.log(insert)

        return Session.parameter({
          //@ts-ignore
          redirect: "http://localhost:3000/",
          type: "user",
          properties: {
            user_id: claims.sub,
          },
        });
      },
    }),
  },
});