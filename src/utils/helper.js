
//Logger
export const logData = (data, type = "info") => {
    const modifiedData = returnDataWithTimeStamp(data);
    if (type === "info")
        console.log(modifiedData);
    else
        console.error(modifiedData);
}

const returnDataWithTimeStamp = (data) => {
    const timeStamp = new Date().toLocaleString();
    return `${timeStamp}::: ${data}`
}

//Getting the HTML Node element by Id or class name
export const getElement = (identifire = "") => {
    try {
        const element = document.querySelector(identifire);
        if (isNullOrEmpty(element)) {
            throw new Error(`The element we are trying to find for ${identifire}, that is 'Null' or 'Undefined'`)
        }
        return element;
    } catch (error) {
        logData(error, "error");
        throw error;
    }
}

//Checking the element is Null or empty or undefined or the string is blank string
export const isNullOrEmpty = (data) => {
    if (data === undefined || data === null || (typeof (data) === "string" && data.trim() === ""))
        return true;
    else
        return false;
}

//Converting to string
export const convertToString = (value) => {
    try {
        if (value === undefined || value === null)
            return "";
        else if (typeof value === "boolean")
            return String(value);
        else if (typeof value === "bigint" || typeof value === "number")
            return String(value);
        else if (typeof value === "string" && String(value).trim() === "")
            return "";
        else if (typeof value === "string" || typeof value === "symbol")
            return String(value);
        else if (typeof value === "object" || Array.isArray(value))
            return JSON.stringify(value);
        else
            return value;
    } catch (error) {
        logData(`Error converting object to string: ${error}`,"error");
        return value;
    }

}