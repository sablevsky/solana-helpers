import { RPC_URL } from '../constants'

type PriorityFeesResponse = {
  jsonrpc: string
  result: {
    priorityFeeLevels: {
      min: number
      low: number
      medium: number
      high: number
      veryHigh: number
      unsafeMax: number
    }
  }
  id: string
}

//? Works only with Quicknode and Helius RPCs
export const getPriorityFees = async (accountKeys: string[]) => {
  try {
    const response = await fetch(RPC_URL, {
      method: 'POST',
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: 'my-id',
        method: 'getPriorityFeeEstimate',
        params: [
          {
            accountKeys: accountKeys,
            options: {
              includeAllPriorityFeeLevels: true,
            },
          },
        ],
      }),
    })

    const data = (await response.json()) as PriorityFeesResponse

    console.log(JSON.stringify(data, null, 2))

    return data.result.priorityFeeLevels
  } catch (error) {
    console.error('Error calculating priority fees:', error)
    throw error
  }
}
