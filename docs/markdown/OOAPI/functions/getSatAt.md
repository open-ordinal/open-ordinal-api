[Open Ordial API](../../README.md) / [OOAPI](../README.md) / getSatAt

# Function: getSatAt()

> **getSatAt**(`sat`, `index`?, `baseUrl`?): `Promise`\<`any`\>

Asynchronously retrieves SAT data for a given sat number and index.

## Parameters

• **sat**: `number`

The unique identifier for the SAT.

• **index?**: `number` = `-1`

The index for the SAT data. Defaults to -1 which fetches the most recent inscription.

• **baseUrl?**: `string` = `_baseUrl`

The base URL for the API endpoint. Defaults to _baseUrl.

## Returns

`Promise`\<`any`\>

- A promise that resolves to the SAT data.

## Defined in

[OOAPI.Core.ts:235](https://github.com/sagaverse-io/SagaverseOrdinalAPI/blob/90d228bc8061a836e19a66b3b1e83f3192c2e482/src/OOAPI.Core.ts#L235)
