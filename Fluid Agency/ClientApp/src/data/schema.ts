import { sqlite } from "../App";
import { WorkOrder, WorkOrderStatus } from "../models/WorkOrder";
import { WorkOrdersQuery } from "../models/WorkOrdersQuery";

const schema = {
  database: "WorkOrders",
  version: 1,
  encrypted: false,
  mode: "full",
  tables: [
    {
      name: "Users",
      schema: [
        { column: "id", value: "INTEGER PRIMARY KEY NOT NULL" },
        { column: "email", value: "TEXT UNIQUE NOT NULL" },
        { column: "name", value: "TEXT" },
        { column: "token", value: "TEXT" },
      ],
      indexes: [
        { name: "index_user_on_name", value: "name" },
        { name: "index_user_on_email_name", value: "email ASC, name", mode: "UNIQUE" }
      ],
      values: [
        [1, "bench@press.com", "Bench", "fake key - aes256"],
      ]
    },
    {
      name: "WorkOrders",
      schema: [
        { column: "id", value: "INTEGER PRIMARY KEY NOT NULL" },
        { column: "address", value: "TEXT NOT NULL" },
        { column: "service", value: "TEXT NOT NULL" },
        { column: "description", value: "TEXT NOT NULL" },
        { column: "status", value: "INTEGER NOT NULL" },
        { column: "scheduled_ms", value: "INTEGER NOT NULL" },
        { column: "modified_ms", value: "INTEGER NOT NULL" },
      ],
      indexes: [
        { name: "index_WorkOrders_status", value: "status" },
        { name: "index_WorkOrders_modified", value: "modified_ms DESC" },
        { name: "index_WorkOrders_scheduled", value: "scheduled_ms DESC" },
      ],
      values: [
        [1, "123 Fake St", "Pipe", "Rebuild the pipe network", 0, 1674226884732, 1674226084732],
        [2, "3 Ben St", "Floor", "Redo the tiling", 0, 1674226584732, 1674226084732],
        [3, "32 Ash St", "Wall", "Break the wall", 0, 1674226834732, 1674226084732],
        [4, "33 Gext St", "Pipe", "Cut open the pipes", 0, 1674216884732, 1674226084732],
        [5, "3 Fake St", "Pump", "Get a new pump", 0, 1674224884732, 1674226084732],
      ]
    },
  ]
}

type DatabaseSchema = typeof schema;
type TableSchema = typeof schema.tables[0];

let isInitating = false;
export async function initDatabase() {
  if (isInitating) {
    console.error(`Database: is still initializing`);
    return;
  }
  isInitating = true;
  const existed = await sqlite.isDatabase(schema.database);
  if (!existed.result) {
    console.log(`Database: check exist ${schema.database}`);
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
    isInitating = false;
  }
}

export async function saveWorkOrders(items: WorkOrder[]) {
  async function saveOne(wo: WorkOrder) {
    function buildStatement() {
      console.log(`saveWorkOrders: saveOne buildStatement`);
      const ret = `\
      UPDATE WorkOrders 
      SET
        ${1}
      WHERE id = ${wo.id}
      `;
      return ret;
    }
  }
}

export async function queryWorkOrders(query: WorkOrdersQuery) {
  console.count('query WorkOrders')
  const db = await sqlite.createConnection(schema.database);
  function execute() {
    console.log(`queryWorkOrders: buildStatement`);
    return db.query(`
    SELECT * 
    FROM WorkOrders
    WHERE 1=1
      AND scheduled_ms >= ?
      AND description like ?
    `, [query.scheduled_ms, `%${query.query}%`])
  }
  let items: WorkOrder[];
  await db.open();
  try {
    console.log(`queryWorkOrders: query`);
    const p = await execute();
    console.info(`queryWorkOrders: found ${p.values?.length} items`)
    items = p.values as WorkOrder[];
  } catch (e) {
    console.error(e);
    console.error(`queryWorkOrders: failed to query`);
    items = [];
  }
  await sqlite.closeConnection(schema.database);
  return items;
}
