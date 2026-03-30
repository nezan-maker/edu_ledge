import * as mariadb from "mariadb";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import debug from "debug";
let pool;
let conn;
const dbDebug = debug("app:db");
dotenv.config();
export const connectDB = async () => {
  const host = process.env.MARIA_DB_HOST;
  const user = process.env.MARIA_DB_USER;
  const password = process.env.MARIA_DB_PASS;
  const database = process.env.MARIA_DB;
  try {
    pool = mariadb.createPool({
      host,
      user,
      password,
      database,
      connectionLimit: 5,
    });
    if (pool) {
      dbDebug("MARIADB CONNECTED !");
    }
    return pool;
  } catch (error) {
    console.error(error);
  }
};
export const signupQuery = async (req, res, name, email, password) => {
  try {
    conn = await pool.getConnection();
    let sql = `INSERT INTO users(name,email,password) values(?,?,?)`;
    const result = await conn.query(sql, [name, email, password]);
    let message = 1;
    return message;
  } catch (error) {
    // dbDebug(error);
    let message = false;
    return message;
  } finally {
    if (conn) conn.release();
  }
};
export const loginQuery = async (email, password) => {
  try {
    conn = await pool.getConnection();
    let sql = `SELECT password FROM  users WHERE email in  (?)`;
    const result = await conn.query(sql, [email]);
    const check = await bcrypt.compare(password, result[0].password);
    return check;
  } catch (error) {
    dbDebug(error);
  } finally {
    if (conn) conn.release();
  }
};
export const bookQuery = async () => {
  let check;
  try {
    const conn = await pool.getConnection();
    if (pool) {
      dbDebug("MARIADB CONNECTED ");
    }
    let sql = `SELECT name,description FROM books`;
    const result = await conn.query(sql);
    if (result.error) {
      dbDebug(result.error.details);
      check = false;
    } else {
      return result;
    }
  } catch (error) {
    dbDebug(error);
  } finally {
    if (conn) conn.release();
  }
};
