const Utils = {
    isObject: (object) => {
        return object != null && typeof object === "object";
    },

    // Check object empty
    isObjectEmpty: (obj) => {
        return (
            Utils.isObjectNull(obj) ||
            (Object.keys(obj).length === 0 && obj.constructor === Object)
        );
    },

    // Check object null|undefined
    isObjectNull: (obj) => {
        return (
            obj === null ||
            obj === undefined ||
            obj === "NULL" ||
            obj === "null"
        );
    },
    shallowObjectEqual: (object1, object2) => {
        const keys1 = Object.keys(object1);
        const keys2 = Object.keys(object2);

        if (keys1.length !== keys2.length) {
            return false;
        }

        for (let key of keys1) {
            if (object1[key] !== object2[key]) {
                return false;
            }
        }

        return true;
    },
};

export default Utils;
