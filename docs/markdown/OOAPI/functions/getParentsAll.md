[Open Ordial API](../../README.md) / [OOAPI](../README.md) / getParentsAll

# Function: getParentsAll()

> **getParentsAll**(`inscriptionId`, `baseUrl`?): `Promise`\<`string`[]\>

Asynchronously fetches all the parents of a given inscription.

## Parameters

• **inscriptionId**: `string` = `...`

The ID of the inscription to get the parents of.
                                Defaults to the ID obtained from `getId()`.

• **baseUrl?**: `string` = `_baseUrl`

Optional baseUrl for the fetch.

## Returns

`Promise`\<`string`[]\>

- A promise that resolves with an array of the IDs of the parents.

## Defined in

[src/OOAPI.Core.ts:371](https://github.com/open-ordinal/open-ordinal-api/blob/3bda30e010ce0a6e33466519d113a28c8fe2684b/src/OOAPI.Core.ts#L371)
