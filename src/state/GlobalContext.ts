import React from "react";
import {AppState} from "./AppState";

export var GlobalContext = React.createContext(new AppState());