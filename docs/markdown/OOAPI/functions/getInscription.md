[Open Ordial API](../../README.md) / [OOAPI](../README.md) / getInscription

# Function: getInscription()

> **getInscription**(`inscriptionId`?, `baseUrl`?): `Promise`\<`any`\>

Asynchronously retrieves inscription data for a given inscription ID.

## Parameters

• **inscriptionId?**: `string` = `...`

The unique identifier for the inscription. Defaults to the result of getId().

• **baseUrl?**: `string` = `_baseUrl`

The base URL for the API endpoint. Defaults to _baseUrl.

## Returns

`Promise`\<`any`\>

- A promise that resolves to the inscription data or null if the request fails.

## Throws

Will throw an error if the fetch operation fails.

## Defined in

[src/OOAPI.Core.ts:173](https://github.com/open-ordinal/open-ordinal-api/blob/88ef2e4467b13c07bb5a3ef3483343248c1aa38d/src/OOAPI.Core.ts#L173)
