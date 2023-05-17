import { PublicKey } from '@solana/web3.js'

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

const METADATA_PREFIX = 'metadata'
const EDITION_PREFIX = 'edition'
const METADATA_PROGRAM_PUBKEY = new PublicKey(
  'metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s'
)
