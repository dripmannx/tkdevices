import React, { PureComponent } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaExternalLinkAlt } from "react-icons/fa";
import InsertLinkOutlinedIcon from "@material-ui/icons/InsertLinkOutlined";

var openInNewTab = (url) => {
  window.open(url, "_blank").focus();
};
export default function Handout() {
  return (
    <div>
      <button
        className="Button"
        onClick={() =>
          openInNewTab(
            "https://stackoverflow.com/questions/4907843/open-a-url-in-a-new-tab-and-not-a-new-window"
          )
        }
      >
        {" "}
        <FaExternalLinkAlt />
        {" "}
         Drück mich
      </button>
    </div>
  );
}
