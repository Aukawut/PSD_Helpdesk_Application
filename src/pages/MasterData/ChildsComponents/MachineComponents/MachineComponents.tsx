import { Box, Button, Tooltip, Typography } from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import MUIDataTable from "mui-datatables";
import React, { useEffect, useState } from "react";
import moment from "moment/min/moment-with-locales";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import { red, yellow } from "@mui/material/colors";
import axios, { AxiosResponse } from "axios";
import Swal from "sweetalert2";
import { usePSDHelpdeskStore } from "../../../../store";
import LoadingPage from "../../../../components/LoadingPage/LoadingPage";
import BadgeCustom from "../../../../components/BadgeCustom/BadgeCustom";
import ExportExcelFile from "../../../../components/ExportExcelFile/ExportExcelFile";

import { motion } from "framer-motion";
import EditMachineModal from "./EditMachineModal";
import AddMachineModal from "./AddMachineModal";

export interface optionsProcess {
  value: string;
  label: string;
}

// Interface type Response
export interface MachineAll {
  site_mcid: number;
  site_mccode: string;
  site_mcname: string;
  site_process_id: string;
  site_description: string;
  site_factory: string;
  site_status: string;
  site_mccreatedate: string | null;
  site_mccreateby: string;
  name_area: string;
  name_process: string;
}

