[Open Ordial API](../../../README.md) / [ooapi/OOAPI](../README.md) / getChildrenPage

# Function: getChildrenPage()

> **getChildrenPage**(`inscriptionId`, `page`, `baseUrl`): `Promise`\<`any`\>

Fetches the children of a given inscription.
If no inscription ID is provided, it defaults to using the ID obtained from `getId()`.

## Parameters

• **inscriptionId**: `string` = `...`

The ID of the inscription to get the children of.
                                Defaults to the ID of the page running it if none is given.

• **page**: `number` = `0`

The page number to fetch the children from.

• **baseUrl**: `string` = `_baseUrl`

Optional baseUrl for the fetch.

## Returns

`Promise`\<`any`\>

## Defined in

ooapi/OOAPI.Core.ts:333
