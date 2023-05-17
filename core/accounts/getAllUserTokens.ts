import { AccountLayout } from '@solana/spl-token'
import { Connection, PublicKey } from '@solana/web3.js'
import BN from 'bn.js'

import { RPC_URL, TOKEN_PROGRAM_ID } from '../constants'

export interface TokenView {
  tokenAccountPubkey: string
  mint: string
  owner: string
  amount: number
  amountBN: BN
  delegateOption: boolean
  delegate: string
  state: number
  isNativeOption: boolean
  isNative: number
  delegatedAmount: number
  closeAuthorityOption: boolean
  closeAuthority: string
}

type getAllUserTokens = (props: {
  walletAddress: string
}) => Promise<TokenView[]>

export const getAllUserTokens: getAllUserTokens = async ({ walletAddress }) => {
  const connection = new Connection(RPC_URL)

  const { value: tokenAccounts } = await connection.getTokenAccountsByOwner(
    new PublicKey(walletAddress),
    { programId: TOKEN_PROGRAM_ID },
    'singleGossip'
  )

  return (
    tokenAccounts?.map(({ pubkey, account }) => {
      const accountData = AccountLayout.decode(account.data)

      const amountNum = accountData.amount
        ? new BN(accountData.amount.toString(), 10, 'le')?.toNumber()
        : -1

      return {
        tokenAccountPubkey: pubkey.toBase58(),
        mint: new PublicKey(accountData.mint).toBase58(),
        owner: new PublicKey(accountData.owner).toBase58(),
        amount: amountNum,
        amountBN: new BN(accountData.amount.toString(), 10, 'le'),
        delegateOption: !!accountData.delegateOption,
        delegate: accountData.delegate.toBase58(),
        state: accountData.state,
        isNativeOption: !!accountData.isNativeOption,
        isNative: new BN(accountData.isNative.toString(), 10, 'le').toNumber(),
        delegatedAmount: new BN(
          accountData.delegatedAmount.toString(),
          10,
          'le'
        ).toNumber(),
        closeAuthorityOption: !!accountData.closeAuthorityOption,
        closeAuthority: accountData.closeAuthority.toBase58(),
      }
    }) || []
  )
}