const MachineComponents: React.FC = () => {
  const baseURL = import.meta.env.VITE_NODE_SERVER;
  const [loading, setLoading] = useState<boolean>(true);
  const token = usePSDHelpdeskStore((state) => state.token);
  const [machineLists, setMachineList] = useState<MachineAll[]>();
  const [open, setOpen] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [objMachine, setObjMachine] = useState<MachineAll>();
  const [processMaster, setProcessMaster] = useState<optionsProcess[]>();
  const [factoryMaster, setFactoryMaster] = useState<optionsProcess[]>();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleOpenUpdate = () => setOpenUpdate(true);
  const handleCloseUpdate = () => setOpenUpdate(false);

  const [renderDom, setRenderDom] = useState<boolean>(false);

  // Function to get Process Master
  const getProcessMaster = async () => {
    setLoading(true);
    await axios
      .get(`${baseURL}/process`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (!res.data.err && res.data.status === "Ok") {
          console.log(res.data);
          setLoading(false);
          setProcessMaster(
            res.data.result.map((val: any) => ({
              value: val.id_process,
              label: val.name_process,
            }))
          );
        } else {
          console.log(123);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Function to get Factory Master
  const getFactoryMaster = async () => {
    setLoading(true);
    await axios
      .get(`${baseURL}/factory`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (!res.data.err && res.data.status === "Ok") {
          console.log(res.data);
          setLoading(false);
          setFactoryMaster(
            res.data.result.map((val: any) => ({
              value: val.site_factory,
              label: val.site_factory,
            }))
          );
        } else {
          console.log(123);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // Function Remove Multiple row
  const handleDelete = async (
    indexOf: { index: number; dataIndex: number }[]
  ) => {
    console.log(indexOf);
    let newArray: any = [];
    for (let i = 0; i < indexOf.length; i++) {
      if (machineLists !== undefined) {
        newArray.push(machineLists[indexOf[i].dataIndex]);
      }
    }
    axios
      .post(
        `${baseURL}/machine/delete/multiple`,
        {
          id: newArray?.map((val: any) => val.site_mcid),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res: AxiosResponse<any, any>) => {
        if (res.data.err) {
          Swal.fire({
            icon: "error",
            title: res.data.msg,
          });
        } else if (!res.data.err && res.data.status === "Ok") {
          Swal.fire({
            icon: "success",
            title: res.data.msg,
            timer: 700,
            showCancelButton: false,
            showConfirmButton: false,
          }).then(() => {
            getMachineLists();
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getMachineLists = async () => {
    setLoading(true);
    await axios
      .get(`${baseURL}/machineLists`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (!res.data.err && res.data.status === "Ok") {
          console.log(res.data);
          setLoading(false);
          setMachineList(res.data.result);
        } else {
          console.log(123);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const findMachine = (id: number) => {
    const obj = machineLists?.find((x) => x.site_mcid === id);
    setObjMachine(obj);
    console.log(obj);

    if (obj !== null && obj !== undefined) {
      handleOpenUpdate();
    }
  };

  const options = {
    textLabels: {
      body: {
        noMatch: "- ไม่พบข้อมูล -", // Change the text here
      },
    },

    elevation: 0,
    download: false,
    print: false,
    downloadOptions: {
      filename: `${moment().format("YYYY-MM-DDHHmmss")}_RequestTypeMaster.csv`, // Specify the filename for the downloaded CSV file
      separator: ",", // Specify the column separator (comma by default)
      charset: "utf-8", // Ensure UTF-8 encoding
    },

    customToolbarSelect: (selectedRows: any) => {
      const indexOfData = selectedRows.data;
      return (
        <Tooltip title={"ลบข้อมูล"} sx={{ cursor: "pointer" }} className="mr-6">
          <DeleteOutlineRoundedIcon
            sx={{ color: red[500] }}
            onClick={() => {
              Swal.fire({
                title: "คุณแน่ใจหรือไม่ ?",
                text: "คุณจะไม่สามารถนำข้อมูลกลับมาได้!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "ใช่, ฉันต้องการ!",
                cancelButtonText: "ยกเลิก",
              }).then((result) => {
                if (result.isConfirmed) {
                  handleDelete(indexOfData);
                }
              });
            }}
          />
        </Tooltip>
      );
    },
  };

  // Function ลบข้อมูล

  const deleteMachine = (id: number) => {
    axios
      .delete(`${baseURL}/machine/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res: AxiosResponse<any, any>) => {
        if (res.data.err) {
          Swal.fire({
            icon: "error",
            title: res.data.msg,
          });
        } else if (!res.data.err && res.data.status === "Ok") {
          Swal.fire({
            icon: "success",
            title: res.data.msg,
            timer: 700,
            showCancelButton: false,
            showConfirmButton: false,
          }).then(() => {
            getMachineLists();
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const columns = [
    {
      name: "site_mcid",
      label: "Action",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value: any) => (
          <div className="flex gap-x-2 items-center">
            <Tooltip title="ลบข้อมูล">
              <DeleteOutlineRoundedIcon
                onClick={() => {
                  Swal.fire({
                    title: "คุณแน่ใจหรือไม่ ?",
                    text: "คุณจะไม่สามารถนำข้อมูลกลับมาได้!",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "ใช่, ฉันต้องการ!",
                    cancelButtonText: "ยกเลิก",
                  }).then((result) => {
                    if (result.isConfirmed) {
                      deleteMachine(value);
                    }
                  });
                }}
                sx={{ fontSize: 20, color: red[500] }}
              />
            </Tooltip>
            |
            <Tooltip title="แก้ไขข้อมูล">
              <EditRoundedIcon
                onClick={() => {
                  findMachine(value);
                }}
                sx={{ fontSize: 20, color: yellow[700] }}
              />
            </Tooltip>
          </div>
        ),
      },
    },
    {
      name: "site_mccode",
      label: "Code",
      options: {
        filter: true,
        sort: false,
        customBodyRender: (value: any) => (
          <BadgeCustom text={value} color="purple" />
        ),
      },
    },
    {
      name: "site_mcname",
      label: "Name",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "site_factory",
      label: "Factory",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "name_area",
      label: "Area",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "name_process",
      label: "Process",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "site_mccreatedate",
      label: "Create Date",
      options: {
        filter: true,
        sort: false,
        customBodyRender: (value: any) =>
          value !== null
            ? moment(value).subtract(7, "hours").locale("th").format("LLL")
            : "ไม่ได้ระบุ",
      },
    },
    {
      name: "site_mccreateby",
      label: "Create By",
      options: {
        filter: true,
        sort: false,
        customBodyRender: (value: any) =>
          value !== null ? value : "ไม่ได้ระบุ",
      },
    },

    {
      name: "site_status",
      label: "Status",
      options: {
        filter: true,
        sort: false,
        customBodyRender: (value: any) => (
          <BadgeCustom
            text={value}
            color={value == "ENABLE" ? "success" : "danger"}
          />
        ),
      },
    },
  ];

  // Render Dom หลังจาก Action Add ที่ Component Modal Add
  const callBackRender = () => {
    setRenderDom((prev) => !prev);
  };
  useEffect(() => {
    getMachineLists();
    getProcessMaster();
    getFactoryMaster();
  }, [renderDom]);
  return loading ? (
    <Box className="flex h-[50vh] items-center justify-center overflow-hidden">
      <LoadingPage />
    </Box>
  ) : (
    <motion.div
      initial={{
        y: 20,
        opacity: 0,
      }}
      animate={{
        opacity: 100,
        y: 0,
      }}
      transition={{
        duration: 0.2,
        type: "tween",
      }}
    >
      <Box>
        {/* Modal for add machine */}
        <AddMachineModal
          open={open}
          handleClose={handleClose}
          callBackRender={callBackRender}
          processLists={processMaster}
          factoryLists={factoryMaster}
        />
        {/*  Modal for Edit machine */}
        <EditMachineModal
          open={openUpdate}
          handleClose={handleCloseUpdate}
          callBackRender={callBackRender}
          processLists={processMaster}
          factoryLists={factoryMaster}
          oldValue={objMachine}
        />
        <Box className="flex gap-x-2">
          <Button
            variant="contained"
            size="small"
            color="primary"
            className="hover:scale-105 duration-150 ease-in-out"
            onClick={handleOpen}
          >
            <AddRoundedIcon /> Add
          </Button>
          <ExportExcelFile data={machineLists} fileName={`MachineMaster`} />
        </Box>
        <Box className="mt-1">
          <MUIDataTable
            title={<Typography>Machine Management</Typography>}
            options={options}
            data={machineLists || []}
            columns={columns}
          />
        </Box>
      </Box>
    </motion.div>
  );
};

export default MachineComponents;
