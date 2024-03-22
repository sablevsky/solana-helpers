import { clusterApiUrl, PublicKey } from '@solana/web3.js'
import 'dotenv/config'

export const PUBKEY_PLACEHOLDER = '11111111111111111111111111111111'

export const RPC_URL = process.env.RPC_URL ?? clusterApiUrl('mainnet-beta')

export const WALLET_PRIVATE_KEY = process.env.WALLET_PRIVATE_KEY ?? ''

export const BANKSEA_API_BASE = process.env.BANKSEA_API_BASE ?? ''

export const BANKSEA_API_KEY = process.env.BANKSEA_API_KEY ?? ''

export const TOKEN_PROGRAM_ID = new PublicKey(
  process.env.TOKEN_PROGRAM_ID || PUBKEY_PLACEHOLDER
)

export const SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID = new PublicKey(
  process.env.SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID ?? PUBKEY_PLACEHOLDER
)

export const METADATA_PREFIX = 'metadata'
export const EDITION_PREFIX = 'edition'
export const METADATA_PROGRAM_PUBKEY = new PublicKey(
  process.env.METADATA_PROGRAM_PUBKEY ?? PUBKEY_PLACEHOLDER
)

export enum CONSOLE_COLORS {
  RED = '\x1b[31m%s\x1b[0m',
  GREEN = '\x1b[32m%s\x1b[0m',
  YELLOW = '\x1b[33m%s\x1b[0m',
  BLUE = '\x1b[34m%s\x1b[0m',
  MAGENTA = '\x1b[35m%s\x1b[0m',
  CYAN = '\x1b[36m%s\x1b[0m',
}
