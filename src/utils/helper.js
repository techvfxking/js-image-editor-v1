export const logData = (data, type = 'info') => {
    const modifiedData = retunrDataWithTimestamp(data);
    if (type === 'info') {
        console.log(modifiedData);
    }
    else {
        console.error(modifiedData);

    }
}
const retunrDataWithTimestamp = (data) => {
    const timestamp = new Date().toLocaleString();
    return `${timestamp} ::: ${data}`;

}
export const getElement = (identifire = "") => {
    try {
        const element = document.querySelector(identifire);
        if (isNullEmpty(element)) {
            throw new error(`element we are trying to for ${identifire},that is null or undefined`);
        }
        return element;
    }
    catch {
        logData(error);
        return error;
    }
}
export const isNullEmpty = (data) => {
    if (data === undefined || data === null || (typeof (data) == 'string' && data.trim === '')) {
        return true
    }
    else {
        return false;
    }
}
export const convertToString = (value) => {
    try {

    }
    catch (error) {
        
    }

}