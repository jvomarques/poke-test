/* eslint-disable */
import React from 'react';

import Home from '../screens/home/presentation/index'

import { Meta } from '@storybook/react';

export default {
  component: Home,
  title: 'Pages/Home',
} as Meta;

export const Default: React.VFC<{}> = () => <Home />;
