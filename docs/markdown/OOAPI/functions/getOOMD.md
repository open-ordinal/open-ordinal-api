[Open Ordial API](../../README.md) / [OOAPI](../README.md) / getOOMD

# Function: getOOMD()

> **getOOMD**(`inscriptionId`, `baseUrl`): `Promise`\<`Metadata`\>

Asynchronously fetches all information about an inscription, including children, sat inscriptions, metadata and its id.
Defaults to using the ID obtained from `getId()` if an `inscriptionId` is not provided.

## Parameters

• **inscriptionId**: `string` = `...`

Inscription to get all information.
                                Defaults to the ID of the page running it if none is given.

• **baseUrl**: `string` = `_baseUrl`

Optional baseUrl for the fetch

## Returns

`Promise`\<`Metadata`\>

A promise that resolves with all the information about the inscription.

## Defined in

[OOAPI.Core.ts:475](https://github.com/sagaverse-io/SagaverseOrdinalAPI/blob/90d228bc8061a836e19a66b3b1e83f3192c2e482/src/OOAPI.Core.ts#L475)
