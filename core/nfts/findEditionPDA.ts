import { PublicKey } from '@solana/web3.js'
import {
  EDITION_PREFIX,
  METADATA_PREFIX,
  METADATA_PROGRAM_PUBKEY,
} from '../constants'

type FindEditionPDA = (params: {
  tokenMintAddress: string
}) => Promise<PublicKey>

export const findEditionPDA: FindEditionPDA = async ({ tokenMintAddress }) => {
  const [ATA] = PublicKey.findProgramAddressSync(
    [
      Buffer.from(METADATA_PREFIX),
      METADATA_PROGRAM_PUBKEY.toBuffer(),
      new PublicKey(tokenMintAddress).toBuffer(),
      Buffer.from(EDITION_PREFIX),
    ],
    METADATA_PROGRAM_PUBKEY
  )

  return ATA
}
