import { useQuiz } from "../context/QuizContext"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import wimg from "./../assets/img/mainpage_woman.jpg";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import chemistry from "./assets/img/chemistry.jpg";
import { CardActionArea } from "@mui/material";
import { stat } from "fs";
function StartScreen(myRef: any) {
  const { dispatch, numQuestions } = useQuiz();
  const executeScroll = () => myRef.myRef?.current?.scrollIntoView({ behavior: 'smooth' });

  return (
    <div className="start">
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          height: 400
        }}
      >
        <Box
          component="img"
          sx={{
            height: '100%',
            padding: 10
          }}
          alt="Your logo."
          src={wimg}
        />
        <Box sx={{ width: '100%', maxWidth: 500, paddingTop: 10 }}>

          <Typography variant="h5" gutterBottom>
            Elevate your Learning Experience
          </Typography>
          <Box sx={{
            padding: 2
          }}>
            <Typography variant="h5" gutterBottom sx={{ lineHeight: 3 }}>
              Choose any topic
            </Typography>
            <Typography variant="h5" gutterBottom sx={{ lineHeight: 3 }}>
              Evaluate yourself at your convenience
            </Typography>
            <Typography variant="h5" gutterBottom sx={{ lineHeight: 3 }}>
              Track your score and improve
            </Typography>
          </Box>
          <Button variant="contained" sx={{ bgcolor: "#ff884d", marginLeft: 20, marginTop: 2, paddingTop: 2 }} onClick={executeScroll}><Typography variant="h5" gutterBottom>
            Let's Go            </Typography></Button>
        </Box>
      </Box>
    </div>
  )
}

export default StartScreen
