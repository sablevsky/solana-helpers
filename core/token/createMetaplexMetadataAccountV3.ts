import { createUmi } from '@metaplex-foundation/umi-bundle-defaults'
import { RPC_URL, WALLET_PRIVATE_KEY } from '../constants'
import {
  CreateMetadataAccountV3InstructionAccounts,
  CreateMetadataAccountV3InstructionArgs,
  DataV2Args,
  createMetadataAccountV3,
} from '@metaplex-foundation/mpl-token-metadata'
import * as bs58 from 'bs58'
import { createSignerFromKeypair } from '@metaplex-foundation/umi'
import { base58 } from '@metaplex-foundation/umi/serializers'
import { setComputeUnitPrice } from '@metaplex-foundation/mpl-toolbox'
import { PublicKey } from '@solana/web3.js'
import { fromWeb3JsPublicKey } from '@metaplex-foundation/umi-web3js-adapters'

export type CreateMetadataAccountV3Args =
  CreateMetadataAccountV3InstructionAccounts &
    CreateMetadataAccountV3InstructionArgs

type CreateMetaplexMetadataAccountV3Props = {
  args: {
    mint: string
    data: DataV2Args
    isMutable: boolean
  }
  priorityFee?: number
}

export const createMetaplexMetadataAccountV3 = async ({
  args,
  priorityFee,
}: CreateMetaplexMetadataAccountV3Props) => {
  const umi = createUmi(RPC_URL)

  const keypair = umi.eddsa.createKeypairFromSecretKey(
    bs58.decode(WALLET_PRIVATE_KEY)
  )

  const signer = createSignerFromKeypair(umi, keypair)

  umi.identity = signer
  umi.payer = signer

  const transaction = createMetadataAccountV3(umi, {
    mint: fromWeb3JsPublicKey(new PublicKey(args.mint)),
    mintAuthority: signer,
    payer: signer,
    updateAuthority: signer.publicKey,
    data: args.data,
    isMutable: args.isMutable,
    collectionDetails: null,
  }).add(setComputeUnitPrice(umi, { microLamports: priorityFee || 0 }))

  const { signature: transactionSignature } = await transaction.sendAndConfirm(
    umi
  )
  const signature = base58.deserialize(transactionSignature)

  return signature
}
