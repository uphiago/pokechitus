const trimTrailingSlash = (value: string) => value.replace(/\/+$/, '');

const read = (value: string | undefined, fallback: string): string => {
  const normalized = value?.trim();
  return normalized ? trimTrailingSlash(normalized) : fallback;
};

export const env = {
  pokeApiBaseUrl: read(import.meta.env.VITE_POKEAPI_BASE_URL, 'https://pokeapi.co/api/v2')
};
