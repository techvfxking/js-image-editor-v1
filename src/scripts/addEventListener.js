const addEvent = (eventName="", element = Element, callbackFunction = (event) => {}) => {
    element.addEventListener(eventName, callbackFunction);
}

export default addEvent;