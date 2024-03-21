import { Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import Select from "react-select";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { usePSDHelpdeskStore } from "../../store";
import makeAnimated from "react-select/animated";

interface selectProp {
  value: string;
  label: string;
}
interface usersLists {
  UHR_EmpCode: string;
  UHR_FullName_th: string;
}

const FormRequestJobs: React.FC = () => {
  const [usersLists, setUsersLists] = useState<usersLists[]>();
  const [machine, setMachine] = useState<string>("");
  const [factory, setFactory] = useState<string>("");
  const [nameUser, setNameUser] = useState<string>("");
  const animatedComponents = makeAnimated();
  const [progress, setProgress] = useState<boolean>(true);
  const [optionMachine, setOptionMachine] = useState<selectProp[]>();
  const [optionFactory, setOptionFactory] = useState<selectProp[]>(); 
  const [processName,setProcessName] = useState<selectProp>();

  const baseURL = import.meta.env.VITE_NODE_SERVER;
  const token = usePSDHelpdeskStore((state) => state.token);

  const getFactory = async () => {
    await axios
      .get(`${baseURL}/factory`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.data.err) {
          console.log(res.data);
        } else {
          setOptionFactory(
            res.data.result?.map((val: any) => ({
              value: val.site_factory,
              label: val.site_factory,
              isDisabled:val.machine_count == 0
            }))
          );
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getMachine = async (factory: string) => {
    setProgress(true);
    await axios
      .get(`${baseURL}/machine/${factory}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.data.err) {
          setProgress(false);
          setOptionMachine([]);
        } else {
          setOptionMachine(
            res.data.result?.map((val: any) => ({
              value: val.site_mccode,
              label: val.site_mcname,
            }))
          );
          setProgress(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getUsers = async () => {
    await axios
      .get(`${baseURL}/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.data.err) {
          console.log(res.data);
        } else {
          setUsersLists(res.data.result);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const findProcess = async (mc_code:string) => {
    const obj = optionMachine?.find((x) => x.value === mc_code);
    setProcessName(obj)
  };
 

  useEffect(() => {
    getFactory();
    getUsers();
  }, []);
  return (
    <div className="w-[95%]">
      <div className="mb-2">
        <Typography
          fontSize={14}
          fontWeight={700}
          color={grey[700]}
          marginBottom={0.5}
        >
          แผนก / Section
        </Typography>

        <Select
          onChange={(e: any) => {
            setFactory(e.value);
            getMachine(e.value);
          }}
          placeholder={"ระบุ แผนก / Section"}
          options={optionFactory}
        ></Select>
      </div>
      <div className="mb-2">
        <Typography
          fontSize={14}
          fontWeight={700}
          color={grey[700]}
          marginBottom={0.5}
        >
          เครื่องจักร (Machine)
        </Typography>

        <Select
          onChange={(e: any) => {
            setMachine(e.value);
            findProcess(e.value)
          }}
          placeholder={progress ? "- ไม่พบข้อมูล -" : "- เลือกเครื่องจักร -"}
          options={optionMachine}
        ></Select>
      </div>
      <div className="mb-2">
        <Typography
          fontSize={14}
          fontWeight={700}
          color={grey[700]}
          marginBottom={0.5}
        >
          ค้นหาเพื่อ แจ้งงานแทน
        </Typography>
        <Select
          components={animatedComponents}
          onChange={(e: any) => {
            setNameUser(e.value);
          }}
          placeholder="เลือกรายชื่อ"
          options={usersLists?.map((item) => ({
            value: item.UHR_EmpCode,
            label: item.UHR_FullName_th,
          }))}
        ></Select>
      </div>
    </div>
  );
};

export default FormRequestJobs;
