import { useState, useLayoutEffect } from "react";

export default function useWindowWidth() {
  const [deviceWidth, setDeviceWidth] = useState("mobile");
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useLayoutEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);

      if (window.innerWidth > 1024) {
        setDeviceWidth("desktop");
      } else if (window.innerWidth > 768) {
        setDeviceWidth("tablet");
      } else {
        setDeviceWidth("mobile");
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [windowWidth]);

  return {
    isDesktop: deviceWidth === "desktop",
    isTablet: deviceWidth === "tablet",
    isMobile: deviceWidth === "mobile",
    windowWidth,
  };
}
