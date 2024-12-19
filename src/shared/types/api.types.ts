import { Dispatch, SetStateAction } from 'react';
import { EdgeType, NodeType } from './mindmap.types';

export type SignUpDto = {
  email: string;
  password: string;
};

export type SignInDto = {
  email: string;
  password: string;
};

export type AuthResponse = {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    email: string;
  };
};

export type MapType = {
  id: string;
  title: string;
};

export type MapRequest = {
  nodes: NodeType[];
  edges: EdgeType[];
} & MapType;

export type MapResponse = {
  nodes: NodeType[];
  edges: EdgeType[];
} & MapType;

export type MapsListResponse = {
  maps: MapType[];
};

export interface MapsContextType {
  mapsList: MapType[];
  setMapsList: Dispatch<SetStateAction<MapType[]>>;
  handleGetMaps: () => void;
  handleCreateMap: () => void;
}

export interface MapContextType {
  map: MapType;
  setMap: Dispatch<SetStateAction<MapType>>;
  handleGetMapById: (id: MapType['id']) => void;
  handleSaveMap: (mapData: MapType) => void;
  handleDeleteMapById: (id: MapType['id']) => void;
}
