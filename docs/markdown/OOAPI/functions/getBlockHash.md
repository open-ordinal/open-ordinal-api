[Open Ordial API](../../README.md) / [OOAPI](../README.md) / getBlockHash

# Function: getBlockHash()

> **getBlockHash**(`height`, `baseUrl`?): `Promise`\<`string`\>

Asynchronously fetches the block hash at a given block height.

## Parameters

• **height**: `number`

The height of the block to get the hash of.

• **baseUrl?**: `string` = `_baseUrl`

Optional baseUrl for the fetch.

## Returns

`Promise`\<`string`\>

- A promise that resolves with the hash of the block or null if not found.

## Defined in

[src/OOAPI.Core.ts:540](https://github.com/open-ordinal/open-ordinal-api/blob/ba54b4673bb1e87bc0bfb7385c9b290ba69f50f2/src/OOAPI.Core.ts#L540)
