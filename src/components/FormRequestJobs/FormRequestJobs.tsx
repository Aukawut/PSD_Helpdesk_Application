import { Box, Button, TextField, Typography } from "@mui/material";
import { grey, red } from "@mui/material/colors";
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
import moment from "moment/moment";
import EventNoteRoundedIcon from "@mui/icons-material/EventNoteRounded";
import ScheduleRoundedIcon from "@mui/icons-material/ScheduleRounded";
import FolderOpenRoundedIcon from "@mui/icons-material/FolderOpenRounded";
import PublishRoundedIcon from "@mui/icons-material/PublishRounded";
import TimerRoundedIcon from "@mui/icons-material/TimerRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
  const [title, setTitle] = useState<string>("");
  const [fileUpload, setFileUpload] = useState<FileList[]>([]);

  const selectMcRef = useRef<any>(null);
  const inputUploadRef = useRef<any>(null);

  const baseURL = import.meta.env.VITE_NODE_SERVER;
  const token = usePSDHelpdeskStore((state) => state.token);

  const handleFileInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedFile = event.target.files && event.target.files[0];
    console.log(selectedFile);

    if (selectedFile) {
      // Check if the file is already in the fileUpload array
      const isDuplicate = fileUpload.some((fileList) =>
        Array.from(fileList).some((file: any) => file.name == selectedFile.name)
      );
      if (isDuplicate) {
        toast.warning(
          <div>
            <p className="text-[13px]">ไฟล์นี้ถูกเลือกแล้ว</p>
          </div>,
          {
            position: "top-right",
            autoClose: 750,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light",
          }
        );
      } else {
        const fileSizeInMegabytes = selectedFile.size / (1024 * 1024); // Convert bytes to megabytes
        const maxSizeInMegabytes = 1; // 1MB maximum size

        if (fileSizeInMegabytes <= maxSizeInMegabytes) {
          if (
            selectedFile.type === "image/png" ||
            selectedFile.name.endsWith(".jpg") ||
            (selectedFile.name.endsWith(".jpeg") && fileUpload.length < 3)
          ) {
            fileUpload.length < 3
              ? setFileUpload((prev: FileList[]) => {
                  return [...prev, selectedFile] as FileList[]; // Cast the result to FileList[]
                })
              : toast.warning(
                  <div>
                    <p>อนุญาตอัพโหลดไฟล์ไม่เกิน 3 ไฟล์เท่านั้น</p>
                  </div>,
                  {
                    position: "top-right",
                    autoClose: 1200,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                  }
                );
          } else {
            toast.warning(
              <div>
                <p>อนุญาตอัพโหลดไฟล์ .png หรือ .jpg เท่านั้น</p>
              </div>,
              {
                position: "top-right",
                autoClose: 750,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "light",
              }
            );
          }
        } else {
          toast.warning(
            <div>
              <p>ขนาดไฟล์ไม่เกิน 1 MB เท่านั้น</p>
            </div>,
            {
              position: "top-right",
              autoClose: 750,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: true,
              progress: undefined,
              theme: "light",
            }
          );
        }
      }
    }
  };

  //Function ลบไฟล์ใน Array

  const handleDeleteFile = (index: number) => {
    // Create a copy of the fileUpload array
    const updatedFileUpload = [...fileUpload];
    // Remove the file at the specified index
    updatedFileUpload.splice(index, 1);
    // Update the state with the new array
    setFileUpload(updatedFileUpload);
  };

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
  console.log(fileUpload);
  const handleSubmit = async () => {
    const formData = new FormData();
    Array.from(fileUpload).forEach((file: any, index) => {
      formData.append(`images`, file);
    });

    try {
      const response = await axios.post(`${baseURL}/jobs/add`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error uploading files:", error);
    }
  };
  useEffect(() => {
    getFactory();
    getUsers();
    getCategoryAll();
  }, []);
  return (
    <div className="w-[95%]">
      <ToastContainer />
      <div className="mb-2">
        <Typography
          fontSize={14}
          fontWeight={700}
          color={grey[800]}
          marginBottom={0.5}
        >
          1. แผนก / Section
        </Typography>

        <Select
          onChange={(e: any) => {
            setFactory(e.value);
            getMachine(e.value);
          }}
          menuPortalTarget={document.body}
          styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
          placeholder={"ระบุ แผนก / Section"}
          options={optionFactory}
        ></Select>
      </div>
      <div className="mb-2">
        <Typography
          fontSize={14}
          fontWeight={700}
          color={grey[800]}
          marginBottom={0.5}
        >
          2. เครื่องจักร (Machine)
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
          menuPortalTarget={document.body}
          styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
          placeholder={progress ? "- ไม่พบข้อมูล -" : "- เลือกเครื่องจักร -"}
          options={optionMachine}
        ></Select>
      </div>
      <div className="mb-2">
        <Typography
          fontSize={14}
          fontWeight={700}
          color={grey[800]}
          marginBottom={0.5}
        >
          3. ค้นหาเพื่อ แจ้งงานแทน
        </Typography>
        <Select
          components={animatedComponents}
          menuPortalTarget={document.body}
          styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
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
        <Typography
          fontSize={14}
          fontWeight={700}
          color={grey[800]}
          marginBottom={0.5}
        >
          4. หมวดหมู่ปัญหา
        </Typography>
        <FormControl fullWidth>
          <InputLabel variant="outlined" size="small">
            หมวดหมู่ปัญหา
          </InputLabel>
          <SelectMUI
            variant="outlined"
            size="small"
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
      <div className="mb-2 flex gap-x-2 items-center mt-4">
        <Typography
          fontSize={14}
          fontWeight={700}
          color={grey[800]}
          marginBottom={0.5}
        >
          5. กระบวนการ (Process) :
        </Typography>

        {machine?.selectedValue == "" ||
        machine?.selectedValue === undefined ? (
          <div className="bg-red-100 text-red-600 font-bold px-3 py-1 flex justify-center w-[10rem] rounded-lg text-[14px]">
            ไม่ได้ระบุเครื่องจักร
          </div>
        ) : (
          <div className="bg-green-100 text-green-600 font-bold px-3 py-1 flex justify-center w-[10rem] rounded-lg text-[14px]">
            {processName?.value}
          </div>
        )}
      </div>
      <div className="mb-2 mt-4">
        <Typography
          fontSize={14}
          fontWeight={700}
          color={grey[800]}
          marginBottom={1}
        >
          6. วัน และเวลาที่เครื่องจักรหยุด (Machine Stop Time){" "}
          <TimerRoundedIcon sx={{ color: red[500] }} />
        </Typography>
        <Box className="flex gap-x-2">
          <div
            className="rounded-md p-2 flex items-center gap-x-2"
            style={{ background: grey[100] }}
          >
            <EventNoteRoundedIcon sx={{ color: grey[800] }} />
            {moment().format("YYYY-MM-DD")}
          </div>
          <div
            className="rounded-md p-2 flex items-center gap-x-2"
            style={{ background: grey[100] }}
          >
            <ScheduleRoundedIcon sx={{ color: grey[800] }} />
            {moment().format("HH:mm:ss")}
          </div>
        </Box>
      </div>
      <div className="mb-2 mt-4">
        <Typography
          fontSize={14}
          fontWeight={700}
          color={grey[800]}
          marginBottom={1}
        >
          7. หัวข้อแจ้งซ่อม (Sub Title)
        </Typography>

        <TextField
          fullWidth
          label="หัวข้อแจ้งงาน"
          id="filled-hidden-label-small"
          variant="outlined"
          size="small"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="mb-2 mt-4">
        <Typography
          fontSize={14}
          fontWeight={700}
          color={grey[800]}
          marginBottom={1}
        >
          8. รายละเอียดเพิ่มเติม (Details)
        </Typography>

        <TextField
          rows={4}
          maxRows={4}
          multiline
          fullWidth
          label="รายละเอียดเพิ่มเติม"
          id="filled-hidden-label-small"
          placeholder="รายละเอียดปัญหาหรือข้อมูลที่จำเป็นเบื้องต้น"
          variant="outlined"
          size="small"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="mb-2 mt-4">
        <Typography
          fontSize={14}
          fontWeight={700}
          color={grey[800]}
          marginBottom={1}
        >
          9. อื่นๆ (Other)
        </Typography>

        <TextField
          rows={2}
          maxRows={4}
          multiline
          fullWidth
          label="อื่น ๆ"
          id="filled-hidden-label-small"
          placeholder="รายละเอียดอื่นๆ *ถ้าไม่มี ใส่ (-)"
          variant="outlined"
          size="small"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="mb-2 mt-4">
        <Typography
          fontSize={14}
          fontWeight={700}
          color={grey[800]}
          marginBottom={1}
        >
          10. ไฟล์แนบ (File upload) : รองรับไฟล์ละไม่เกิน 1 MB จำนวน 3 ไฟล์
          (.png .jpg .jpeg เท่านั้น)
        </Typography>

        <div className="flex gap-x-2">
          <div>
            <Button
              variant="outlined"
              size="small"
              onClick={() => {
                inputUploadRef.current.click();
              }}
              disabled={fileUpload && fileUpload.length === 3}
            >
              <PublishRoundedIcon /> Choose
            </Button>
            <input
              type="file"
              ref={inputUploadRef}
              className="hidden"
              onChange={handleFileInputChange}
              accept=".png,.jpeg,.jpg"
            ></input>
          </div>

          <div className="h-[100px] bg-slate-100 rounded-lg w-[100%] p-2">
            {Array.isArray(fileUpload) &&
              (fileUpload?.length > 0 ? (
                <table>
                  <tbody>
                    {fileUpload?.map((val: any, index) => {
                      return (
                        <tr className="mb-2">
                          <td className="text-start w-[90px]">
                            <FolderOpenRoundedIcon sx={{ fontSize: 17 }} /> File{" "}
                            {index + 1}
                          </td>
                          <td className="text-start">{val.name}</td>
                          <td className="text-center w-[60px]">
                            <DeleteOutlineRoundedIcon
                              sx={{ color: red[500] }}
                              onClick={() => handleDeleteFile(index)}
                            />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              ) : (
                <div>
                  <Typography color={red[500]}>- ไม่พบข้อมูลไฟล์ -</Typography>
                </div>
              ))}
          </div>
        </div>
        <Box className="mt-[1rem] text-[#fff]">
          <Button
            variant="contained"
            color="success"
            sx={{ color: "#fff" }}
            onClick={handleSubmit}
          >
            <CheckCircleOutlineRoundedIcon
              sx={{ marginRight: 1, color: "#fff" }}
            />
            Add Job
          </Button>
        </Box>
      </div>
    </div>
  );
};

export default FormRequestJobs;
