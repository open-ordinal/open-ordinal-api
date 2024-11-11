[Open Ordial API](../../README.md) / [OOAPI](../README.md) / getParentsPage

# Function: getParentsPage()

> **getParentsPage**(`inscriptionId`, `page`, `baseUrl`?): `Promise`\<`any`\>

Asynchronously fetches the parents of a given inscription.
If no inscription ID is provided, it defaults to using the ID obtained from `getId()`.

## Parameters

• **inscriptionId**: `string` = `...`

The ID of the inscription to get the parents of.
                                Defaults to the ID of the page running it if none is given.

• **page**: `number` = `0`

The page number to fetch the parents from.

• **baseUrl?**: `string` = `_baseUrl`

Optional baseUrl for the fetch.

## Returns

`Promise`\<`any`\>

- A promise that resolves to an object containing:
                                                                        - ids: An array of parent IDs.
                                                                        - more: A boolean indicating if there are more pages.
                                                                        - page: The current page number.

## Defined in

[src/OOAPI.Core.ts:328](https://github.com/open-ordinal/open-ordinal-api/blob/88ef2e4467b13c07bb5a3ef3483343248c1aa38d/src/OOAPI.Core.ts#L328)
