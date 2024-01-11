
import './App.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { JavaScriptLogo } from './components/JavaScriptLogo';
import { Container, Stack, Typography } from '@mui/material';
import { Start } from './components/Start';
import { useQuestionStore } from './store/questions';
import { Game } from './components/Game';

function App() {
  const questions = useQuestionStore(state => state.questions)
  console.log(questions)
  return (
    <main>
      <Container maxWidth='sm'>       
        
          <Stack direction={`row`} gap={2} alignItems={`center`} justifyContent={`center`}>
            <JavaScriptLogo />
            <Typography variant='h2' component={`h1`}>
              Javascript Quizz
            </Typography>
          </Stack>

          {questions.length === 0 && <Start />}
          {questions.length > 0 && <Game />}
      </Container>
    </main>
  )
}

export default App
