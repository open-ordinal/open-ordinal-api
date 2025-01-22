[Open Ordial API](../../README.md) / [OOAPI](../README.md) / getBlockHash

# Function: getBlockHash()

> **getBlockHash**(`height`, `baseUrl`?): `Promise`\<`string`\>

Defined in: [src/OOAPI.Core.ts:540](https://github.com/open-ordinal/open-ordinal-api/blob/09ea1ce92dd206b5b26f35b329c90c6b41c2680b/src/OOAPI.Core.ts#L540)

Asynchronously fetches the block hash at a given block height.

## Parameters

### height

`number`

The height of the block to get the hash of.

### baseUrl?

`string` = `_baseUrl`

Optional baseUrl for the fetch.

## Returns

`Promise`\<`string`\>

- A promise that resolves with the hash of the block or null if not found.
