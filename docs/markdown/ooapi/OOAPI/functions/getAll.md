[Open Ordial API](../../../README.md) / [ooapi/OOAPI](../README.md) / getAll

# Function: getAll()

> **getAll**(`inscriptionId`, `baseUrl`): `Promise`\<`any`\>

Fetches all information about an inscription, including children, sat inscriptions, metadata and its id.
Defaults to using the ID obtained from `getId()` if an `inscriptionId` is not provided.

## Parameters

• **inscriptionId**: `string` = `...`

Inscription to get all information.
                                Defaults to the ID of the page running it if none is given.

• **baseUrl**: `string` = `_baseUrl`

Optional baseUrl for the fetch

## Returns

`Promise`\<`any`\>

A promise that resolves with all the information about the inscription.

## Defined in

ooapi/OOAPI.Core.ts:413
