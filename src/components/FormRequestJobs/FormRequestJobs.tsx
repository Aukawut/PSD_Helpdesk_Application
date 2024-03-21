import { TextField, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import Select from "react-select";
import React, { useEffect, useRef, useState } from "react";
import axios, { AxiosResponse, responseEncoding } from "axios";
import { usePSDHelpdeskStore } from "../../store";
import makeAnimated from "react-select/animated";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { Select as SelectMUI } from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";

interface selectProp {
  value: string;
  label: string;
}
interface usersLists {
  UHR_EmpCode: string;
  UHR_FullName_th: string;
}
interface machineValue {
  selectedValue: string;
}
interface categoryAll {
  type_id: number;
  type_name: string;
}
const FormRequestJobs: React.FC = () => {
  const [usersLists, setUsersLists] = useState<usersLists[]>();
  const [machine, setMachine] = useState<machineValue>();
  const [factory, setFactory] = useState<string>("");
  const [nameUser, setNameUser] = useState<string>("");
  const animatedComponents = makeAnimated();
  const [progress, setProgress] = useState<boolean>(true);
  const [optionMachine, setOptionMachine] = useState<selectProp[]>();
  const [optionFactory, setOptionFactory] = useState<selectProp[]>();
  const [processName, setProcessName] = useState<selectProp>();
  const [categoryAll, setCategoryAll] = useState<categoryAll[]>();
  const [category, setCategory] = useState<string>("");

  const selectMcRef = useRef<any>(null);

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
              isDisabled: val.machine_count == 0,
            }))
          );
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getMachine = async (factory: string) => {
    selectMcRef !== undefined && selectMcRef.current.setValue([]);

    setProgress(true);
    setMachine({
      selectedValue: "",
    });
    await axios
      .get(`${baseURL}/machine/${factory}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.data.err) {
          setProgress(false);
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
  const findProcess = async (mc_code: string) => {
    const obj = optionMachine?.find((x) => x.value === mc_code);
    setProcessName(obj);
  };

  const getCategoryAll = async () => {
    await axios
      .get(`${baseURL}/category`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res: AxiosResponse) => {
        if (res.data.err) {
          console.log(res.data.msg);
        } else {
          setCategoryAll(res.data.result);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getFactory();
    getUsers();
    getCategoryAll();
  }, []);
  return (
    <div className="w-[95%]">
      <div className="mb-2">
        <Typography
          fontSize={14}
          fontWeight={700}
          color={grey[800]}
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
            setMachine({ selectedValue: e.value });
            findProcess(e.value);
          }}
          ref={selectMcRef}
          value={optionMachine?.find(
            (option) => option.value === machine?.selectedValue
          )}
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
      <div className="mb-2">
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label" variant="standard">
            หมวดหมู่ปัญหา
          </InputLabel>
          <SelectMUI
            variant="standard"
            size="small"
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={category}
            label="หมวดหมู่ปัญหา"
            onChange={(e: SelectChangeEvent) => {
              setCategory(e.target.value);
            }}
          >
            {categoryAll?.map((item) => (
              <MenuItem value={item.type_name} key={item.type_id}>
                {item.type_name}
              </MenuItem>
            ))}
          </SelectMUI>
        </FormControl>
      </div>
      <div className="mb-2 flex gap-x-2 items-center">
        <Typography
          fontSize={14}
          fontWeight={700}
          color={grey[700]}
          marginBottom={0.5}
        >
          กระบวนการ (Process) :
        </Typography>

        <div className="bg-green-100 text-green-600 font-bold px-2 flex justify-center w-[10rem] rounded-lg">
          {processName?.value}
        </div>
      </div>
    </div>
  );
};

export default FormRequestJobs;
