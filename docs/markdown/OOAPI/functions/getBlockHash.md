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

[src/OOAPI.Core.ts:540](https://github.com/open-ordinal/open-ordinal-api/blob/14037525f77f2ac0e3d87831f15eb5f7d9ced754/src/OOAPI.Core.ts#L540)
