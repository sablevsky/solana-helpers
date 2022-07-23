import { clusterApiUrl, PublicKey } from '@solana/web3.js'

export const RPC_URL = process.env.RPC_URL || clusterApiUrl('mainnet-beta')

export const TOKEN_PROGRAM_ID = new PublicKey(
  'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA'
)

export const SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID = new PublicKey(
  'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL'
)

export enum CONSOLE_COLORS {
  RED = '\x1b[31m%s\x1b[0m',
  GREEN = '\x1b[32m%s\x1b[0m',
  YELLOW = '\x1b[33m%s\x1b[0m',
  BLUE = '\x1b[34m%s\x1b[0m',
  MAGENTA = '\x1b[35m%s\x1b[0m',
  CYAN = '\x1b[36m%s\x1b[0m',
}