import { Card, IconButton, List, ListItem, ListItemButton, ListItemText, Stack, Typography } from "@mui/material"
import { ArrowBackIosNew, ArrowForwardIos  } from "@mui/icons-material"
import { useQuestionStore } from "../store/questions"
import SyntaxHighlighter from 'react-syntax-highlighter';
import { gradientDark } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import { type Question as QuestionType } from "../types"
import { Footer } from "./Footer";

const getBackgroundColor = (info:QuestionType,index:number)=>{

    const { userSelectedAnswer, correctAnswer } = info
    
    // user didn't select any 
    if(userSelectedAnswer == null) return 'transparent'

    //if select but the answer is wrong 
    if(index !== correctAnswer && index !== userSelectedAnswer) return 'transparent'

    // if is the correct answer
    if(index === correctAnswer) return 'green'

    // if this is the selected option, but is wrong
    if(index === userSelectedAnswer) return 'red'

    // if is nothing         
    return 'transparent'
}

const Question = ({info}:{info:QuestionType}) => {
    const selectAnswer = useQuestionStore(state => state.selectAnswer)

    const createHandleClick = (answerIndex:number) => () => {
        selectAnswer(info.id, answerIndex)

    }

    
    
    return (
        <Card variant="outlined" sx={{bgcolor:'#222',textAlign:'left'}}>
            <Typography variant="h5">
                {info.question}
            </Typography>

            <SyntaxHighlighter language="javascript" style={gradientDark} >
                {info.code}    
            </SyntaxHighlighter>
            <List sx={{bgcolor:'#333'}} disablePadding >
                {info.answers.map((answer,index)=>(
                    <ListItem key={index} disablePadding divider >
                        <ListItemButton 
                            disabled={info.userSelectedAnswer!=null}
                            onClick={createHandleClick(index)}
                            sx={{
                                backgroundColor:getBackgroundColor(info,index)
                            }}
                        >
                            <ListItemText primary={answer} sx={{textAlign:'center'}} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Card>
    )
}

export const Game = () => {
    const questions = useQuestionStore(state => state.questions)
    const currentQuestion = useQuestionStore(state => state.currentQuestion)
    const goNextQuestion = useQuestionStore(state => state.goNextQuestion)
    const goPreviousQuestion = useQuestionStore(state => state.goPreviousQuestion)

    const questionInfo = questions[currentQuestion]
    return(
        <>
            <Stack direction={`row`} gap={2} alignItems={`center`} justifyContent={`center`}>
                <IconButton onClick={goPreviousQuestion} disabled={currentQuestion===0} >
                    <ArrowBackIosNew />
                </IconButton>

                {currentQuestion+1} / {questions.length}

                <IconButton onClick={goNextQuestion} disabled={currentQuestion>=questions.length-1}>
                    <ArrowForwardIos />
                </IconButton>
            </Stack>
            <Question info={questionInfo} />       
            <Footer />                 
        </>
    )
}