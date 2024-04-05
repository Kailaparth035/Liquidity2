import { atom } from "recoil";

export const isDarkModeState = atom({
    key: "is-dark-mode-state",
    default: true
})

export const isReInitiateState = atom({
    key: "is-reinitiate-state",
    default: false
})