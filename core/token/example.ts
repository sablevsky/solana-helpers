import { createMetaplexMetadataAccountV3 } from './createMetaplexMetadataAccountV3'

const runExample = async () => {
  const result = await createMetaplexMetadataAccountV3({
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
  })

  console.log({ result })
}
