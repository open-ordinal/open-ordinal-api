[Open Ordial API](../../README.md) / [OOAPI](../README.md) / getBlockTime

# Function: getBlockTime()

> **getBlockTime**(`baseUrl`?): `Promise`\<`number`\>

Defined in: [src/OOAPI.Core.ts:590](https://github.com/open-ordinal/open-ordinal-api/blob/09ea1ce92dd206b5b26f35b329c90c6b41c2680b/src/OOAPI.Core.ts#L590)

Asynchronously fetches the UNIX time stamp of the latest block.

## Parameters

### baseUrl?

`string` = `_baseUrl`

The base URL for the fetch.

## Returns

`Promise`\<`number`\>

- A promise that resolves with the UNIX time stamp of the latest block.
