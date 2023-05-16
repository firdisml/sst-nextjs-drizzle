import { StackContext, NextjsSite, Auth, Api, Table } from "sst/constructs";

export function Default({ stack }: StackContext) {

  const api = new Api(stack, "api", {
    routes: {
      "GET /": "packages/functions/src/lambda.handler",
      "GET /session": "packages/functions/src/session.handler",
    },
  });
//Site
  const site = new NextjsSite(stack, "site", {
    path: "packages/web",
    bind: [api],
    environment: {
      API_URL: api.url,
    },
  });

  const auth = new Auth(stack, "auth", {
    authenticator: {
      handler: "packages/functions/src/lambda.handler",
      bind: [site],
    },
  });


  auth.attach(stack, {
    api,
    prefix: "/auth",
  });


  stack.addOutputs({
    SiteUrl: site.url,
    ApiUrl: api.url
  });
}
