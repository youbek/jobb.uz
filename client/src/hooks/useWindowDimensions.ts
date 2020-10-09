import { useState, useEffect } from "react";

function getWindowDimensions() {
  const { innerWidth: width } = window;
  return width;
}

export default function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );
  const isTablet = windowDimensions < 992;
  const isMobile = windowDimensions < 767;

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  function handleResize() {
    setWindowDimensions(getWindowDimensions());
  }

  return { isTablet, isMobile };
}
