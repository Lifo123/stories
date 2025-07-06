import { Local } from "@lifo123/library/utils";

export const isBrowser = typeof window !== "undefined";
export const projectName = isBrowser ? (window.location.pathname === '/' ? 'lifo/lib' : window.location.pathname.split('/').filter(Boolean)[0]) : 'lifo/libs';


export const LocalPrefs = Local(`${projectName}-preferences`)
export const LocalUser = Local(`${projectName}-user`)
export const LocalSearch = Local(`${projectName}-search`)