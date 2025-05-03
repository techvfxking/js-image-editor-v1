
//Logger
export const logData = (data, type = "info") => {
    const modifiedData = returnDataWithTimeStamp(data);
    if (type === "info")
        console.log(modifiedData);
    else
        console.error(modifiedData);
}

const returnDataWithTimeStamp = (data) => {
    const timeStamp = new Date();
    const formatString = "yyyy-MM-dd hh:mm:ss:zz tt";
    const formatttedDate = formatDate(timeStamp,formatString);
    return `${formatttedDate}::: ${data}`
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

//Returning a string with desired formatted date
export const formatDate = (date, format = "") => {
    const dateObj = new Date(date);

    const pad = (num = 0) => num.toString().padStart(2, '0');

    const date_ = dateObj.getDate();
    const dateDouble_ = pad(date_);

    const month_ = dateObj.getMonth() + 1;
    const monthDouble_ = pad(month_);

    const year_ = dateObj.getFullYear().toString();

    const hours_ = dateObj.getHours();
    const smallHours_ = pad(hours_ % 12 === 0 ? 12 : hours_ % 12);
    const largeHours_ = pad(hours_);
    const isAM = hours_ < 12;

    const minutes_ = pad(dateObj.getMinutes());
    const seconds_ = pad(dateObj.getSeconds());
    const milliSeconds_ = pad(dateObj.getMilliseconds());
    
    const tt_ = isAM ? "AM" : "PM";

    const monthStrings = {
        "01": "Jan",
        "02": "Feb",
        "03": "Mar",
        "04": "Apr",
        "05": "May",
        "06": "Jun",
        "07": "Jul",
        "08": "Aug",
        "09": "Sep",
        "10": "Oct",
        "11": "Nov",
        "12": "Dec"
    };

    const map = {
        "yyyy": year_,
        "MMM": monthStrings[monthDouble_],

        "dd": dateDouble_,
        "DD": dateDouble_,
        "d": date_,
        "D": date_,

        "MM": monthDouble_,
        "M": month_,

        "hh": smallHours_,
        "HH": largeHours_,

        "mm": minutes_,
        "ss": seconds_,
        "zz": milliSeconds_,
        "tt": tt_,
    };

    // Sort the keys by length in descending order
    const sortedKeys = Object.keys(map).sort((a, b) => b.length - a.length);
    const pattern = new RegExp(sortedKeys.join("|"), "g");

    format = format.replace(pattern, match => map[match]);

    return format;
};
