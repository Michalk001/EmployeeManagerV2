const fallbackGlobalObject = {};

/**
 * Safely get global scope object
 *
 * @returns Global scope object
 */
export function getGlobalObject<T>(): T {
    return (isNodeEnv()
        ? global
        : typeof window !== "undefined"
            ? window
            // eslint-disable-next-line no-restricted-globals
            : typeof self !== "undefined"
                // eslint-disable-next-line no-restricted-globals
                ? self
                : fallbackGlobalObject) as T;
}

/**
 * Checks whether we're in the Node.js or Browser enviroment
 *
 * @returns Answer to given question
 */
export function isNodeEnv(): boolean {
    return (
        Object.prototype.toString.call(
            typeof process !== "undefined" ? process : 0
        ) === "[object process]"
    );
}
