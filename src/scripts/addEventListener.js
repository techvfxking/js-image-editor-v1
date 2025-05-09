const addEvent = (eventName="", element = Element, callbackFunction = (event) => {}) => {
    element.addEventListener(eventName, (event) => {
        callbackFunction(event);
    });
}

export default addEvent;