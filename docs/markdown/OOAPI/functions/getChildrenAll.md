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

[src/OOAPI.Core.ts:446](https://github.com/open-ordinal/open-ordinal-api/blob/70e118e56492403aed907a3616034144dfc18228/src/OOAPI.Core.ts#L446)
