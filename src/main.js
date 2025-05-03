import './style.css';
import { getElement } from './utils/helper.js';
import AppRoot from './components/app.component.js';

const main = () => {
    const app = getElement("#app");
    app.innerHTML = AppRoot();
}

main();