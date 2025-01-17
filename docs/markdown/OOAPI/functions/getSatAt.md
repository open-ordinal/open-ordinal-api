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

[src/OOAPI.Core.ts:235](https://github.com/open-ordinal/open-ordinal-api/blob/e5d3b68402ab6ae1542219b48b6d5e3ee2104984/src/OOAPI.Core.ts#L235)
