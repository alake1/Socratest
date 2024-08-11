import { useQuiz } from "../context/QuizContext"
import React, { useState, useEffect } from "react"
import Paper from "@mui/material/Paper"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button";


import { CardActionArea, TextField } from "@mui/material"

const GeneralK = () => {
    const { dispatch } = useQuiz();

    const [topic, setTopic] = useState("General Knowledge");

    const handleSubmit = (e: any) => {
        e.preventDefault();
        fetch("http://localhost:8000/question?topic=" + topic + "&qid=0")
            .then((res) => res.json())
            .then((data) => { console.log(data); console.log(topic); dispatch({ type: "startindiv", topic: { topic }, question: data, questions: [] }) })
    }

    return (
        <div>
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
                        Enter Any Topic
                    </Typography>

                    <form onSubmit={handleSubmit}>
                        <TextField label="Topic" id="customtopic" defaultValue={topic} sx={{ width: '40%' }}
                            helperText="Any topic you would like to learn" onChange={e => setTopic(e.target.value)} />
                        <Button variant="outlined" color="secondary" type="submit" sx={{ padding: '15px', marginLeft: '15px' }}>Submit</Button>
                    </form>
                </Box>


            </Box>
        </div>)
};

export default GeneralK;
