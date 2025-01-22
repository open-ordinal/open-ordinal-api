[Open Ordial API](../../README.md) / [OOAPI](../README.md) / getSatAll

# Function: getSatAll()

> **getSatAll**(`sat`, `baseUrl`?): `Promise`\<`string`[]\>

Asynchronously fetches all the inscriptions on a given SAT.
The function fetches the inscriptions in pages and continues fetching until there are no more pages.

## Parameters

• **sat**: `number`

The SAT number to fetch the inscriptions from.

• **baseUrl?**: `string` = `_baseUrl`

Optional base URL for the fetch. Defaults to _baseUrl.

## Returns

`Promise`\<`string`[]\>

- A promise that resolves with an array of the IDs of the inscriptions.

## Defined in

[src/OOAPI.Core.ts:290](https://github.com/open-ordinal/open-ordinal-api/blob/14037525f77f2ac0e3d87831f15eb5f7d9ced754/src/OOAPI.Core.ts#L290)
