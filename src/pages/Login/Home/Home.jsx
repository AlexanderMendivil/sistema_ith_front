import React, { useState, useContext } from "react";
import { ButtonAppBar } from "../../../components/organisms/AppBar/AppBar";
import { MorningStatistic } from "../../../components/MorningStatistic";
import ClassroomSt from "../../../components/ClassroomSt";
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import * as XLSX from 'xlsx';
import "./Home.css";
import { Button } from "@mui/material";
import { Box } from "@mui/system";
import { TablePdf } from "../../../components/TablePdf/TablePdf";
import { AppContext } from "../../../context/AppContext";
import { useEffect } from "react";

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
  const [openModal, setOpenModal] = useState(false);
  const { calculateHours, minutesPerHourNight } = useContext( AppContext )

  const handleClose = () => {
    setOpenModal(!openModal)
  } 
   const createPDF = () => {
      setOpenModal(true)      
  }

  useEffect(()=>{console.log(minutesPerHourNight.length)},[])

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
        <Button onClick={createPDF} disabled={ minutesPerHourNight.length === 0 ? true : false } variant="contained">
          Generar reporte
        </Button>
      </Box>
      <div className="chart-size">
        <ClassroomSt />
        <MorningStatistic/>
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
              <TablePdf  />
            </Box>
      </Modal>
    </div>
  );
};
