[Open Ordial API](../../../README.md) / [ooapi/OOAPI](../README.md) / getChildrenAll

# Function: getChildrenAll()

> **getChildrenAll**(`inscriptionId`, `baseUrl`): `Promise`\<`string`[]\>

Fetches all the children of a given inscription.

## Parameters

• **inscriptionId**: `string` = `...`

The ID of the inscription to get the children of.
                                Defaults to the ID obtained from `getId()`.

• **baseUrl**: `string` = `_baseUrl`

Optional baseUrl for the fetch.

## Returns

`Promise`\<`string`[]\>

A promise that resolves with an array of the IDs of the children.

## Defined in

ooapi/OOAPI.Core.ts:361
