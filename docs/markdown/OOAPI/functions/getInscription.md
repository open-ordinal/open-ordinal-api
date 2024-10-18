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

[OOAPI.Core.ts:174](https://github.com/sagaverse-io/SagaverseOrdinalAPI/blob/90d228bc8061a836e19a66b3b1e83f3192c2e482/src/OOAPI.Core.ts#L174)
