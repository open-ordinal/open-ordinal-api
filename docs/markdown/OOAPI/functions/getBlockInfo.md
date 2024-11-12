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

[src/OOAPI.Core.ts:540](https://github.com/open-ordinal/open-ordinal-api/blob/70e118e56492403aed907a3616034144dfc18228/src/OOAPI.Core.ts#L540)
