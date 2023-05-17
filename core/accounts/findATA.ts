import { PublicKey } from '@solana/web3.js'

import {
  SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID,
  TOKEN_PROGRAM_ID,
} from '../constants'

type FindATA = (params: {
  walletAddress: string
  tokenMintAddress: string
}) => Promise<PublicKey>

export const findATA: FindATA = async ({ walletAddress, tokenMintAddress }) => {
  const [ATA] = await PublicKey.findProgramAddress(
    [
      new PublicKey(walletAddress).toBuffer(),
      TOKEN_PROGRAM_ID.toBuffer(),
      new PublicKey(tokenMintAddress).toBuffer(),
    ],
    SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID
  )

  return ATA
}
