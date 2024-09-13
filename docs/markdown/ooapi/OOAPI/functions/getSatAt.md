[Open Ordial API](../../../README.md) / [ooapi/OOAPI](../README.md) / getSatAt

# Function: getSatAt()

> **getSatAt**(`sat`, `index`, `baseUrl`): `Promise`\<`any`\>

Fetches a single inscription on a sat based on index.
If index is not provided, it defaults to -1, which fetches the most recent inscription.

## Parameters

• **sat**: `number`

The sat to fetch the inscription from.

• **index**: `number` = `-1`

The index of the inscription to fetch. Defaults to -1.

• **baseUrl**: `string` = `_baseUrl`

Optinal baseUrl for the fetch.

## Returns

`Promise`\<`any`\>

A promise that resolves with the fetched inscriptionId.

## Defined in

ooapi/OOAPI.Core.ts:208
