import 'dotenv/config'
import postgres from 'postgres'

const {PGHOST, PGUSER, PGPASSWORD, PGDATABASE, ENDPOINT_ID} = process.env
const URL = `postgres://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}?options=project%3D${ENDPOINT_ID}`

export const sql = postgres(URL, { ssl: 'require'})

// require("dotenv").config();

// const http = require("http");
// const { neon } = require("@neondatabase/serverless");

// const sql = neon(process.env.DATABASE_URL);
// module.exports = { sql };
