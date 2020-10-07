import React, { useEffect } from "react";
import { useLocation, withRouter } from "react-router-dom";

function ScrollToTop() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
}

export default withRouter(ScrollToTop);
