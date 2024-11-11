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

[src/OOAPI.Core.ts:476](https://github.com/open-ordinal/open-ordinal-api/blob/88ef2e4467b13c07bb5a3ef3483343248c1aa38d/src/OOAPI.Core.ts#L476)
