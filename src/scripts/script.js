import { getElement, logData } from "../utils/helper";
import addEvent from "./addEventListener";

const mainScript = () => {
    const fileInput = getElement(".file-input");
    const uploadBtn = getElement(".choose-img");

    addEvent("click", uploadBtn, (event) => {
        btnClick(event, fileInput);
    });
}

const btnClick = (event, fileInput = Element) => {
    fileInput.click();
}

export default mainScript;