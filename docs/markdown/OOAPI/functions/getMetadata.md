[Open Ordial API](../../README.md) / [OOAPI](../README.md) / getMetadata

# Function: getMetadata()

> **getMetadata**(`id`?, `baseUrl`?): `Promise`\<[`Metadata`](../namespaces/OOMD/interfaces/Metadata.md)\>

Defined in: [src/OOAPI.Core.ts:156](https://github.com/open-ordinal/open-ordinal-api/blob/a0d5891263931a6fab499adb8c2ba3d4a1ef0c78/src/OOAPI.Core.ts#L156)

Asynchronously retrieves the metadata for a given ID.

## Parameters

### id?

`string` = `...`

The unique identifier for the inscription. Defaults to the result of getId().

### baseUrl?

`string` = `_baseUrl`

The base URL for the API endpoint. Defaults to _baseUrl.

## Returns

`Promise`\<[`Metadata`](../namespaces/OOMD/interfaces/Metadata.md)\>

- A promise that resolves to the metadata object.
