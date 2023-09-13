// Utilities
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    //
    drawerDisplay:false,
    FormmMiembros:{display:false},
  }),
})
