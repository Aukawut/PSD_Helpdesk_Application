import { create } from "zustand"
import { devtools, persist } from "zustand/middleware"

type infoUser = {
  name: string
  username: string
  position: string
}
interface PSDHelpdeskStore {
  token: string
  isLogin: boolean
  setToken: (token: string) => void
  info: infoUser[]
  setInfo: (info: infoUser[]) => void
  logout: () => void
  login: () => void
}

export const usePSDHelpdeskStore = create<PSDHelpdeskStore>()(
  devtools(
    persist(
      (set) => ({
        token: "",
        isLogin: false,
        logout: () => {
          set((state) => ({ isLogin: (state.isLogin = false) }))
        },
        login: () => {
          set((state) => ({ isLogin: (state.isLogin = true) }))
        },
        info: [],
        setInfo: (info: infoUser[]) =>
          set((state) => ({ info: (state.info = info) })),
        setToken: (token) => set((state) => ({ token: (state.token = token) })),
        
      }),
      { name: "PSD_Helpdesk_Store" }
    )
  )
)
