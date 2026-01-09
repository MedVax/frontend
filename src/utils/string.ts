/**
 *
 * @param {string} str
 * @returns
 */
export function cast(str: string) {
  return str === "null"
    ? null
    : str === "undefined"
    ? undefined
    : str === "'null'" || str === '"null"'
    ? "null"
    : str === "true"
    ? true
    : str === "false"
    ? false
    : !isNaN(Number(str))
    ? Number(str)
    : str;
}

/**
 *
 * @param {string} str
 * @returns
 */
export function isJson(str: string) {
  if (str && typeof str === "string") {
    try {
      JSON.parse(str);
      return true;
    } catch (e) {}
  }
  return false;
}

/**
 *
 * @param {string} str
 * @returns
 */
export function escapeRegExp(str = "") {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // $& means the whole matched string
}

export function generateRandomPassword() {
  return (
    Math.random().toString(36).slice(2) +
    Math.random().toString(36).toUpperCase().slice(2)
  );
}
