const kCustomPromisifiedSymbol = Symbol.for("nodejs.util.promisify.custom");
const kCustomPromisifyArgsSymbol = Symbol.for("nodejs.util.promisify.customArgs");
class NodeInvalidArgTypeError extends TypeError {
    constructor(argumentName, type, received) {
        super(`The "${argumentName}" argument must be of type ${type}. Received ${typeof received}`);
        this.code = "ERR_INVALID_ARG_TYPE";
    }
}
export function promisify(original) {
    if (typeof original !== "function") {
        throw new NodeInvalidArgTypeError("original", "Function", original);
    }
    if (original[kCustomPromisifiedSymbol]) {
        const fn = original[kCustomPromisifiedSymbol];
        if (typeof fn !== "function") {
            throw new NodeInvalidArgTypeError("util.promisify.custom", "Function", fn);
        }
        return Object.defineProperty(fn, kCustomPromisifiedSymbol, {
            value: fn,
            enumerable: false,
            writable: false,
            configurable: true,
        });
    }
    const argumentNames = original[kCustomPromisifyArgsSymbol];
    function fn(...args) {
        return new Promise((resolve, reject) => {
            original.call(this, ...args, (err, ...values) => {
                if (err) {
                    return reject(err);
                }
                if (argumentNames !== undefined && values.length > 1) {
                    const obj = {};
                    for (let i = 0; i < argumentNames.length; i++) {
                        obj[argumentNames[i]] = values[i];
                    }
                    resolve(obj);
                }
                else {
                    resolve(values[0]);
                }
            });
        });
    }
    Object.setPrototypeOf(fn, Object.getPrototypeOf(original));
    Object.defineProperty(fn, kCustomPromisifiedSymbol, {
        value: fn,
        enumerable: false,
        writable: false,
        configurable: true,
    });
    return Object.defineProperties(fn, Object.getOwnPropertyDescriptors(original));
}
promisify.custom = kCustomPromisifiedSymbol;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiX3V0aWxfcHJvbWlzaWZ5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiX3V0aWxfcHJvbWlzaWZ5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQTBDQSxNQUFNLHdCQUF3QixHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsOEJBQThCLENBQUMsQ0FBQztBQUc1RSxNQUFNLDBCQUEwQixHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQzNDLGtDQUFrQyxDQUNuQyxDQUFDO0FBRUYsTUFBTSx1QkFBd0IsU0FBUSxTQUFTO0lBRTdDLFlBQVksWUFBb0IsRUFBRSxJQUFZLEVBQUUsUUFBaUI7UUFDL0QsS0FBSyxDQUNILFFBQVEsWUFBWSw4QkFBOEIsSUFBSSxjQUFjLE9BQU8sUUFBUSxFQUFFLENBQ3RGLENBQUM7UUFKRyxTQUFJLEdBQUcsc0JBQXNCLENBQUM7SUFLckMsQ0FBQztDQUNGO0FBRUQsTUFBTSxVQUFVLFNBQVMsQ0FBQyxRQUFrQjtJQUMxQyxJQUFJLE9BQU8sUUFBUSxLQUFLLFVBQVUsRUFBRTtRQUNsQyxNQUFNLElBQUksdUJBQXVCLENBQUMsVUFBVSxFQUFFLFVBQVUsRUFBRSxRQUFRLENBQUMsQ0FBQztLQUNyRTtJQUdELElBQUksUUFBUSxDQUFDLHdCQUF3QixDQUFDLEVBQUU7UUFFdEMsTUFBTSxFQUFFLEdBQUcsUUFBUSxDQUFDLHdCQUF3QixDQUFDLENBQUM7UUFDOUMsSUFBSSxPQUFPLEVBQUUsS0FBSyxVQUFVLEVBQUU7WUFDNUIsTUFBTSxJQUFJLHVCQUF1QixDQUMvQix1QkFBdUIsRUFDdkIsVUFBVSxFQUNWLEVBQUUsQ0FDSCxDQUFDO1NBQ0g7UUFDRCxPQUFPLE1BQU0sQ0FBQyxjQUFjLENBQUMsRUFBRSxFQUFFLHdCQUF3QixFQUFFO1lBQ3pELEtBQUssRUFBRSxFQUFFO1lBQ1QsVUFBVSxFQUFFLEtBQUs7WUFDakIsUUFBUSxFQUFFLEtBQUs7WUFDZixZQUFZLEVBQUUsSUFBSTtTQUNuQixDQUFDLENBQUM7S0FDSjtJQUtELE1BQU0sYUFBYSxHQUFHLFFBQVEsQ0FBQywwQkFBMEIsQ0FBQyxDQUFDO0lBRTNELFNBQVMsRUFBRSxDQUFDLEdBQUcsSUFBZTtRQUM1QixPQUFPLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1lBRXJDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLEdBQUcsSUFBSSxFQUFFLENBQUMsR0FBVSxFQUFFLEdBQUcsTUFBaUIsRUFBRSxFQUFFO2dCQUNoRSxJQUFJLEdBQUcsRUFBRTtvQkFDUCxPQUFPLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztpQkFDcEI7Z0JBQ0QsSUFBSSxhQUFhLEtBQUssU0FBUyxJQUFJLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO29CQUNwRCxNQUFNLEdBQUcsR0FBRyxFQUFFLENBQUM7b0JBQ2YsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLGFBQWEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7d0JBRTdDLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7cUJBQ25DO29CQUNELE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztpQkFDZDtxQkFBTTtvQkFDTCxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7aUJBQ3BCO1lBQ0gsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxNQUFNLENBQUMsY0FBYyxDQUFDLEVBQUUsRUFBRSxNQUFNLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7SUFFM0QsTUFBTSxDQUFDLGNBQWMsQ0FBQyxFQUFFLEVBQUUsd0JBQXdCLEVBQUU7UUFDbEQsS0FBSyxFQUFFLEVBQUU7UUFDVCxVQUFVLEVBQUUsS0FBSztRQUNqQixRQUFRLEVBQUUsS0FBSztRQUNmLFlBQVksRUFBRSxJQUFJO0tBQ25CLENBQUMsQ0FBQztJQUNILE9BQU8sTUFBTSxDQUFDLGdCQUFnQixDQUM1QixFQUFFLEVBQ0YsTUFBTSxDQUFDLHlCQUF5QixDQUFDLFFBQVEsQ0FBQyxDQUMzQyxDQUFDO0FBQ0osQ0FBQztBQUVELFNBQVMsQ0FBQyxNQUFNLEdBQUcsd0JBQXdCLENBQUMifQ==