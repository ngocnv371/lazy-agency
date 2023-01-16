import {
  CapacitorSQLite,
  SQLiteConnection,
} from "@capacitor-community/sqlite";
import {
  defineCustomElements as jeepSqlite,
  applyPolyfills,
  JSX as LocalJSX,
} from "jeep-sqlite/loader";
import { Capacitor } from "@capacitor/core";
import { HTMLAttributes } from "react";

type StencilToReact<T> = {
  [P in keyof T]?: T[P] &
    Omit<HTMLAttributes<Element>, "className"> & {
      class?: string;
    };
};

declare global {
  export namespace JSX {
    interface IntrinsicElements
      extends StencilToReact<LocalJSX.IntrinsicElements> {}
  }
}

applyPolyfills().then(() => {
  jeepSqlite(window);
});

export async function setupSqlite() {
  console.log("setup sqlite-jeep");
  const platform = Capacitor.getPlatform();
  const sqlite: SQLiteConnection = new SQLiteConnection(CapacitorSQLite);
  try {
    if (platform === "web") {
      const jeepEl = document.createElement("jeep-sqlite");
      document.body.appendChild(jeepEl);
      await customElements.whenDefined("jeep-sqlite");
      await sqlite.initWebStore();
    }
  } catch (err) {
    console.error(`Error: ${err}`);
    throw new Error(`Error: ${err}`);
  }
}
