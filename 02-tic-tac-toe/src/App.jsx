import { useState } from 'react'
import confetti from "canvas-confetti"
import { Square } from './components/Square'
import { WinnerModal } from './components/WinnerModal'
import { TURNS } from './constants'
import { checkWinner } from './logic/board'

function App() {

  const [board,setBoard] = useState(Array(9).fill(null))

  const [turn,setTurn] = useState(TURNS.X)
  // null = no hay ganador
  // false = empate
  const [winner, setWinner] = useState(null)
  

  const checkEndGame = (boardToCheck) => {
    return boardToCheck.every( (square) => square !== null )
  }

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
  }
  
  const updateBoard = (index) => {
    // no actualizamos esta posición
    // si ya tiene algo
    if(board[index] || winner) return    

    // actualizamos el tablero
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)

    // cambiamos el turno
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)

    const newWinner = checkWinner(newBoard)
    if(newWinner){      
      confetti()
      setWinner( () => {
        return newWinner
      } )
    }else if(checkEndGame(newBoard)){
      setWinner(false)
    }
  }  

  return (
    <>
      <main className='board'>
        <h1>Tic Tac Toe</h1>

        <button onClick={resetGame}>
          Reset del Juego
        </button>

        <section className='game'>
          {
            board.map( (square,index) => {
              return (
                  <Square 
                  key={index} 
                  index={index}
                  updateBoard={updateBoard}
                  >
                    {square}
                  </Square>
                )
            } )
          }
        </section>

        <section className='turn'>
          <Square isSelected={ turn === TURNS.X} >{TURNS.X}</Square>
          <Square isSelected={ turn === TURNS.O} >{TURNS.O}</Square>
        </section>

        <WinnerModal winner={winner} resetGame={resetGame} />
        
      </main>
    </>
  )
}

export default App
