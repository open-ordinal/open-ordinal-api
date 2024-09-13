[Open Ordial API](../../../README.md) / [ooapi/OOAPI](../README.md) / getParentsAll

# Function: getParentsAll()

> **getParentsAll**(`inscriptionId`, `baseUrl`): `Promise`\<`string`[]\>

Fetches all the parents of a given inscription.

## Parameters

• **inscriptionId**: `string` = `...`

The ID of the inscription to get the parents of.
                                Defaults to the ID obtained from `getId()`.

• **baseUrl**: `string` = `_baseUrl`

Optional baseUrl for the fetch.

## Returns

`Promise`\<`string`[]\>

A promise that resolves with an array of the IDs of the parents.

## Defined in

ooapi/OOAPI.Core.ts:303
