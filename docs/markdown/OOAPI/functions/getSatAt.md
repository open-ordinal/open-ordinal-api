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

[src/OOAPI.Core.ts:237](https://github.com/open-ordinal/open-ordinal-api/blob/14037525f77f2ac0e3d87831f15eb5f7d9ced754/src/OOAPI.Core.ts#L237)
