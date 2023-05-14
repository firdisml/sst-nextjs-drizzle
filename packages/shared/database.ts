import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import { migrate } from 'drizzle-orm/mysql2/migrator';

// create the connection
const poolConnection = mysql.createPool('');

export const database = drizzle(poolConnection);

await migrate(database, { migrationsFolder: 'migrations' });