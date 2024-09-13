[Open Ordial API](../../../README.md) / [ooapi/OOAPI](../README.md) / getBlockHash

# Function: getBlockHash()

> **getBlockHash**(`height`, `baseUrl`): `Promise`\<`string`\>

Fetches the block hash at a given block height.

## Parameters

• **height**: `number`

The height of the block to get the hash of.

• **baseUrl**: `string` = `_baseUrl`

Optional baseUrl for the fetch.

## Returns

`Promise`\<`string`\>

A promise that resolves with the hash of the block or null if 404.

## Defined in

ooapi/OOAPI.Core.ts:465
