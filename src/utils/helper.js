import { useRef, useEffect, useState } from "react";

export const capitalize_Words = (str) => {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
};

export const useOuterClick = (callback) => {
  const innerRef = useRef();
  const callbackRef = useRef();

  // set current callback in ref, before second useEffect uses it
  useEffect(() => {
    // useEffect wrapper to be safe for concurrent mode
    callbackRef.current = callback;
  });

  useEffect(() => {
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);

    // read most recent callback and innerRef dom node from refs
    function handleClick(e) {
      if (
        innerRef.current &&
        callbackRef.current &&
        !innerRef.current.contains(e.target)
      ) {
        callbackRef.current(e);
      }
    }
  }, []); // no need for callback + innerRef dep

  return innerRef; // return ref; client can omit `useRef`
};

export const useEvents = () => {
  const [start, setStart] = useState(false);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    document.addEventListener("started", () => {
      setStart(localStorage.s);
    });
  }, []);

  useEffect(() => {
    document.addEventListener("completed", () => {
      setCompleted(localStorage.c);
    });
  }, []);

  useEffect(() => {
    window.addEventListener("load", () => {
      setStart(localStorage.s);
      setCompleted(localStorage.c);
    });
  }, []);

  return {
    start,
    completed,
  };
};
