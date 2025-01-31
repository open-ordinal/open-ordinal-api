[Open Ordial API](../../README.md) / [OOAPI](../README.md) / getBlockTime

# Function: getBlockTime()

> **getBlockTime**(`baseUrl`?): `Promise`\<`number`\>

Defined in: [src/OOAPI.Core.ts:590](https://github.com/open-ordinal/open-ordinal-api/blob/a0d5891263931a6fab499adb8c2ba3d4a1ef0c78/src/OOAPI.Core.ts#L590)

Asynchronously fetches the UNIX time stamp of the latest block.

## Parameters

### baseUrl?

`string` = `_baseUrl`

The base URL for the fetch.

## Returns

`Promise`\<`number`\>

- A promise that resolves with the UNIX time stamp of the latest block.
