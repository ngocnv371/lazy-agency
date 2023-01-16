import { Redirect, Route } from "react-router-dom";
import {
  IonApp,
  IonRouterOutlet,
  IonSplitPane,
  setupIonicReact,
} from "@ionic/react";
import { SQLiteHook, useSQLite } from "react-sqlite-hook";
import { IonReactRouter } from "@ionic/react-router";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import Menu from "./features/menu/Menu";
import { WorkOrders } from "./features/work-orders/WorkOrders";
import { useEffect, useState } from "react";
import { init } from "./data/schema";

interface JsonListenerInterface {
  jsonListeners: boolean;
  setJsonListeners: React.Dispatch<React.SetStateAction<boolean>>;
}
interface existingConnInterface {
  existConn: boolean;
  setExistConn: React.Dispatch<React.SetStateAction<boolean>>;
}

// Singleton SQLite Hook
export let sqlite: SQLiteHook;
// Existing Connections Store
export let existingConn: existingConnInterface;
// Is Json Listeners used
export let isJsonListeners: JsonListenerInterface;

setupIonicReact();

const App: React.FC = () => {
  const [existConn, setExistConn] = useState(false);
  existingConn = { existConn: existConn, setExistConn: setExistConn };
  sqlite = useSQLite();
  console.log(`sqlite.isAvailable  ${sqlite.isAvailable}`);

  // init database
  useEffect(() => {
    init();
  }, []);

  return (
    <IonApp>
      <IonReactRouter>
        <IonSplitPane contentId="main">
          <Menu />
          <IonRouterOutlet id="main">
            <Route path="/" exact={true}>
              <Redirect to="/page/active" />
            </Route>
            <Route path="/page/:name" exact={true}>
              <WorkOrders />
            </Route>
          </IonRouterOutlet>
        </IonSplitPane>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
