import { sqlite } from "../App";
import { WorkOrder } from "../models/WorkOrder";
import { WorkOrdersQuery } from "../models/WorkOrdersQuery";

const schema = {
  database: "WorkOrders",
  version: 1,
  encrypted: false,
  mode: "full",
  tables: [
    {
      name: "WorkOrders",
      schema: [
        { column: "id", value: "INTEGER PRIMARY KEY NOT NULL" },
        { column: "service", value: "TEXT NOT NULL" },
        { column: "status", value: "INTEGER NOT NULL" },
        { column: "address", value: "TEXT NOT NULL" },
        { column: "description", value: "TEXT NOT NULL" },
        { column: "scheduled_ms", value: "INTEGER NOT NULL" },
        { column: "modified_ms", value: "INTEGER NOT NULL" },
      ],
      indexes: [
        { name: "index_status", value: "status" },
        { name: "index_modified", value: "modified_ms DESC" },
      ],
    },
  ],
};

export async function init() {
  console.log(`Database: check exist ${schema.database}`);
  const existed = await sqlite.isDatabase(schema.database);
  if (!existed.result) {
    console.log(`Database: validate JSON schema`);
    const serializedSchema = JSON.stringify(schema);
    const valid = await sqlite.isJsonValid(serializedSchema);
    if (!valid.result) {
      throw new Error(`Database: invalid JSON schema`);
    }
    console.log(`Database: import JSON schema`);
    const imported = await sqlite.importFromJson(serializedSchema);
    console.log(`Database: imported changes ${imported.changes?.changes}`);
    if (imported.changes?.changes === -1) {
      throw new Error(`Database: failed to import JSON schema`);
    }
  }
}

export async function queryWorkOrders(query: WorkOrdersQuery) {
  function buildStatement() {
    console.log(`queryWorkOrders: buildStatement`);
    const ret = `\
    SELECT * FROM WorkOrders WHERE 1=1
    ${(query.scheduled_ms && `AND scheduled_ms >= ${query.scheduled_ms}`) || ``}
    ${(query.query && `AND description LIKE '%${query.query}%'`) || ``}
    `;
    return ret;
  }
  const db = await sqlite.createConnection(schema.database);
  let items: WorkOrder[];
  await db.open();
  try {
    const statement = buildStatement();
    console.log(`queryWorkOrders: query`);
    const p = await db.query(statement);
    items = p.values as WorkOrder[];
  } catch (e) {
    console.error(e);
    console.error(`queryWorkOrders: failed to query`);
    items = [];
  }
  await sqlite.closeConnection(schema.database);
  return items;
}
