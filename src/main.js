import './style.css';
import { getElement } from './utils/helper.js';
import AppRoot from './components/app.component.js';
import mainScript from './scripts/script.js';

const main = () => {
    const app = getElement("#app");
    app.innerHTML = AppRoot();
    mainScript();
}

main();