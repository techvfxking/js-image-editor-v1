import { getElement, isNullOrEmpty, logData } from "../utils/helper";
import addEvent from "./addEventListener";

const mainScript = () => {
    const fileInput = getElement(".file-input");
    const uploadBtn = getElement(".choose-img");
    const previewImg = getElement(".preview-img img");

    addEvent("click", uploadBtn, (event) => {
        btnClick(event, fileInput);
    });

    addEvent("change", fileInput, (event) => {
        loadImage(event, fileInput, previewImg);
    });
}

const btnClick = (event, fileInput = Element) => {
    fileInput.click();
}

const loadImage = (event, fileInput = Element, previewImg = Element) => {
    let file = fileInput.files[0];
    if(isNullOrEmpty(file))
        return;

    previewImg.src = URL.createObjectURL(file);
}

export default mainScript;