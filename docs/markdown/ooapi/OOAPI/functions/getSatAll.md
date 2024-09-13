[Open Ordial API](../../../README.md) / [ooapi/OOAPI](../README.md) / getSatAll

# Function: getSatAll()

> **getSatAll**(`sat`, `baseUrl`): `Promise`\<`string`[]\>

Fetches all the inscriptions on a sat.
The function fetches the inscriptions in pages, and continues fetching until there are no more pages.

## Parameters

• **sat**: `number`

The sat to fetch the inscriptions from.

• **baseUrl**: `string` = `_baseUrl`

Optional baseUrl for the fetch.

## Returns

`Promise`\<`string`[]\>

A promise that resolves with an array of the IDs of the inscriptions.

## Defined in

ooapi/OOAPI.Core.ts:246
