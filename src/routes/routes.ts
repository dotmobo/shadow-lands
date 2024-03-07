import { RouteNamesEnum } from 'localConstants';
import { Home, Game } from 'pages';
import { Cards } from 'pages/Cards/Cards';
import { Factions } from 'pages/Factions';
import { Help } from 'pages/Help/Help';
import { Leaderboard } from 'pages/Leaderboard';
import { Market } from 'pages/Market/Market';
import { RouteType } from 'types';

interface RouteWithTitleType extends RouteType {
  title: string;
}

export const routes: RouteWithTitleType[] = [
  {
    path: RouteNamesEnum.home,
    title: 'Home',
    component: Home
  },
  {
    path: RouteNamesEnum.game,
    title: 'Shadow Lands',
    component: Game
  },
  {
    path: RouteNamesEnum.help,
    title: 'Help',
    component: Help
  },
  {
    path: RouteNamesEnum.leaderboard,
    title: 'Leaderboard',
    component: Leaderboard
  },
  {
    path: RouteNamesEnum.cards,
    title: 'Cards',
    component: Cards
  },
  {
    path: RouteNamesEnum.market,
    title: 'Market',
    component: Market
  },
  {
    path: RouteNamesEnum.factions,
    title: 'Choose your faction',
    component: Factions
  }
];
