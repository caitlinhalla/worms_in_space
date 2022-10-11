import "../css/app.css";
import React from "react";
import ReactDom from "react-dom";
import WormsInSpace from "./WormsInSpace";

document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("WormsInSpace")
    if (!container) return;
    ReactDom.render(<WormsInSpace />, container);
}
)