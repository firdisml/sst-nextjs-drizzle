import { mysqlTable, text} from "drizzle-orm/mysql-core";

export const users = mysqlTable('users', {
  id: text('id'),
  email: text('email'),
  picture: text('picture'),
  name: text('name'),
});