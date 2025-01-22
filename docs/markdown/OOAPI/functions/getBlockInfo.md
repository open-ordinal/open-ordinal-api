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

[src/OOAPI.Core.ts:518](https://github.com/open-ordinal/open-ordinal-api/blob/ba54b4673bb1e87bc0bfb7385c9b290ba69f50f2/src/OOAPI.Core.ts#L518)
