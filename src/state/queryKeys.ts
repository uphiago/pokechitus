export const queryKeys = {
  list: (page: number, pageSize: number) => ['pokemon', 'list', page, pageSize] as const,
  detail: (id: string) => ['pokemon', 'detail', id] as const
};
