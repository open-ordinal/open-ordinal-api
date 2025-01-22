[Open Ordial API](../../README.md) / [OOAPI](../README.md) / getAll

# Function: getAll()

> **getAll**(`inscriptionId`, `baseUrl`?): `Promise`\<`any`\>

Defined in: [src/OOAPI.Core.ts:479](https://github.com/open-ordinal/open-ordinal-api/blob/09ea1ce92dd206b5b26f35b329c90c6b41c2680b/src/OOAPI.Core.ts#L479)

Asynchronously fetches all information about an inscription, including children,
sat inscriptions, metadata, and its ID.
Defaults to using the ID obtained from `getId()` if an `inscriptionId` is not provided.

## Parameters

### inscriptionId

`string` = `...`

The ID of the inscription to get all information about.
                                Defaults to the ID of the page running it if none is given.

### baseUrl?

`string` = `_baseUrl`

Optional baseUrl for the fetch.

## Returns

`Promise`\<`any`\>

- A promise that resolves with all the information about the inscription.
