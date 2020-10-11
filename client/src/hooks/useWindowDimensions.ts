import { useState, useEffect } from "react";

function getWindowDimensions() {
  const { innerWidth: width } = window;
  return width;
}

export default function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );
  const isMobile = windowDimensions < 992;

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  function handleResize() {
    setWindowDimensions(getWindowDimensions());
  }

  return { isMobile };
}
