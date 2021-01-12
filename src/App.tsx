import React from "react";
import "./App.css";
import { DayTable } from "./components/DayTable";
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import { GlobalContext } from "./state/GlobalContext";
import { AppState } from "./state/AppState";
import { Header } from "./components/Header";
import moment from "moment";
import { DayTimeline } from "./components/DayTimeline";
import { WeekTotal } from "./components/WeekTotal";
import { MonthTotal } from "./components/MonthTotal";
import KeyHandler from "./components/key-handler";
import { Col, Row } from "react-bootstrap";
import KeyNav from "./components/key-nav";

export const history = createBrowserHistory();
const appState = new AppState();
export var DateContext = React.createContext(new Date());

export class App extends React.Component<any, any> {
  // static contextType = GlobalContext;
  // @ts-ignore
  // context: AppState;
  context: undefined;

  state: {
    appState: AppState;
    hash: string;
  } = {
    appState,
    hash: appState.hash(),
  };

  componentDidMount(): void {
    // this.context.subscribe(this.forceUpdate.bind(this));
    this.state.appState.subscribe(() =>
      this.setState({
        hash: appState.hash(),
      })
    );
  }

  render() {
    const date = this.state.appState.date;
    console.log("DateContext.Consumer", date);
    return (
      <Router history={history}>
        <Header
          date={moment(date)}
          day={appState.getDay(date)}
          setDate={appState.setDate.bind(appState)}
        />
        <main role="main" className="container-fluid">
          <div className="h-100">
            <DayTimeline
              date={date}
              setDate={appState.setDate.bind(appState)}
            />
            <GlobalContext.Provider value={appState}>
              <DayTable date={date} day={appState.getDay(date)} />
              <div
                className="d-flex justify-content-between"
                style={{
                  gap: 12,
                }}
              >
                <WeekTotal date={date} />
                <MonthTotal date={date} />
              </div>
            </GlobalContext.Provider>
          </div>
        </main>
        <KeyHandler appState={this.state.appState} />
        <KeyNav appState={this.state.appState} />
        <footer className="container-fluid mt-3 pt-2 border-top">
          <div className="inner">
            <div>
              &copy; 2021 <a href="https://github.com/spidgorny/">Slawa</a>
            </div>
            <Row>
              <Col>
                <kbd>Ins</kbd>: new line, <kbd>Ctrl-Enter</kbd>: save,{" "}
                <kbd>Ctrl-Backspace</kbd>: remove
              </Col>
              <Col>
                <kbd>Ctrl-C</kbd>, <kbd>Ctrl-V</kbd>: clipboard
              </Col>
            </Row>
          </div>
        </footer>
      </Router>
    );
  }
}

export default App;
