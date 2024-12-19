import { MindMapPage } from '@/pages/mindmap';
import { MindMapsListPage } from '@/pages/mapslist';
import { ReactNode } from 'react';
import { LoginPage } from '@/pages/login';

type RoutesType = {
  path: string;
  element: ReactNode;
};

export const routes: RoutesType[] = [
  { path: '/mindmap', element: <MindMapPage /> },
  { path: '/login', element: <LoginPage /> },
  { path: '/list', element: <MindMapsListPage /> },
];
