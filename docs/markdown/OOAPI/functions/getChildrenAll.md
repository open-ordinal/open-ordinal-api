[Open Ordial API](../../README.md) / [OOAPI](../README.md) / getChildrenAll

# Function: getChildrenAll()

> **getChildrenAll**(`inscriptionId`, `baseUrl`?): `Promise`\<`string`[]\>

Asynchronously fetches all the children of a given inscription.

## Parameters

• **inscriptionId**: `string` = `...`

The ID of the inscription to get the children of.
                                Defaults to the ID obtained from `getId()`.

• **baseUrl?**: `string` = `_baseUrl`

Optional baseUrl for the fetch.

## Returns

`Promise`\<`string`[]\>

- A promise that resolves with an array of the IDs of the children.

## Defined in

[src/OOAPI.Core.ts:447](https://github.com/open-ordinal/open-ordinal-api/blob/ba54b4673bb1e87bc0bfb7385c9b290ba69f50f2/src/OOAPI.Core.ts#L447)
