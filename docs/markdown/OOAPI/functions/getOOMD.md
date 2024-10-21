[Open Ordial API](../../README.md) / [OOAPI](../README.md) / getOOMD

# Function: getOOMD()

> **getOOMD**(`inscriptionId`, `baseUrl`): `Promise`\<[`Metadata`](../namespaces/OOMD/interfaces/Metadata.md)\>

Asynchronously fetches all information about an inscription, including children, sat inscriptions, metadata and its id.
Defaults to using the ID obtained from `getId()` if an `inscriptionId` is not provided.

## Parameters

• **inscriptionId**: `string` = `...`

Inscription to get all information.
                                Defaults to the ID of the page running it if none is given.

• **baseUrl**: `string` = `_baseUrl`

Optional baseUrl for the fetch

## Returns

`Promise`\<[`Metadata`](../namespaces/OOMD/interfaces/Metadata.md)\>

A promise that resolves with all the information about the inscription.

## Defined in

[src/OOAPI.Core.ts:475](https://github.com/open-ordinal/open-ordinal-api/blob/e5d3b68402ab6ae1542219b48b6d5e3ee2104984/src/OOAPI.Core.ts#L475)
