import type { PokeDetailResponse } from '../api/pokeApiClient';
import type { PokemonDetail, PokemonSummary } from '../domain/pokemon';

export const toPokemonSummary = (
  detail: PokeDetailResponse,
  isFavorite: boolean
): PokemonSummary => ({
  id: String(detail.id),
  name: detail.name,
  types: detail.types?.map((t) => t.type.name) ?? [],
  spriteUrl: detail.sprites?.front_default ?? null,
  isFavorite
});

export const toPokemonDetailBase = (
  detail: PokeDetailResponse,
  isFavorite: boolean
): Omit<PokemonDetail, 'evolutionChain' | 'typeMatchup'> => ({
  id: String(detail.id),
  name: detail.name,
  types: detail.types?.map((t) => t.type.name) ?? [],
  spriteUrl: detail.sprites?.front_default ?? null,
  height: detail.height ?? null,
  weight: detail.weight ?? null,
  abilities: detail.abilities?.map((a) => a.ability.name) ?? [],
  moves: detail.moves?.map((move) => move.move.name) ?? [],
  heldItems: detail.held_items?.map((item) => item.item.name) ?? [],
  stats: detail.stats?.map((s) => ({ name: s.stat.name, value: s.base_stat })) ?? [],
  isFavorite
});
