import { ReactElement } from 'react'

import pokeTestLogo from './assets/images/pokeTestLogo.png'
import style from './home.module.scss'

function Home(): ReactElement {
  return (
    <div>
      <div className={style.logoContainer}>
        <img src={pokeTestLogo} aria-label="PokeTest Logo Image" />
      </div>
      <div className={style.inputContainer}>
        <input type="text" placeholder="Type a pokemon name" aria-label="Type a pokemon name" />
      </div>
    </div>
  )
}

export default Home
