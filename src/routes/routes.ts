import { RouteNamesEnum } from 'localConstants';
import { Home, Game } from 'pages';
import { Help } from 'pages/Help/Help';
import { Leaderboard } from 'pages/Leaderboard';
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
  }
];
