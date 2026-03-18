import * as mariadb from "mariadb";
let pool;
export const connectDB = async () => {
  const host = "localhost";
  const user = "e_read";
  const password = "sine";
  const database = "e_read";
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
  } catch (error) {
    console.error(error);
  }
};
export const signupQuery = async (name, email, password) => {
  try {
    const conn = pool.getConnection();
    let sql = `INSERT INTO users(name,email,password) values(?,?,?)`;
    const result = await conn.query(sql, [name, email, password]);
    return result;
  } catch (error) {
    console.error(error);
  } finally {
    if (conn) conn.release();
  }
};
