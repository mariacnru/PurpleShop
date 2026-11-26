import { useLocation } from "react-router";
import CopyUrl from "./CopyUrl";
import FocusOnComments from "./FocusOnComments";
import { useEffect } from "react";

const UsefulButtons = () => {
  const location = useLocation();

  useEffect(() => {
    const hash = location.hash;

    if (hash) {
      const elem = document.querySelector(hash);
      elem.scrollIntoView({
        behavior: "smooth",
      });
    }
  }, [location]);

  return (
    <div className="flex-ic gap-3">
      <CopyUrl />
      <FocusOnComments />
    </div>
  );
};

export default UsefulButtons;
