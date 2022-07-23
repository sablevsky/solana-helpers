import 'dotenv/config'

import { CONSOLE_COLORS } from './constants'
import { getMintListByCreator } from './helpers/getMintListByCreator'

;(async () => {
  try {
    //? Code example
    const mints = await getMintListByCreator({
      creatorAddress: 'EYxVGJfw32cDgyVQJLegUESAwVjjyCdWz841bSWGjgc6',
      creatorsListPosition: 3,
    })

    console.log(CONSOLE_COLORS.CYAN, JSON.stringify(mints, null, 2))
    console.log(CONSOLE_COLORS.RED, mints?.length)
  } catch (error) {
    console.error(error)
  }
})()
