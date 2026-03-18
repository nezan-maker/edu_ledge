import * as mariadb from "mariadb";
const connectDB = async () => {
  const host = "localhost";
  const user = "e_read";
  const password = "sine";
  const database = "e_read";
  try {
    const conn = await mariadb.createConnection({
      host,
      user,
      password,
      database,
    });
    console.log("MARIADB CONNECTED !");
  } catch (error) {
    console.error(error);
  }
};
export default connectDB;
