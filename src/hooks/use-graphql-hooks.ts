import { AxiosResponse } from "axios";

export const buildGraphqlFilter = <T extends Record<string, (value: any) => any>>(rawFilter: any, filterMap: {
  and: T
  or: T
}) => {
  const and = [];
  const or = [];

  for (let i = 0; i < (rawFilter?.and?.length ?? 0); i++) {
    try {
      const entry: [string, any] = Object.entries(rawFilter.and[i])[0] ?? [];
      const [key, value] = entry;

      if (key === "or") {
        for (const item of value) {
          const [inKey, inValueObj]: any = Object.entries(item)[0];
          const inValue = inValueObj?.contains;

          const fn = filterMap.or[inKey];
          if (fn) {
            const result = fn(inValue);
            if (result) or.push(result);
          }
        }
      } else {
        const fn = filterMap.and[key];
        if (fn) {
          const result = fn(value);
          if (result) and.push(result);
        }
      }
    } catch (e) {
      console.error("🔥 필터 파싱 중 에러 발생:", e)
    }
  }

  return { and, or }
}

export const hasGraphQLError = (res: AxiosResponse) => {
  let hasError = false;

  if (res.data?.errors && Array.isArray(res.data.errors)) {
    hasError = true;
  }

  return hasError;
}

export const useGraphQLHooks = () => {
  return { buildGraphqlFilter, hasGraphQLError };
}
