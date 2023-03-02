import './App.css'

function App () {
  return (
    <div>

      <header>
        <form className='form'>
          <input type='text' placeholder='Avengers, Start Wars, The Matrix' />
          <button type='submit'>Buscar</button>
        </form>
      </header>

      <main>
        Results here
      </main>
    </div>
  )
}

export default App
