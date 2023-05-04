import { sql } from '@vercel/postgres';

const { rows } = await sql`SELECT * FROM posts WHERE likes > ${likes};`;
