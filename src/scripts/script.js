import { getAllElements, getElement, isNullOrEmpty, logData } from "../utils/helper";
import addEvent from "./addEventListener";

let _brightness = 100, _saturation = 100, _inversion = 0, _grayscale = 0;
let _rotate = 0, _flipHorizontal = 1, _flipVertical = 1;

const mainScript = () => {
    const fileInput = getElement(".file-input");
    const uploadBtn = getElement(".choose-img");
    const saveBtn = getElement(".save-img");
    const { imageArea, imageElement } = getImageAreaAndElement();
    const filterOptions = getAllElements(".filter button");
    const rotateOptions = getAllElements(".rotate button");
    const filterName = getElement(".filter-info .name");
    const filterValue = getElement(".filter-info .value");
    const filterSliderInput = getElement(".slider input");
    const resetFilterBtn = getElement(".reset-filter");

    addEvent("click", uploadBtn, (event) => {
        btnClick(event, fileInput);
    });

    addEvent("click", imageArea, (event) => {
        btnClick(event, fileInput);
    })

    addEvent("change", fileInput, (event) => {
        loadImage(event, fileInput, imageElement);
    });

    for (const [index, node] of filterOptions.entries()) {
        addEvent("click", node, (event) => {
            const activeElement = getActiveButtonElement();

            if (!isNullOrEmpty(activeElement))
                activeElement.classList.remove("active");

            node.classList.add("active");

            filterName.innerText = node.innerText;

            if (node.classList.contains("brightness")) {
                filterSliderInput.max = "200";
                filterSliderInput.value = _brightness;
                filterValue.innerText = `${_brightness}%`;
            }
            else if (node.classList.contains("saturation")) {
                filterSliderInput.max = "200";
                filterSliderInput.value = _saturation;
                filterValue.innerText = `${_saturation}%`;
            }
            else if (node.classList.contains("inversion")) {
                filterSliderInput.max = "100";
                filterSliderInput.value = _inversion;
                filterValue.innerText = `${_inversion}%`;
            }
            else if (node.classList.contains("grayscale")) {
                filterSliderInput.max = "100";
                filterSliderInput.value = _grayscale;
                filterValue.innerText = `${_grayscale}%`;
            }
        });
    }

    for (const [index, node] of rotateOptions.entries()) {
        addEvent("click", node, (event) => {
            if (node.classList.contains("left")) {
                if (_rotate === -270)
                    _rotate = 0;
                else
                    _rotate -= 90;
            } else if (node.classList.contains("right")) {
                if (_rotate === 270)
                    _rotate = 0;
                else
                    _rotate += 90;
            } else if (node.classList.contains("vertical")) {
                _flipHorizontal = _flipHorizontal === 1 ? -1 : 1
            } else if (node.classList.contains("horizontal")) {
                _flipVertical = _flipVertical === 1 ? -1 : 1
            }

            applyFilter();
        })
    }

    addEvent("input", filterSliderInput, (event) => {
        updateFilterValue(event, filterSliderInput, filterValue);
    });

    addEvent("click", resetFilterBtn, (event) => {
        resetFilterBtnClick(event, filterOptions);
    });

    addEvent("click", saveBtn, (event) => {
        saveImageProcess(event);
    })
}

const getImageAreaAndElement = () => {
    const imageArea = getElement(".preview-img");
    const imageElement = getElement(".preview-img img");

    return { imageArea, imageElement }
}

const btnClick = (event = Event, fileInput = Element) => {
    fileInput.click();
}

const loadImage = (event = Event, fileInput = Element, previewImg = Element) => {
    let file = fileInput.files[0];
    if (isNullOrEmpty(file))
        return;

    _brightness = 100; _saturation = 100; _inversion = 0; _grayscale = 0;
    _rotate = 0; _flipHorizontal = 1; _flipVertical = 1;
    const filterOptions = getAllElements(".filter button");
    if (filterOptions && filterOptions.length > 0) {
        filterOptions[0].click();
    }
    applyFilter();

    previewImg.src = URL.createObjectURL(file);
    addEvent("load", previewImg, onAfterLoadImage)
}

const onAfterLoadImage = (event = Event) => {
    const container = getElement(".container");
    const staus = container.classList.contains("disable");
    if (staus)
        container.classList.remove("disable");
    const { imageArea } = getImageAreaAndElement();
    imageArea.removeEventListener("click", btnClick, true);
}

const updateFilterValue = (event = Event, filterSliderInput = Element, filterValue = Element) => {
    const activeElement = getActiveButtonElement();

    if (isNullOrEmpty(activeElement)) {
        alert("No active button element found");
        return;
    }

    let value = Number(filterSliderInput.value);
    filterValue.innerText = `${value}%`;

    if (activeElement.classList.contains("brightness")) {
        _brightness = value;
    }
    else if (activeElement.classList.contains("saturation")) {
        _saturation = value;
    }
    else if (activeElement.classList.contains("inversion")) {
        _inversion = value;
    }
    else if (activeElement.classList.contains("grayscale")) {
        _grayscale = value;
    }

    applyFilter();
}

const getActiveButtonElement = () => {
    return getElement(".filter .active", true);
}

const applyFilter = () => {
    const { imageElement } = getImageAreaAndElement();
    imageElement.style.filter = `brightness(${_brightness}%) saturate(${_saturation}%) invert(${_inversion}%) grayscale(${_grayscale}%)`;
    imageElement.style.transform = `rotate(${_rotate}deg) scale(${_flipHorizontal}, ${_flipVertical})`;
}

const resetFilterBtnClick = (event = Event, filterOptions) => {

    _brightness = 100; _saturation = 100; _inversion = 0; _grayscale = 0;

    _rotate = 0; _flipHorizontal = 1; _flipVertical = 1;

    filterOptions[0].click();
    applyFilter();

}

const saveImageProcess = (event = Event) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const { imageElement } = getImageAreaAndElement();

    const angle = ((_rotate % 360) + 360) % 360;
    const rad = angle * Math.PI / 180;

    let drawWidth = imageElement.naturalWidth;
    let drawHeight = imageElement.naturalHeight;
    if (angle === 90 || angle === 270) {
        canvas.width = drawHeight;
        canvas.height = drawWidth;
    } else {
        canvas.width = drawWidth;
        canvas.height = drawHeight;
    }

    ctx.filter = imageElement.style.filter;

    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate(rad);
    ctx.scale(_flipHorizontal, _flipVertical);
    if (angle === 90) {
        ctx.drawImage(
            imageElement,
            -drawWidth / 2,
            -drawHeight / 2,
            drawWidth,
            drawHeight
        );
    } else if (angle === 270) {
        ctx.drawImage(
            imageElement,
            -drawWidth / 2,
            -drawHeight / 2,
            drawWidth,
            drawHeight
        );
    } else {
        ctx.drawImage(
            imageElement,
            -drawWidth / 2,
            -drawHeight / 2,
            drawWidth,
            drawHeight
        );
    }
    ctx.restore();

    const link = document.createElement("a");
    link.download = `${new Date().getTime()}.jpg`;
    link.href = canvas.toDataURL();
    link.click();
}


export default mainScript;