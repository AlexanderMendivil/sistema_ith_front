import { useEffect, useState } from "react";
import { getAllUsers } from "../../../api_calls/users";
import { getRegisteredUsers } from "../../../api_calls/registeredUsers";
import { ButtonAppBar } from "../../../components/organisms/AppBar/AppBar";
import WeekStatistic from "../../../components/WeekStatistic";
import ClassroomSt from "../../../components/ClassroomSt";
import { GroupStatistic } from "../../../components/organisms/GroupGraphic/GroupStatistic";

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
import Checkbox from "@mui/material/Checkbox";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

export const Home = () => {
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  const [hide, setHide] = useState(false);

  useEffect(() => {
    getAllUsers()
      .then((data) => setData(data))
      .catch((e) => console.log(e));
    getRegisteredUsers()
      .then((data) => setData2(data))
      .catch((e) => console.log(e));
  }, []);

  return (
    <div className="home-container">
      <ButtonAppBar />

      <Box sx={{ m: 2 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Seleccionar</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            // value={age}
            label="Age"
            // onChange={handleChange}
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
              <FormControlLabel control={<Checkbox {...label} />} label="Día" />
              <FormControlLabel
                control={<Checkbox {...label} />}
                label="Semana"
              />
              <FormControlLabel control={<Checkbox {...label} />} label="Mes" />
              <FormControlLabel
                control={<Checkbox {...label} />}
                label="Carrera"
              />
              <FormControlLabel
                control={<Checkbox {...label} />}
                label="Aula"
              />
              <FormControlLabel
                control={<Checkbox {...label} />}
                label="Grupo"
              />
            </FormGroup>
            <Box sx={{ mt: 2 }}>
              <Button variant="outlined">Aceptar</Button>
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
    </div>
  );
};
