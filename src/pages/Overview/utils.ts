interface JobCount {
  id: number;
  status: string;
  amount: number;
  iconBgColor:string;
}

export const jobCountByStatus: JobCount[] = [
  {
    id: 1,
    status: "New Jobs",
    amount: 62,
    iconBgColor:''
  },
  {
    id: 2,
    status: "Accept Jobs",
    amount: 10,
    iconBgColor:''
  },
  {
    id: 3,
    status: "Finish Jobs",
    amount: 242,
    iconBgColor:''
  },
  {
    id: 4,
    status: "Outside Jobs",
    amount: 15,
    iconBgColor:''
  },
  {
    id: 5,
    status: "Improve Jobs",
    amount: 15,
    iconBgColor:''
  },
  {
    id: 6,
    status: "Close jobs",
    amount: 4236,
    iconBgColor:''
  },

];
