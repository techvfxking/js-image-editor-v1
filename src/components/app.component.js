import Button from "./button.component.js";
import Label from "./label.component.js";
import previewImg from "/img-placeholder.svg";

const createFilterButtons = () => {
    const filterBtnNameArr = ["Brightness", "Saturation", "Inversion", "Grayscale"];
    return filterBtnNameArr
        .map((item) => Button(item, `filter-btn ${item.toLowerCase()}`))
        .join(" ");
};

const createRotateFlipButtons = () => {
    const roateFlipBtnNameArr = [
        `<i class="fa-solid fa-rotate-left"></i>`,
        `<i class="fa-solid fa-rotate-right"></i>`,
        `<i class="bx bx-reflect-vertical"></i>`,
        `<i class="bx bx-reflect-horizontal"></i>`,
    ];
    return roateFlipBtnNameArr
        .map((item, index) => Button(item, `rotate-flip-btn rotate-${index}`))
        .join(" ");
};

const AppRoot = () => {
    const element = `
        <h2>Image Editor V1</h2>
        <section class="wrapper">
            <div class="editor-panel">
                <div class="filter">
                    ${Label("Filters")}
                    <div class="options">
                        ${createFilterButtons()}
                    </div>
                    <div class="slider">
                        <div class="filter-info">
                            <p class="name">Brightness</p>
                            <p class="value">100%</p>
                        </div>
                        <input type="range" value="100" min="0" max="200" aria-label="Adjust filter value" />
                    </div>
                </div>
                <div class="rotate">
                    ${Label("Rotate & Flip")}
                    <div class="options">
                        ${createRotateFlipButtons()}
                    </div>
                </div>
            </div>
            <div class="preview-img">
                <img src="${previewImg}" alt="Image Placeholder" />
            </div>
        </section>
        <section class="controls">
            ${Button("Reset Filters", "reset-filter")}
            <div class="row">
                ${Button("Choose Image", "choose-img")}
                ${Button("Save Image", "save-img")}
            </div>
        </section>
    `;

    return element;
};

export default AppRoot;