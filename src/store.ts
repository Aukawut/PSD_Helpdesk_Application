import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface infoHRC {
  ROLE: string;
  UHR_EmpCode: string;
  UHR_FullName_th: string;
  ESD_ShortDepartment: string;
  UHR_POSITION: string;
}
interface ldapInfo {
  LDAP_samaccountname: string;
  LDAP_DisplayName: string;
  LDAP_Description: string;
  LDAP_Department: string;
  LDAP_InternetAddress: string;
}
interface infoUser {
  ldap_info: ldapInfo;
  hrc_info: infoHRC;
}
interface PSDHelpdeskStore {
  token: string;
  isLogin: boolean;
  setToken: (token: string) => void;
  info: infoUser;
  setInfo: (ldap_info: ldapInfo, info: infoHRC) => void;
  logout: () => void;
  login: () => void;
}

export const usePSDHelpdeskStore = create<PSDHelpdeskStore>()(
  devtools(
    persist(
      (set) => ({
        token: "",
        isLogin: false,
        logout: () => {
          set((state) => ({ isLogin: (state.isLogin = false) }));
        },
        login: () => {
          set((state) => ({ isLogin: (state.isLogin = true) }));
        },
        info: {
          ldap_info: {
            LDAP_samaccountname: "",
            LDAP_DisplayName: "",
            LDAP_Description: "",
            LDAP_Department: "",
            LDAP_InternetAddress: "",
          },
          hrc_info: {
            ROLE: "",
            UHR_EmpCode: "",
            UHR_FullName_th: "",
            ESD_ShortDepartment: "",
            UHR_POSITION: "",
          },
        },
        setInfo: (ldap_info: ldapInfo, infoHr: infoHRC) =>
          set((state) => ({
            info: state.info = {
              ldap_info: ldap_info,
              hrc_info: infoHr
            },
          })),
        setToken: (token) => set((state) => ({ token: (state.token = token) })),
      }),
      { name: "PSD_Helpdesk_Store" }
    )
  )
);
