import './App.css'
import { useRef } from 'react'
import { useMovies } from './hooks/useMovies'
import { Movies } from './components/Movies'

function App () {
  const { movies } = useMovies()
  const inputRef = useRef()

  const handleSubmit = (event) => {
    event.preventDefault()
    const { query } = Object.fromEntries(new window.FormData(event.target))
    console.log({ query })
  }

  return (
    <div className='page'>

      <header>
        <h1>Buscardor de Peliculas</h1>
        <form className='form' onSubmit={handleSubmit}>
          <input name='query' ref={inputRef} type='text' placeholder='Avengers, Start Wars, The Matrix' />
          <button type='submit'>Buscar</button>
        </form>
      </header>

      <main>
        <Movies movies={movies} />
      </main>
    </div>
  )
}

export default App
