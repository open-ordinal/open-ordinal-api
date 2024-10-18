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

[OOAPI.Core.ts:500](https://github.com/sagaverse-io/SagaverseOrdinalAPI/blob/90d228bc8061a836e19a66b3b1e83f3192c2e482/src/OOAPI.Core.ts#L500)
