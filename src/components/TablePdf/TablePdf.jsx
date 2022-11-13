import React, { useEffect } from 'react'
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
import { useState } from 'react';
import { useContext } from 'react';
import { AppContext } from '../../context/AppContext'
import Box from '@mui/material/Box';
import BannerIth from '../../assets/images/banner_ith.png'
function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }
  
  const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
  ];

  var labels = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];

export const TablePdf = ({ data, day = null, week = null, month = null, career = null, classroom = null, group = null, }) => {

    const { hoursPerDay } = useContext( AppContext )
    console.log(hoursPerDay)
    const ref = React.createRef();
    const [tableHeaders, setTableHeaders] = useState([])

    useEffect(()=>{
        setTableHeaders(Object.keys(data[0]))
        
    }, [])
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
            {labels.map( (header, index) => <TableCell key={index}>{header}</TableCell>)}
          </TableRow>
        </TableHead>
        <TableBody>
            <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
              {hoursPerDay.map((hours, index) => (
              <TableCell key={index} component="th" scope="row">
                {hours}
              </TableCell>
                ))}
            </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
    </Box>
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
