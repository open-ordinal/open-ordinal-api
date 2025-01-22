[Open Ordial API](../../README.md) / [OOAPI](../README.md) / getAll

# Function: getAll()

> **getAll**(`inscriptionId`, `baseUrl`?): `Promise`\<`any`\>

Asynchronously fetches all information about an inscription, including children,
sat inscriptions, metadata, and its ID.
Defaults to using the ID obtained from `getId()` if an `inscriptionId` is not provided.

## Parameters

• **inscriptionId**: `string` = `...`

The ID of the inscription to get all information about.
                                Defaults to the ID of the page running it if none is given.

• **baseUrl?**: `string` = `_baseUrl`

Optional baseUrl for the fetch.

## Returns

`Promise`\<`any`\>

- A promise that resolves with all the information about the inscription.

## Defined in

[src/OOAPI.Core.ts:479](https://github.com/open-ordinal/open-ordinal-api/blob/ba54b4673bb1e87bc0bfb7385c9b290ba69f50f2/src/OOAPI.Core.ts#L479)
