import { Metaplex } from '@metaplex-foundation/js'
import { Connection, PublicKey } from '@solana/web3.js'
import { allIdentical, isNonEmptyString } from 'ramda-adjunct'
import { compose, filter, prop, map, not, uniq } from 'ramda'

import { CONSOLE_COLORS, RPC_URL } from '../constants'

type GetMintListByCreator = (params: {
  creatorAddress: string
  creatorsListPosition: number
}) => Promise<string[]>

export const getMintListByCreator: GetMintListByCreator = async ({
  creatorAddress,
  creatorsListPosition = 1,
}) => {
  const connection = new Connection(RPC_URL)
  const metaplex = new Metaplex(connection)

  const nfts = await metaplex
    .nfts()
    .findAllByCreator(new PublicKey(creatorAddress), {
      position: creatorsListPosition,
    })
    .run()

  const filteredVerified = nfts.filter(({ creators }) => {
    const targetCreator = creators[creatorsListPosition - 1]
    return (
      targetCreator?.verified &&
      targetCreator?.address.toBase58() === creatorAddress
    )
  })

  if (isSymbolDeviation(filteredVerified)) {
    console.warn(
      CONSOLE_COLORS.YELLOW,
      `NFTs have different symbols. MintList may be unsafe.\nFound symbols: ${getUniqueSymbols(
        filteredVerified
      )}`
    )
  }

  return mintAddresses(filteredVerified)
}

const toBase58 = (publicKey: any): string => publicKey?.toBase58() || ''

const mintAddresses = compose<any, string[], string[]>(
  filter(isNonEmptyString),
  map<any, any>(compose(toBase58, prop('mintAddress')))
)

const getUniqueSymbols = compose(uniq, map(prop('symbol')))

const isSymbolDeviation = compose(not, allIdentical, getUniqueSymbols)
