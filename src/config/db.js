import * as mariadb from "mariadb";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
let pool;
let conn;
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
      console.log("MARIADB CONNECTED !");
    }
    return pool;
  } catch (error) {
    console.error(error);
  }
};
export const signupQuery = async (name, email, password) => {
  try {
    conn = await pool.getConnection();
    console.log;
    let sql = `INSERT INTO users(name,email,password) values(?,?,?)`;
    const result = await conn.query(sql, [name, email, password]);
    return result;
  } catch (error) {
    console.error(error);
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
    console.error(error);
  } finally {
    if (conn) conn.release();
  }
};
export const bookQuery = async (name) => {
  let check;
  try {
    const conn = await pool.getConnection();
    if (pool) {
      console.log("MARIADB CONNECTED ");
    }
    let sql = `SELECT path FROM books where name in (?)`;
    const result = await conn.query(sql, [name]);
    if (result.error) {
      console.error(result.error.details);
      check = false;
    } else {
      return result.value[0].path;
    }
  } catch (error) {
    console.error(error);
  } finally {
    if (conn) conn.release();
  }
};
