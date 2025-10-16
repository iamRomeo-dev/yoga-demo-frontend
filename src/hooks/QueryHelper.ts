/** Escape a string and allow it to be used as a regexp */
const escapeRegExp = (value: string) => {
  return value.replace(/[.*+?^${}()|[\]\\]/, "\\$&");
};

export type SortParam<T> = ":id" | keyof T | string;

export type SearchParams<T> = {
  limit?: number;
  skip?: number;
  sort?: SortParam<T>;
} & object;

export type Page<T> = {
  totalCount: number;
  list: T[];
};

type FilterType = {
  from: (...expressions: unknown[]) => object;
  regex: (value: string, options: string) => object;
  and: (...args: FilterParams[] | unknown[]) => object;
  or: (...args: FilterParams[]) => object;
};

export type FilterParams = Record<string, unknown>;

export const Filter: FilterType = {
  /**
   * Combine given expressions in a single mingo filter.
   * Falsy expressions will be removed.
   * @example
   * Filter.from(
   *   { foo: "bar" },
   *   search && { baz: search }
   * )
   * // If search === "some search terms", will result in:
   * { foo: "bar", baz: "some search terms" }
   * // If search === "", will result in:
   * { foo: "bar" }
   */
  from: (...expressions) => {
    const filter = Object.assign({}, ...expressions.filter(Boolean));
    if (Object.keys(filter).length === 0) {
      // If there are no keys in the filter, return undefined.
      // This will skip filtering in the queries and avoid creating a mingo query
      return undefined;
    }
    return filter;
  },
  /**
   * Create a mongi $regex expression and escape the given value.
   * This is a shorcut that can be used instead of `{ $regex: escapeRegExp(value), $options: "i" }`
   */
  regex: (value, options = "i") => {
    return { $regex: escapeRegExp(value), $options: options };
  },
  and: (...args) => {
    return { $and: args };
  },
  or: (...args) => {
    return { $or: args };
  },
};
