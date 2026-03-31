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
      connectionLimit: 200,
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
  let message = false;
  try {
    conn = await pool.getConnection();
    let sql = `INSERT INTO users(name,email,password) values(?,?,?)`;
    const okPacket = await conn.query(sql, [name, email, password]);
    let user_id = Number(okPacket.insertId);
    let sql2 = ` SELECT * FROM users where user_id in (?)`;
    const rows = await conn.query(sql2, [user_id]);
    return rows[0];
  } catch (error) {
    dbDebug(error);
    return message;
  } finally {
    if (conn) conn.release();
  }
};
export const getIdQuery = async (email) => {
  try {
    conn = await pool.getConnection();
    let sql = `SELECT user_id FROM users where email in (?)`;
    const result = await conn.query(sql, [email]);
    return result;
  } catch (error) {
    dbDebug(error);
  } finally {
    if (conn) conn.release();
  }
};
export const setEmail = async (id, token) => {
  try {
    conn = await pool.getConnection();
    let sql = `UPDATE users SET up_token=${token} where id in (?)`;
    const result = await conn.query(sql, [id]);
    return result;
  } catch (error) {
    dbDebug(error);
  } finally {
    if (conn) conn.release();
  }
};
export const verifyEmail = async (id) => {
  try {
    conn = await pool.getConnection();
    let sql = `SELECT * FROM users WHERE pass_token in (?)`;
    const result = await conn.query(sql, [id]);
    return result;
  } catch (error) {
    dbDebug(error);
  } finally {
    if (conn) conn.release();
  }
};

export const loginQuery = async (email, password, token) => {
  try {
    let check = false;
    conn = await pool.getConnection();
    let sql = `SELECT  password  FROM users WHERE email in  (?)`;

    const result = await conn.query(sql, [email]);
    console.log(result);
    check = await bcrypt.compare(password, result[0].password);
    if (check) {
      let sql2 = `UPDATE users SET refresh_token= ? WHERE email = ?`;
      const set_token_result = await conn.query(sql2, [token, email]);
      console.log(set_token_result);
      if (set_token_result) check = true;
    }
    return check;
  } catch (error) {
    dbDebug(error);
  } finally {
    if (conn) conn.release();
  }
};
export const logoutQuery = async (id) => {
  try {
    conn = await pool.getConnection();
    let sql = `UPDATE users SET refresh_token=NULL where user_id in (?)`;
    const result = await conn.query(sql, [id]);
    return result;
  } catch (error) {
    dbDebug(error);
  } finally {
    if (conn) conn.release();
  }
};
export const resetCodeQuery = async (id, token) => {
  try {
    conn = await pool.getConnection();
    let sql = `UPDATE users SET pass_token=${token} WHERE user_id in (?) `;
    const result = await conn.query(sql, token, [id]);
    return result;
  } catch (error) {
    dbDebug(error);
  } finally {
    if (conn) conn.release();
  }
};
export const verifyQuery = async (id) => {
  try {
    conn = await pool.getConnection();
    let sql = `SELECT pass_token from users WHERE user_id in (?)`;
    const result = await conn.query(sql, [id]);
    return result;
  } catch (error) {
    dbDebug(error);
  } finally {
    if (conn) conn.release();
  }
};
export const setPassword = async (id, newPass) => {
  try {
    conn = await pool.getConnection();
    let sql = `UPDATE users SET password=${newPass} where user_id in (?)`;
    const result = await conn.query(sql, [id]);
    return result;
  } catch (error) {
    dbDebug(error);
  } finally {
    if (conn) conn.release();
  }
};
export const bookQuery = async () => {
  let check;
  try {
    conn = await pool.getConnection();
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
