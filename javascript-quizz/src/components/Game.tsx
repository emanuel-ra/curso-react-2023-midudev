import { Card, IconButton, List, ListItem, ListItemButton, ListItemText, Stack, Typography } from "@mui/material"
import { useQuestionStore } from "../store/questions"
import SyntaxHighlighter from 'react-syntax-highlighter';
import { gradientDark } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import { type Question as QuestionType } from "../types"

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
                        <ListItemButton onClick={createHandleClick(index)}>
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

    const questionInfo = questions[currentQuestion]
    return(
        <>
            <Question info={questionInfo} />            
        </>
    )
}