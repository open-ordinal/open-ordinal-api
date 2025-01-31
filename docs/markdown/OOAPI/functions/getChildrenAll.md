[Open Ordial API](../../README.md) / [OOAPI](../README.md) / getChildrenAll

# Function: getChildrenAll()

> **getChildrenAll**(`inscriptionId`, `baseUrl`?): `Promise`\<`string`[]\>

Defined in: [src/OOAPI.Core.ts:447](https://github.com/open-ordinal/open-ordinal-api/blob/a0d5891263931a6fab499adb8c2ba3d4a1ef0c78/src/OOAPI.Core.ts#L447)

Asynchronously fetches all the children of a given inscription.

## Parameters

### inscriptionId

`string` = `...`

The ID of the inscription to get the children of.
                                Defaults to the ID obtained from `getId()`.

### baseUrl?

`string` = `_baseUrl`

Optional baseUrl for the fetch.

## Returns

`Promise`\<`string`[]\>

- A promise that resolves with an array of the IDs of the children.
