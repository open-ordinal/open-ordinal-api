[Open Ordial API](../../README.md) / [OOAPI](../README.md) / getBlockInfo

# Function: getBlockInfo()

> **getBlockInfo**(`blockInfo`, `baseUrl`?): `Promise`\<`any`\>

Defined in: [src/OOAPI.Core.ts:518](https://github.com/open-ordinal/open-ordinal-api/blob/09ea1ce92dd206b5b26f35b329c90c6b41c2680b/src/OOAPI.Core.ts#L518)

Asynchronously fetches information about a specific block by block height or block hash.

## Parameters

### blockInfo

`string`

The block height or block hash to get information about.

### baseUrl?

`string` = `_baseUrl`

Optional baseUrl for the fetch.

## Returns

`Promise`\<`any`\>

- A promise that resolves with the information about the block or null if not found.
