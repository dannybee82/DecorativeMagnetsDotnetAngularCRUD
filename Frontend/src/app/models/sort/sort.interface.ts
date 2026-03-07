export type SortAlphabeticallyAscending = 'ASC';
export type SortAlphabeticallyDescending = 'DESC';
export type SortAlphabeticallyNone = undefined;
export type SortAlphabeticallyDefault = 'DEFAULT';

export interface SortAlphabetically {
    sort: SortAlphabeticallyAscending | SortAlphabeticallyDescending | SortAlphabeticallyNone | SortAlphabeticallyDefault
}