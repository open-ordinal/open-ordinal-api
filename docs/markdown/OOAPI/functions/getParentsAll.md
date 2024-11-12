[Open Ordial API](../../README.md) / [OOAPI](../README.md) / getParentsAll

# Function: getParentsAll()

> **getParentsAll**(`inscriptionId`, `baseUrl`?): `Promise`\<`string`[]\>

Asynchronously fetches all the parents of a given inscription.

## Parameters

• **inscriptionId**: `string` = `...`

The ID of the inscription to get the parents of.
                                Defaults to the ID obtained from `getId()`.

• **baseUrl?**: `string` = `_baseUrl`

Optional baseUrl for the fetch.

## Returns

`Promise`\<`string`[]\>

- A promise that resolves with an array of the IDs of the parents.

## Defined in

[src/OOAPI.Core.ts:370](https://github.com/open-ordinal/open-ordinal-api/blob/70e118e56492403aed907a3616034144dfc18228/src/OOAPI.Core.ts#L370)
