import { BANKSEA_API_BASE, BANKSEA_API_KEY, CONSOLE_COLORS } from '../constants'

type GetBankseaCollections = () => Promise<
  | {
      collection: string
      name: string
      verified: string
      symbol: string
    }[]
  | null
>

export const getBankseaCollections: GetBankseaCollections = async () => {
  try {
    const responseData = await (
      await fetch(`${BANKSEA_API_BASE}/nft/v1/collection/list`, {
        headers: {
          'x-api-key': BANKSEA_API_KEY,
          'Content-Type': 'application/json; charset=utf-8',
        },
      })
    ).json()

    return await responseData.data
  } catch (error) {
    console.error(CONSOLE_COLORS.RED, error)
    return null
  }
}
