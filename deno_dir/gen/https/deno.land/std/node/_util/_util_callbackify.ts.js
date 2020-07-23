class NodeFalsyValueRejectionError extends Error {
    constructor(reason) {
        super("Promise was rejected with falsy value");
        this.code = "ERR_FALSY_VALUE_REJECTION";
        this.reason = reason;
    }
}
class NodeInvalidArgTypeError extends TypeError {
    constructor(argumentName) {
        super(`The ${argumentName} argument must be of type function.`);
        this.code = "ERR_INVALID_ARG_TYPE";
    }
}
function callbackify(original) {
    if (typeof original !== "function") {
        throw new NodeInvalidArgTypeError('"original"');
    }
    const callbackified = function (...args) {
        const maybeCb = args.pop();
        if (typeof maybeCb !== "function") {
            throw new NodeInvalidArgTypeError("last");
        }
        const cb = (...args) => {
            maybeCb.apply(this, args);
        };
        original.apply(this, args).then((ret) => {
            queueMicrotask(cb.bind(this, null, ret));
        }, (rej) => {
            rej = rej || new NodeFalsyValueRejectionError(rej);
            queueMicrotask(cb.bind(this, rej));
        });
    };
    const descriptors = Object.getOwnPropertyDescriptors(original);
    if (typeof descriptors.length.value === "number") {
        descriptors.length.value++;
    }
    if (typeof descriptors.name.value === "string") {
        descriptors.name.value += "Callbackified";
    }
    Object.defineProperties(callbackified, descriptors);
    return callbackified;
}
export { callbackify };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiX3V0aWxfY2FsbGJhY2tpZnkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJfdXRpbF9jYWxsYmFja2lmeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUF3QkEsTUFBTSw0QkFBNkIsU0FBUSxLQUFLO0lBRzlDLFlBQVksTUFBZTtRQUN6QixLQUFLLENBQUMsdUNBQXVDLENBQUMsQ0FBQztRQUYxQyxTQUFJLEdBQUcsMkJBQTJCLENBQUM7UUFHeEMsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7SUFDdkIsQ0FBQztDQUNGO0FBQ0QsTUFBTSx1QkFBd0IsU0FBUSxTQUFTO0lBRTdDLFlBQVksWUFBb0I7UUFDOUIsS0FBSyxDQUFDLE9BQU8sWUFBWSxxQ0FBcUMsQ0FBQyxDQUFDO1FBRjNELFNBQUksR0FBRyxzQkFBc0IsQ0FBQztJQUdyQyxDQUFDO0NBQ0Y7QUFrREQsU0FBUyxXQUFXLENBQUMsUUFBYTtJQUNoQyxJQUFJLE9BQU8sUUFBUSxLQUFLLFVBQVUsRUFBRTtRQUNsQyxNQUFNLElBQUksdUJBQXVCLENBQUMsWUFBWSxDQUFDLENBQUM7S0FDakQ7SUFFRCxNQUFNLGFBQWEsR0FBRyxVQUF5QixHQUFHLElBQWU7UUFDL0QsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQzNCLElBQUksT0FBTyxPQUFPLEtBQUssVUFBVSxFQUFFO1lBQ2pDLE1BQU0sSUFBSSx1QkFBdUIsQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUMzQztRQUNELE1BQU0sRUFBRSxHQUFHLENBQUMsR0FBRyxJQUFlLEVBQVEsRUFBRTtZQUN0QyxPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUM1QixDQUFDLENBQUM7UUFDRixRQUFRLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQzdCLENBQUMsR0FBWSxFQUFFLEVBQUU7WUFDZixjQUFjLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDM0MsQ0FBQyxFQUNELENBQUMsR0FBWSxFQUFFLEVBQUU7WUFDZixHQUFHLEdBQUcsR0FBRyxJQUFJLElBQUksNEJBQTRCLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDbkQsY0FBYyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDckMsQ0FBQyxDQUNGLENBQUM7SUFDSixDQUFDLENBQUM7SUFFRixNQUFNLFdBQVcsR0FBRyxNQUFNLENBQUMseUJBQXlCLENBQUMsUUFBUSxDQUFDLENBQUM7SUFHL0QsSUFBSSxPQUFPLFdBQVcsQ0FBQyxNQUFNLENBQUMsS0FBSyxLQUFLLFFBQVEsRUFBRTtRQUNoRCxXQUFXLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDO0tBQzVCO0lBQ0QsSUFBSSxPQUFPLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxLQUFLLFFBQVEsRUFBRTtRQUM5QyxXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUssSUFBSSxlQUFlLENBQUM7S0FDM0M7SUFDRCxNQUFNLENBQUMsZ0JBQWdCLENBQUMsYUFBYSxFQUFFLFdBQVcsQ0FBQyxDQUFDO0lBQ3BELE9BQU8sYUFBYSxDQUFDO0FBQ3ZCLENBQUM7QUFFRCxPQUFPLEVBQUUsV0FBVyxFQUFFLENBQUMifQ==