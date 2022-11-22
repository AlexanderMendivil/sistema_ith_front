import React, { useEffect, useState } from "react";
import { getAllUsers } from "../../../api_calls/users";
import { getRegisteredUsers } from "../../../api_calls/registeredUsers";
import { ButtonAppBar } from "../../../components/organisms/AppBar/AppBar";
import WeekStatistic from "../../../components/WeekStatistic";
import ClassroomSt from "../../../components/ClassroomSt";
import { GroupStatistic } from "../../../components/organisms/GroupGraphic/GroupStatistic";
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import "./Home.css";
import { CarreraStatics } from "../../../components/organisms/CarreraGraphics/CarreraStatics";
import {
  Button,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { Box } from "@mui/system";
import CheckBox from '@mui/material/Checkbox';
import { TablePdf } from "../../../components/TablePdf/TablePdf";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  bgcolor: 'white',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export const Home = () => {
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  const [hide, setHide] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [week, setWeek] = useState(false);
  const [month, setMonth] = useState(false);
  const [career, setCareer] = useState(false);
  const [classroom, setClassroom] = useState(false);
  const [group, setGroup] = useState(false);

  useEffect(() => {
    getAllUsers()
      .then((data) => setData(data))
      .catch((e) => console.log(e));
    getRegisteredUsers()
      .then((data) => setData2(data))
      .catch((e) => console.log(e));
  }, []);

  const handleClose = () => {
    setOpenModal(!openModal)
  } 
  const onChangeWeek = (e) =>{
    setWeek(!week)
  }
  const onChangeMonth = (e) =>{
    setMonth(!month)
  }
  const onChangeCareer = (e) =>{
    setCareer(!career)
  }
  const onChangeClassroom = (e) =>{
    setClassroom(!classroom)
  }
  const onChangeGroup = (e) =>{
    setGroup(!group)
  }
   const createPDF = () => {
      setOpenModal(true)
      
  }
  return (
    <div className="home-container">
      <ButtonAppBar />

      <Box sx={{ m: 2 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Seleccionar</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Age"
          >
            <MenuItem value={10}>Día</MenuItem>
            <MenuItem value={20}>Semana</MenuItem>
            <MenuItem value={30}>Mes</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Box sx={{ m: 2 }}>
        <Button onClick={() => setHide(!hide)} variant="contained">
          Generar reporte
        </Button>
        {hide && (
          <Box sx={{ mt: 2, mb: 2 }}>
            <FormGroup>
              
              <FormControlLabel
                control={ <CheckBox onChange={onChangeWeek} name="Semana"/>}
                label='Semana'
              >
              </FormControlLabel>

              <FormControlLabel
                control={ <CheckBox onChange={onChangeMonth} name="Mes"/>}
                label='Mes'
              />
              
              <FormControlLabel
               control={ <CheckBox onChange={onChangeCareer} name="Carrera"/>}
                label='Carrera'
              />
              
              <FormControlLabel
               control={ <CheckBox onChange={onChangeClassroom} name="Aula"/>}
                label='Aula'
              />
              
              <FormControlLabel
               control={ <CheckBox onChange={onChangeGroup} name="Grupo"/>}
                label='Grupo'
              />
            </FormGroup>
            <Box sx={{ mt: 2 }}>
              <Button onClick={createPDF} variant="outlined">Aceptar</Button>
            </Box>
          </Box>
        )}
      </Box>
      <WeekStatistic chartData={data} chartData2={data2} />

      <div className="flex-charts">
        <ClassroomSt chartData={data} />
        <GroupStatistic chartData={data} />
      </div>

      <div className="carrera-size">
        <CarreraStatics chartData={data} />
      </div>

      <Modal
          open={openModal}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          >
          <Box sx={style}>
            <Box sx={{
              marginTop: 5,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center'
            }}>

            <Typography id="modal-modal-title" variant="h6" component="h2">
              Previsualización PDF 
            </Typography>
            </Box>
              <TablePdf week={week} group={group} month={month} classroom={classroom} career={career} />
            </Box>
      </Modal>
    </div>
  );
};
