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

[src/OOAPI.Core.ts:289](https://github.com/open-ordinal/open-ordinal-api/blob/88ef2e4467b13c07bb5a3ef3483343248c1aa38d/src/OOAPI.Core.ts#L289)
