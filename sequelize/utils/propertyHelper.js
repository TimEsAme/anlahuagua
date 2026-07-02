exports.pick = function (obj, ...props) {
    if (!obj || typeof obj !== 'object' || Array.isArray(obj)) {
        return {};
    }
    const result = {};
    for (const key of props) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            result[key] = obj[key];
        }
    }

    return result;
};