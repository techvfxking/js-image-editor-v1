import './style.css';
import { getElement } from './utils/helper.js';
import AppComponent,{} from './components/app-component.js'
const main = () => {
    const app = getElement('#app');
    app.innerHTML = AppComponent();
}

main();