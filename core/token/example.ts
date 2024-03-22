import { getPriorityFees } from '../common/getPriorityFees'
import { METADATA_PROGRAM_PUBKEY } from '../constants'
import { createMetaplexMetadataAccountV3 } from './createMetaplexMetadataAccountV3'

const runExample = async () => {
  const { veryHigh } = await getPriorityFees([
    METADATA_PROGRAM_PUBKEY.toBase58(),
  ])

  const priorityFee = Math.trunc(veryHigh)

  const result = await createMetaplexMetadataAccountV3({
    args: {
      mint: 'BANXbTpN8U2cU41FjPxe2Ti37PiT5cCxLUKDQZuJeMMR',
      data: {
        name: 'Banx',
        symbol: 'BANX',
        uri: 'https://arweave.net/OJzmpcpgo217DCNTydnWgbUFEpXgYMQDfAnQGlsQeDI',
        sellerFeeBasisPoints: 0,
        creators: null,
        collection: null,
        uses: null,
      },
      isMutable: false,
    },
    priorityFee,
  })

  console.log({ result })
}
