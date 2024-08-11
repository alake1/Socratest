import { useQuiz } from "../context/QuizContext"
import React, { useState, useEffect } from "react"
import Paper from "@mui/material/Paper"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import wimg from "./../assets/img/mainpage_woman.jpg"
import Card from "@mui/material/Card"
import CardHeader from "@mui/material/CardHeader"
import CardMedia from "@mui/material/CardMedia"
import CardContent from "@mui/material/CardContent"
import CardActions from "@mui/material/CardActions"
import Collapse from "@mui/material/Collapse"
import Avatar from "@mui/material/Avatar"
import chemistry from "./../assets/img/chemistry.jpg"
import ahistory from "./../assets/img/american_history.jpg"
import geography from "./../assets/img/geography.jpg"
import physics from "./../assets/img/physics.jpg"
import aliterature from "./../assets/img/american_literature.jpg"
import geology from "./../assets/img/geology.jpg"
import programminglangage from "./../assets/img/programming_language.avif";
import reactjs from "./../assets/img/reactjs.jpg";
import kubernetes from "./../assets/img/kubernetes.jpg";


import { CardActionArea } from "@mui/material"

const Topics = (props: any) => {
  const { dispatch } = useQuiz();

  const [topic, useTopic] = useState();

  const subjects = ['American History', 'Physics', 'Chemistry', 'Geology', 'ReactJS', 'Kubernetes'];

  const subject_desc: Record<string, string> = { 'American History': 'High School', 'Physics': 'High School', 'Chemistry': 'Undergrad', 'Geology': 'High School', 'ReactJS': 'Professional Beginner', 'Kubernetes': 'Professional Beginner' };

  const images: Record<string, string> = { 'American History': ahistory, 'Geography': geography, 'Literature': aliterature, 'Physics': physics, 'Chemistry': chemistry, 'Geology': geology, 'ReactJS': reactjs, 'Kubernetes': kubernetes };

  //const ims: Record<string, string> = [ahistory, geography, aliterature, physics, chemistry, geology, aliterature, physics, chemistry, geography];

  return (
    <div ref={props.refProp}>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          margin: 20,
          marginBottom: 5
        }}
      >
        <Box sx={{ width: '100%' }}>
          <Typography variant="h4" gutterBottom sx={{ margin: 5 }}>
            Explore
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

export default Topics
