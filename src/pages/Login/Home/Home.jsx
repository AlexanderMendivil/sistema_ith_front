import React, { useEffect, useState, useContext } from "react";
import { getAllUsers } from "../../../api_calls/users";
import { getRegisteredUsers } from "../../../api_calls/registeredUsers";
import { ButtonAppBar } from "../../../components/organisms/AppBar/AppBar";
import { MorningStatistic } from "../../../components/MorningStatistic";
import ClassroomSt from "../../../components/ClassroomSt";
import { GroupStatistic } from "../../../components/organisms/GroupGraphic/GroupStatistic";
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import * as XLSX from 'xlsx';
import "./Home.css";
import { CarreraStatics } from "../../../components/organisms/CarreraGraphics/CarreraStatics";
import {
  Button,
  FormControlLabel,
  FormGroup,
} from "@mui/material";
import { Box } from "@mui/system";
import CheckBox from '@mui/material/Checkbox';
import { TablePdf } from "../../../components/TablePdf/TablePdf";
import { AppContext } from "../../../context/AppContext";

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
  const [hide, setHide] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [week, setWeek] = useState(false);
  const [month, setMonth] = useState(false);
  const [career, setCareer] = useState(false);
  const [classroom, setClassroom] = useState(false);
  const [group, setGroup] = useState(false);

  const { calculateHours } = useContext( AppContext )

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

    const onChange = ( event ) => {
      const [file] = event.target.files;
        const reader = new FileReader();

        reader.onload = ( evt ) =>{
        const bstr = evt.target?.result;
        const wb =  XLSX.read(bstr, {type: 'binary'});

        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];

        const data = XLSX.utils.sheet_to_json(ws);

      const tempArray = [] 
        for(let i = 0; i < data.length; i++){
          for(let j = 0; j < data.length; j++){
            if(data[i]['ID de Usuario'] === data[j]['ID de Usuario']){
              if(data[i]['Tiempo'].substring(0,10)  === data[j]['Tiempo'].substring(0,10))
              if(data[i]['Estado'].includes('Entrada') && data[j]['Estado'].includes('Salida')){
                tempArray.push({ entrada: data[i], salida: data[j] })
                break
            }
          }
        }
      }
      calculateHours(tempArray)
    }
      reader.readAsBinaryString(file);
    }

  return (
    <div className="home-container">
      <ButtonAppBar />

      <Box sx={{ m: 2 }}>
      <input id='inputTag' type='file' accept='.xlsx, .xls, .csv' className='input-file' onChange={onChange}/>
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
      <div className="chart-size">
        <MorningStatistic/>
        <ClassroomSt />
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
