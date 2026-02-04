//@ts-nocheck

export async function dataURLToFile(dataURL: string, fileName: string) {
  const res = await fetch(dataURL);
  if (!res.ok) return null;
  const blob = await res.blob();
  return new File([blob], fileName, {
    type: `${blob?.type.toLowerCase() || ""}`,
  });
}

export const removeBase64URLMeta = (base64: string) => {
  const base64Arr = base64?.split(",");
  let base64Link = base64Arr?.[1] || "";
  if (base64Link === undefined) {
    if (base64Arr[0].length >= 1) {
      base64Link = base64Arr[0];
    }
    base64Link = "";
  }
  return base64Link;
};

/**
 * @template {{[x: string]: unknown}} T
 * @param {URLSearchParams} searchParams
 * @param {T} params
 * @returns {T}
 */
export function urlSearchParamsExtractor<T extends { [x: string]: unknown }>(
  searchParams: URLSearchParams,
  params: T = {} as T
): T {
  if (searchParams && params) {
    const result: Partial<T> = {};
    for (const key in params) {
      const value = searchParams.get(key);
      result[key] = value || params[key];
    }
    return result as T;
  }
  return params;
}
