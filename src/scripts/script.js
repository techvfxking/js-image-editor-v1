import { getAllElements, getElement, isNullOrEmpty, logData } from "../utils/helper";
import addEvent from "./addEventListener";

const mainScript = () => {
    const fileInput = getElement(".file-input");
    const uploadBtn = getElement(".choose-img");
    const previewImg = getElement(".preview-img img");
    const filterOptions = getAllElements(".filter button");
    const filterName = getElement(".filter-info .name");
    const filterValue = getElement(".filter-info .value");
    const filterSliderInput = getElement(".slider input");

    addEvent("click", uploadBtn, (event) => {
        btnClick(event, fileInput);
    });

    addEvent("change", fileInput, (event) => {
        loadImage(event, fileInput, previewImg);
    });

    for (const [index, node] of filterOptions.entries()) {
        addEvent("click", node, (event) => {
            const activeElement = getElement(".filter .active", true);

            if (!isNullOrEmpty(activeElement))
                activeElement.classList.remove("active");

            node.classList.add("active");

            filterName.innerText = node.innerText;
        });
    }

    addEvent("input", filterSliderInput, (event) => {
        updateFilterValue(event, filterSliderInput, filterValue);
    })
}

const btnClick = (event, fileInput = Element) => {
    fileInput.click();
}

const loadImage = (event, fileInput = Element, previewImg = Element) => {
    let file = fileInput.files[0];
    if (isNullOrEmpty(file))
        return;

    previewImg.src = URL.createObjectURL(file);
    addEvent("load", previewImg, onAfterLoadImage)
}

const onAfterLoadImage = (event) => {
    const container = getElement(".container");
    const staus = container.classList.contains("disable");
    if (staus)
        container.classList.remove("disable");
}

const updateFilterValue = (event, filterSliderInput = Element, filterValue = Element) => {
    let value = filterSliderInput.value;
    filterValue.innerText = `${value}%`;
}

export default mainScript;