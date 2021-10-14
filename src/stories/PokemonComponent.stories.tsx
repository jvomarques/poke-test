/* eslint-disable */
import React from 'react';

import PokemonComponent from '../screens/home/presentation/components/pokemon.component'

import { Meta } from '@storybook/react';
import Pokemon from '../screens/home/domain/entities/pokemon';

export default {
  component: PokemonComponent,
  title: 'Components/Pokemon',
  argTypes: {
    type: {
      options: ['electric', 'fire', 'water', 'other-type'],
      control: { type: 'radio' }
    }
  }
} as Meta;

const pokemonElectric: Pokemon = {
  name: 'Pikachu',
  image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/25.svg',
  type: 'electric'
}

export const Basic = (pokemon: Pokemon) => <PokemonComponent pokemon={pokemon} />;
Basic.args = pokemonElectric
