import type { PokeDetailResponse } from '../api/pokeApiClient';
import type { PokemonDetail, PokemonSummary } from '../domain/pokemon';

export const toPokemonSummary = (
  detail: PokeDetailResponse,
  isFavorite: boolean
): PokemonSummary => ({
  id: String(detail.id),
  name: detail.name,
  types: detail.types?.map((t) => t.type.name) ?? [],
  spriteUrl: officialArtworkUrl(detail.id),
  isFavorite
});

const officialArtworkUrl = (id: number | string) =>
  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

export const toPokemonDetailBase = (
  detail: PokeDetailResponse,
  isFavorite: boolean
): Omit<PokemonDetail, 'evolutionChain' | 'typeMatchup' | 'flavorText' | 'isLegendary'> => ({
  id: String(detail.id),
  name: detail.name,
  types: detail.types?.map((t) => t.type.name) ?? [],
  spriteUrl: detail.sprites?.front_default ?? null,
  artworkUrl: officialArtworkUrl(detail.id),
  height: detail.height ?? null,
  weight: detail.weight ?? null,
  abilities: detail.abilities?.map((a) => a.ability.name) ?? [],
  moves: detail.moves?.map((move) => move.move.name) ?? [],
  heldItems: detail.held_items?.map((item) => item.item.name) ?? [],
  stats: detail.stats?.map((s) => ({ name: s.stat.name, value: s.base_stat })) ?? [],
  isFavorite
});
