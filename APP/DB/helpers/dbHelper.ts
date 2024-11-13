import sql from "mssql";

export const sendSQLServerQuery = async (query: string): Promise<any> => {
  /**
   * Sends any sql query and returns results
   * @param query - sql query string
   *
   * @example
   * import { sendSQLServerQuery } from "./dbHelper";
   * let sqlQuery = "SELECT * From AccountUser WHERE UserName like 'user@gmail.com'";
   * const result = await sendSQLServerQuery(sqlQuery)
   * const records = result.recordset
   */
  const config = {
    database: process.env.DB,
    options: {
      MultipleActiveResultSets: true,
      encrypt: true,
    },
    pool: {
      max: 10,
      min: 0,
      idleTimeoutMillis: 30000,
    },
  };

  await sql.connect(config);
  const result = await sql.query(query);
  await sql.close();
  return result;
};
