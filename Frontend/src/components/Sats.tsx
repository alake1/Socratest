import { useQuiz } from "../context/QuizContext";
import React, { useState, useEffect } from "react"
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from "@mui/material/Button"
import wimg from "./../assets/img/mainpage_woman.jpg";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import chemistry from "./../assets/img/chemistry.jpg";
import ahistory from "./../assets/img/american_history.jpg";
import geography from "./../assets/img/geography.jpg";
import physics from "./../assets/img/physics.jpg";
import aliterature from "./../assets/img/american_literature.jpg";
import geology from "./../assets/img/geology.jpg";
import reactjs from "./../assets/img/reactjs.jpg";
import sats from "./../assets/img/sat.jpg";
import gre from "./../assets/img/gre.jpg";


import { CardActionArea } from "@mui/material";

const Sats = (props: any) => {
  const { dispatch } = useQuiz();

  const [topic, useTopic] = useState();

  const subjects = ['SAT', 'GRE'];

  const subject_desc: Record<string, string> = { 'SAT': 'Critical Reading Skills', 'GRE': 'Verbal Reasoning Skills' };

  const images: Record<string, string> = { 'SAT': sats, 'GRE': gre };


  return (
    <div ref={props.refProp}>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          marginLeft: 20,
          marginTop: 0
        }}
      >
        <Box sx={{ width: '100%' }}>
          <Typography variant="h4" gutterBottom sx={{ margin: 5 }}>
            Prepare
          </Typography>
        </Box>
        {subjects.map(function (sub, i) {
          return <div onClick={() => fetch("http://localhost:8000/questions?topic=" + sub)
            .then((res) => res.json())
            .then((data) => { dispatch({ type: "start", topic: { sub }, questions: data }) })} key={i}><Card sx={{ maxWidth: 300, m: 5 }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="194"
                  image={images[sub]}
                  alt={sub}
                />
                <CardHeader
                  title={sub}
                  subheader={subject_desc[sub]}
                />
              </CardActionArea>
            </Card></div>
        })}

      </Box>
    </div>)
};


export default Sats;
