import { MindMapPage } from "@/pages/mindmap";
import { MainPage } from "@pages/main";
import { ReactNode } from "react";

type RoutesType = {
    path: string;
    element: ReactNode;
};

export const routes: RoutesType[] = [
    { path: '/', element: <MainPage /> },
    { path: '/mindmap', element: <MindMapPage /> }
];