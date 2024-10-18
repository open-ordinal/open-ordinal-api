[Open Ordial API](../../README.md) / [OOAPI](../README.md) / getChildrenAll

# Function: getChildrenAll()

> **getChildrenAll**(`inscriptionId`, `baseUrl`?): `Promise`\<`string`[]\>

Asynchronously fetches all the children of a given inscription.

## Parameters

• **inscriptionId**: `string` = `...`

The ID of the inscription to get the children of.
                                Defaults to the ID obtained from `getId()`.

• **baseUrl?**: `string` = `_baseUrl`

Optional baseUrl for the fetch.

## Returns

`Promise`\<`string`[]\>

- A promise that resolves with an array of the IDs of the children.

## Defined in

[OOAPI.Core.ts:445](https://github.com/sagaverse-io/SagaverseOrdinalAPI/blob/90d228bc8061a836e19a66b3b1e83f3192c2e482/src/OOAPI.Core.ts#L445)
