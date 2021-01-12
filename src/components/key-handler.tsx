import { useCallback, useEffect, useState } from "react";
import { AppState } from "../state/AppState";
import { TimeEntry } from "../model/TimeEntry";

export default function KeyHandler(props: { appState: AppState }) {
  const [clipboard, setClipboard] = useState([] as TimeEntry[]);

  const escFunction = useCallback(
    (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === "c" && event.ctrlKey) {
        console.log("Ctrl-C");
        let timeEntries = props.appState.getCurrentEntries().entries;
        setClipboard(timeEntries.slice());
        console.log(timeEntries, clipboard);
      } else if (event.key.toLowerCase() === "v" && event.ctrlKey) {
        console.log("Ctrl-V");
        if (!clipboard) {
          console.log("clipboard is empty");
          return;
        }
        if (props.appState.getCurrentEntries().entries.length) {
          // throw new Error("Overwriting is dangerous");
          console.warn("Overwriting is dangerous");
          return;
        }
        console.log(clipboard);
        props.appState.getCurrentEntries().updateEntries(clipboard.slice());
      } else if (event.key && event.key !== "Control") {
        // console.log(
        //   event.ctrlKey ? "Ctrl" : "",
        //   event.altKey ? "Alt" : "",
        //   event.shiftKey ? "Shift" : "",
        //   event.key
        // );
      }
    },
    [props.appState, props.appState.getCurrentEntries().entries, clipboard]
  );

  useEffect(() => {
    document.addEventListener("keydown", escFunction, false);

    return () => {
      document.removeEventListener("keydown", escFunction, false);
    };
  }, [
    props.appState,
    props.appState.getCurrentEntries().entries,
    clipboard,
    escFunction,
  ]);

  return <></>;
}
