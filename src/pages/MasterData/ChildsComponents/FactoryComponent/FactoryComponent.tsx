import { Box, Button, Tooltip, Typography } from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import MUIDataTable from "mui-datatables";
import React, { useEffect, useState } from "react";
import moment from "moment";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import { red, yellow } from "@mui/material/colors";
import axios, { AxiosResponse } from "axios";
import Swal from "sweetalert2";
import { usePSDHelpdeskStore } from "../../../../store";
import LoadingPage from "../../../../components/LoadingPage/LoadingPage";
import BadgeCustom from "../../../../components/BadgeCustom/BadgeCustom";
import AddFactoryModal from "./AddFactoryModal";
import ExportExcelFile from "../../../../components/ExportExcelFile/ExportExcelFile";

interface FactoryAll {
  sf_ID: number;
  sf_Code: string;
  sf_Name: string;
  sf_Description: string;
  sf_CreateDate: string;
  sf_CreateBy: string;
  sf_UpdateDate: string;
  sf_UpdateBy: string;
  sf_Status: string;
}
const FactoryComponent: React.FC = () => {
  const baseURL = import.meta.env.VITE_NODE_SERVER;
  const [loading, setLoading] = useState<boolean>(true);
  const token = usePSDHelpdeskStore((state) => state.token);
  const [factory, setFactory] = useState<FactoryAll[]>();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [renderDom, setRenderDom] = useState<boolean>(false);

  // Function Remove Multiple row
  const handleDelete = async (
    indexOf: { index: number; dataIndex: number }[]
  ) => {
    console.log(indexOf);
    let newArray: any = [];
    for (let i = 0; i < indexOf.length; i++) {
      if (factory !== undefined) {
        newArray.push(factory[indexOf[i].dataIndex]);
      }
    }
    axios.post(
      `${baseURL}/factory/delete/multiple`,{
       id:newArray?.map((val:any) => val.sf_ID)
      },{
        headers:{
          Authorization:`Bearer ${token}`
        }
      }
    ).then((res: AxiosResponse<any, any>) => {
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
          getFactory();
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
  };

  const getFactory = async () => {
    setLoading(true);
    await axios
      .get(`${baseURL}/allFactory`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (!res.data.err && res.data.status === "Ok") {
          console.log(res.data);
          setLoading(false);
          setFactory(res.data.result);
        } else {
          console.log(123);
        }
      })
      .catch((err) => {
        console.log(err);
      });
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
      filename: `${moment().format("YYYY-MM-DDHHmmss")}_FactoryMaster.csv`, // Specify the filename for the downloaded CSV file
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

  const deleteFactory = (id: number) => {
    axios
      .delete(`${baseURL}/factory/delete/${id}`, {
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
            getFactory();
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const columns = [
    {
      name: "sf_ID",
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
                      deleteFactory(value);
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
                      deleteFactory(value);
                    }
                  });
                }}
                sx={{ fontSize: 20, color: yellow[700] }}
              />
            </Tooltip>
          </div>
        ),
      },
    },
    {
      name: "sf_Code",
      label: "Code",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "sf_Name",
      label: "Name",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "sf_Description",
      label: "Description",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "sf_CreateDate",
      label: "Create Date",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "sf_CreateBy",
      label: "Create By",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "sf_Status",
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
    getFactory();
  }, [renderDom]);
  return loading ? (
    <Box className="flex h-[50vh] items-center justify-center">
      <LoadingPage />
    </Box>
  ) : (
    <Box>
      <AddFactoryModal
        open={open}
        handleClose={handleClose}
        callBackRender={callBackRender}
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
        <ExportExcelFile data={factory} fileName={`FactoryMaster`} />
      </Box>
      <Box className="mt-1">
        <MUIDataTable
          title={<Typography>Factory Management</Typography>}
          options={options}
          data={factory || []}
          columns={columns}
        />
      </Box>
    </Box>
  );
};

export default FactoryComponent;
