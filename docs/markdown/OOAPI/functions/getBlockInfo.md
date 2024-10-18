[Open Ordial API](../../README.md) / [OOAPI](../README.md) / getBlockInfo

# Function: getBlockInfo()

> **getBlockInfo**(`blockInfo`, `baseUrl`?): `Promise`\<`any`\>

Asynchronously fetches information about a specific block by block height or block hash.

## Parameters

• **blockInfo**: `string`

The block height or block hash to get information about.

• **baseUrl?**: `string` = `_baseUrl`

Optional baseUrl for the fetch.

## Returns

`Promise`\<`any`\>

- A promise that resolves with the information about the block or null if not found.

## Defined in

[OOAPI.Core.ts:539](https://github.com/sagaverse-io/SagaverseOrdinalAPI/blob/90d228bc8061a836e19a66b3b1e83f3192c2e482/src/OOAPI.Core.ts#L539)
