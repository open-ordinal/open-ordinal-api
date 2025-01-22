[Open Ordial API](../../README.md) / [OOAPI](../README.md) / getInscription

# Function: getInscription()

> **getInscription**(`inscriptionId`?, `baseUrl`?): `Promise`\<`any`\>

Defined in: [src/OOAPI.Core.ts:174](https://github.com/open-ordinal/open-ordinal-api/blob/09ea1ce92dd206b5b26f35b329c90c6b41c2680b/src/OOAPI.Core.ts#L174)

Asynchronously retrieves inscription data for a given inscription ID.

## Parameters

### inscriptionId?

`string` = `...`

The unique identifier for the inscription. Defaults to the result of getId().

### baseUrl?

`string` = `_baseUrl`

The base URL for the API endpoint. Defaults to _baseUrl.

## Returns

`Promise`\<`any`\>

- A promise that resolves to the inscription data or null if the request fails.

## Throws

Will throw an error if the fetch operation fails.
