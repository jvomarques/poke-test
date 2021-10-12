import { ReactElement } from 'react'

import pokeTestLogo from './assets/images/pokeTestLogo.png'
import style from './home.module.scss'

function Home(): ReactElement {
  return (
    <div>
      <div className={style.pokeTestLogoContainer}>
        <img src={pokeTestLogo} aria-label="PokeTest Logo Image" />
      </div>
    </div>
  )
}

export default Home
