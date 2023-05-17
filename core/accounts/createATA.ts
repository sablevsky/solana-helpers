import { createAssociatedTokenAccountInstruction } from '@solana/spl-token'
import { Connection, Keypair, PublicKey, Transaction } from '@solana/web3.js'
import * as bs58 from 'bs58'

import { CONSOLE_COLORS, RPC_URL, WALLET_PRIVATE_KEY } from '../constants'
import { findATA } from './findATA'

type CreateATA = (params: {
  walletAddress: string
  tokenMintAddress: string
}) => Promise<void>

export const createATA: CreateATA = async ({
  walletAddress,
  tokenMintAddress,
}) => {
  const connection = new Connection(RPC_URL)

  const feePayer = Keypair.fromSecretKey(bs58.decode(WALLET_PRIVATE_KEY))

  const ATA = await findATA({
    walletAddress,
    tokenMintAddress,
  })

  const transaction = new Transaction().add(
    createAssociatedTokenAccountInstruction(
      feePayer.publicKey,
      ATA,
      new PublicKey(walletAddress),
      new PublicKey(tokenMintAddress)
    )
  )

  const { blockhash, lastValidBlockHeight } =
    await connection.getLatestBlockhash()
  const signature = await connection.sendTransaction(transaction, [feePayer])

  console.log(CONSOLE_COLORS.GREEN, `Transaction ${signature} sent`)

  await connection.confirmTransaction(
    {
      signature,
      blockhash,
      lastValidBlockHeight,
    },
    'confirmed'
  )

  console.log(CONSOLE_COLORS.GREEN, `Transaction ${signature} confirmed`)

  await connection.confirmTransaction(
    {
      signature,
      blockhash,
      lastValidBlockHeight,
    },
    'finalized'
  )

  console.log(CONSOLE_COLORS.GREEN, `Transaction ${signature} finalized`)
}
