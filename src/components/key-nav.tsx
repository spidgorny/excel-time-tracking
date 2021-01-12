import { useCallback, useEffect } from "react";
import { AppState } from "../state/AppState";

export default function KeyNav(props: { appState: AppState }) {
  const escFunction = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft" && event.ctrlKey) {
        console.log("Ctrl-Left");
        props.appState.decDate();
      } else if (event.key === "ArrowRight" && event.ctrlKey) {
        props.appState.incDate();
      } else if (event.key && event.key !== "Control") {
        // console.log(
        //   event.ctrlKey ? "Ctrl" : "",
        //   event.altKey ? "Alt" : "",
        //   event.shiftKey ? "Shift" : "",
        //   event.key
        // );
      }
    },
    [props.appState]
  );

  useEffect(() => {
    document.addEventListener("keydown", escFunction, false);

    return () => {
      document.removeEventListener("keydown", escFunction, false);
    };
  }, [props.appState, escFunction]);

  return <></>;
}
