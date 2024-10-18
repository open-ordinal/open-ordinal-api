[Open Ordial API](../../README.md) / [OOAPI](../README.md) / getSatPage

# Function: getSatPage()

> **getSatPage**(`sat`, `page`?, `baseUrl`?): `Promise`\<`any`\>

Asynchronously fetches the page data for a specific SAT at a given page number.

## Parameters

• **sat**: `number`

The SAT number to fetch the page data for.

• **page?**: `number` = `0`

The page number to fetch. Defaults to 0.

• **baseUrl?**: `string` = `_baseUrl`

Optional base URL for the fetch. Defaults to _baseUrl.

## Returns

`Promise`\<`any`\>

- A promise that resolves to an object containing the IDs, a boolean indicating if there are more pages, and the current page number.

## Throws

Will throw an error if the fetch operation fails or if the response is not OK.

## Defined in

[src/OOAPI.Core.ts:253](https://github.com/open-ordinal/open-ordinal-api/blob/727b99edb71d9e2feb76fbc2eae8d4b22e6a8312/src/OOAPI.Core.ts#L253)
