import 'dotenv/config'

import { getMintListByCreator, writeJson } from './helpers'

;(async () => {
  try {
    //? Code example
    const mints = await getMintListByCreator({
      creatorAddress: 'EYxVGJfw32cDgyVQJLegUESAwVjjyCdWz841bSWGjgc6',
      creatorsListPosition: 3,
    })

    await writeJson({ input: mints })
  } catch (error) {
    console.error(error)
  }
})()
