import {
  Alert,
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { optionFactory } from "../../utils";
import React, { useEffect, useRef, useState } from "react";
import { red } from "@mui/material/colors";
import SaveRoundedIcon from "@mui/icons-material/SaveRounded";
import RestartAltRoundedIcon from "@mui/icons-material/RestartAltRounded";
import axios, { AxiosResponse } from "axios";
import { usePSDHelpdeskStore } from "../../../../store";
import Swal from "sweetalert2";
import { CategoryAll } from "./CategoryComponent";

interface PropsModal {
  handleClose: () => void;
  callBackRender: () => void;
  open: boolean;
  objectCategory: CategoryAll | undefined;
}
const EditCategoryModal: React.FC<PropsModal> = ({
  handleClose,
  open,
  callBackRender,
  objectCategory,
}) => {
  const [name, setName] = useState<string>("");
  const [nameEN, setNameEN] = useState<string>("");
  const [desc, setDesc] = useState<string>("");
  const [status, setStatus] = useState<string>("ENABLE");
  const baseURL = import.meta.env.VITE_NODE_SERVER;
  const token = usePSDHelpdeskStore((state) => state.token);
  const info = usePSDHelpdeskStore((state) => state.info);

  const inputRef = useRef<HTMLInputElement>(null);
  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: { xs: "90%", sm: "60%" },
    bgcolor: "background.paper",
    boxShadow: 24,
    borderRadius: "10px",
    p: 4,
  };
  const handleUpdateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await axios
      .put(
        `${baseURL}/category/update/${objectCategory?.CG_ID}`,
        {
          cgName: name,
          cgNameEn: nameEN,
          cgDesc: desc,
          empCode: info?.hrc_info.UHR_EmpCode,
          status: status,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res: AxiosResponse<any, any>) => {
        if (res.data.err) {
          console.log(res.data.msg);
          Swal.fire({
            icon: "error",
            title: res.data.msg,
          });
        } else if (!res.data.err && res.data.status === "Ok") {
          handleClose(); // ปิด Modal
          Swal.fire({
            icon: "success",
            title: res.data.msg,
            timer: 700,
            showCancelButton: false,
            showConfirmButton: false,
          }).then(() => {
            resetForm();
            callBackRender();
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const setInitValue = (obj: CategoryAll) => {
    if (obj) {
      setName(obj.CG_Name);
      setNameEN(obj.CG_Name_en);
      setStatus(obj.CG_Status);
      setDesc(obj.CG_Description);
    }
  };
  const resetForm = () => {
    setName("");
    setNameEN("");
    setDesc("");
    setStatus("ENABLE");
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };
  useEffect(() => {
    resetForm();
    if (objectCategory !== null && objectCategory !== undefined) {
      setTimeout(() => {
        setInitValue(objectCategory);
      }, 200);
    }
  }, [objectCategory]);
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box
            sx={{
              position: "relative",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <Typography
                id="modal-modal-title"
                variant="h6"
                component="h2"
                sx={{ position: "absolute", top: 0 }}
              >
                Add Category Master
              </Typography>
            </div>

            <div>
              <Tooltip title="close" placement="bottom" arrow>
                <CloseRoundedIcon
                  sx={{ color: red[500], cursor: "pointer" }}
                  onClick={handleClose}
                />
              </Tooltip>
            </div>
          </Box>
          <Box className="h-[400px] overflow-auto mt-[1rem]">
            <form className="mt-[1rem]" onSubmit={handleUpdateSubmit}>
              <div className="grid grid-cols-12 gap-2">
                <div className="grid col-span-4">
                  <FormControl sx={{ marginBottom: "0.7rem" }}>
                    <TextField
                      autoFocus
                      label="Name"
                      required
                      id="outlined-size-small"
                      size="small"
                      inputRef={inputRef}
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                    />
                  </FormControl>
                </div>
                <div className="grid col-span-8">
                  <FormControl sx={{ marginBottom: "0.7rem" }}>
                    <TextField
                      label="Name EN"
                      required
                      id="outlined-size-small2"
                      size="small"
                      value={nameEN}
                      onChange={(e) => {
                        const inputValue = e.target.value;
                        const englishNumberRegex = /^[A-Za-z0-9\s]+$/; // Regular expression to match English letters, numbers, and spaces
                        if (
                          englishNumberRegex.test(inputValue) ||
                          inputValue === ""
                        ) {
                          setNameEN(e.target.value);
                        }
                      }}
                    />
                  </FormControl>
                </div>
              </div>

              <div>
                <FormControl fullWidth>
                  <TextField
                    label="Description"
                    multiline
                    rows={3}
                    maxRows={4}
                    placeholder="Description"
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                  ></TextField>
                </FormControl>
              </div>
              <div className="grid grid-cols-12 gap-2 mt-[0.7rem]">
                <div className="grid col-span-4">
                  <FormControl sx={{ marginBottom: "0.7rem" }} fullWidth>
                    <InputLabel id="demo-simple-select-label" size="small">
                      Status
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Status"
                      size="small"
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                    >
                      {optionFactory?.map((item) => (
                        <MenuItem value={item.name} key={item.id}>
                          {item.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
              </div>
              <Alert severity="warning">
                หมายเหตุ : ตรวจสอบข้อมูลให้ครบถ้วนและถูกต้อง
              </Alert>
              <div className="flex gap-x-2 mt-2">
                <Button variant="contained" type="submit">
                  <SaveRoundedIcon sx={{ marginRight: 1 }} />
                  Update
                </Button>
                <Button variant="outlined" color="error" onClick={resetForm}>
                  <RestartAltRoundedIcon sx={{ marginRight: 1 }} /> Reset Form
                </Button>
              </div>
            </form>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default EditCategoryModal;