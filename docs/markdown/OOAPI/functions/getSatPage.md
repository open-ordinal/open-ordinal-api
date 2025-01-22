[Open Ordial API](../../README.md) / [OOAPI](../README.md) / getSatPage

# Function: getSatPage()

> **getSatPage**(`sat`, `page`?, `baseUrl`?): `Promise`\<`any`\>

Defined in: [src/OOAPI.Core.ts:255](https://github.com/open-ordinal/open-ordinal-api/blob/09ea1ce92dd206b5b26f35b329c90c6b41c2680b/src/OOAPI.Core.ts#L255)

Asynchronously fetches the page data for a specific SAT at a given page number.

## Parameters

### sat

`number`

The SAT number to fetch the page data for.

### page?

`number` = `0`

The page number to fetch. Defaults to 0.

### baseUrl?

`string` = `_baseUrl`

Optional base URL for the fetch. Defaults to _baseUrl.

## Returns

`Promise`\<`any`\>

- A promise that resolves to an object containing the IDs, a boolean indicating if there are more pages, and the current page number.

## Throws

Will throw an error if the fetch operation fails or if the response is not OK.
