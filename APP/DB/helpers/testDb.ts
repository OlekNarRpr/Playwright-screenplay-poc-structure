import { sendSQLServerQuery } from "./dbHelper";

export async function getPropertyByPropertyId(
  propertyId: number
): Promise<any> {
  /**
   * Function change the Expiration to yesterday
   *
   * @param propertyId - accountID of the prtb that we need to update
   */
  const sqlQuery = `SELECT * FROM properties WHERE PropertyId = ${propertyId}`;
  const result = await sendSQLServerQuery(sqlQuery);
  return result;
}
