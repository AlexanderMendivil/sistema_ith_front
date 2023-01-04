import React from 'react'
import Pdf from "react-to-pdf";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from "@mui/material";
import Typography from '@mui/material/Typography';
import { useContext } from 'react';
import { AppContext } from '../../context/AppContext'
import Box from '@mui/material/Box';
import BannerIth from '../../assets/images/banner_ith.png'

  const labelsNight = ["1:00 pm - 2:00 pm", "2:00 pm - 3:00 pm", "3:00 pm - 4:00 pm", "4:00 pm - 5:00 pm", "5:00 pm - 6:00 pm", "6:00 pm - 7:00 pm", "7:00 pm - 8:00 pm", "8:00 pm - 9:00 pm"];

export const TablePdf = () => {

    const { minutesPerHourNight } = useContext( AppContext )
    const ref = React.createRef();

  return (
    <>

      <div ref={ref}>
        <Box
        sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',}}
            >

        <img src={BannerIth} alt="banner" />

            <Box
            sx={{
                marginTop: 10,
            }}>
            <Typography variant="subtitle1" component="subtitle1">
              Tabla donde se refleja la cantidad de horas semanales
            </Typography>
            <Typography variant="subtitle1" component="subtitle1">
               registradas en el laboratorio de sistemas e informatica del ITH. 
            </Typography>
            </Box>
        </Box>

        {
          
          minutesPerHourNight ? 
          <Box
        sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',}}>

        
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {labelsNight.map( (header, index) => <TableCell key={index}>{ header }</TableCell>)}
          </TableRow>
        </TableHead>
        <TableBody>
            <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
              {minutesPerHourNight.map((hours, index) => (
              <TableCell key={index} component="th" scope="row">
                {hours}
              </TableCell>
                ))}
            </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
    </Box> : <></>
    }

      </div>
      <Box sx={{
        marginTop: 5,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-end'
      }}>
          <Pdf targetRef={ref} filename="Reporte_laboratorio.pdf">
              {({ toPdf }) => <Button onClick={toPdf} variant="contained">IMPRIMIR</Button>}
        </Pdf>
      </Box>
      </>
  )
}
