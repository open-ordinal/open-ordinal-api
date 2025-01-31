[Open Ordial API](../../README.md) / [OOAPI](../README.md) / getParentsPage

# Function: getParentsPage()

> **getParentsPage**(`inscriptionId`, `page`, `baseUrl`?): `Promise`\<`any`\>

Defined in: [src/OOAPI.Core.ts:329](https://github.com/open-ordinal/open-ordinal-api/blob/a0d5891263931a6fab499adb8c2ba3d4a1ef0c78/src/OOAPI.Core.ts#L329)

Asynchronously fetches the parents of a given inscription.
If no inscription ID is provided, it defaults to using the ID obtained from `getId()`.

## Parameters

### inscriptionId

`string` = `...`

The ID of the inscription to get the parents of.
                                Defaults to the ID of the page running it if none is given.

### page

`number` = `0`

The page number to fetch the parents from.

### baseUrl?

`string` = `_baseUrl`

Optional baseUrl for the fetch.

## Returns

`Promise`\<`any`\>

- A promise that resolves to an object containing:
                                                                        - ids: An array of parent IDs.
                                                                        - more: A boolean indicating if there are more pages.
                                                                        - page: The current page number.
