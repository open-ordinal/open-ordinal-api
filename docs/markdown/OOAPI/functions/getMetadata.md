[Open Ordial API](../../README.md) / [OOAPI](../README.md) / getMetadata

# Function: getMetadata()

> **getMetadata**(`id`?, `baseUrl`?): `Promise`\<[`Metadata`](../namespaces/OOMD/interfaces/Metadata.md)\>

Asynchronously retrieves the metadata for a given ID.

## Parameters

• **id?**: `string` = `...`

The unique identifier for the inscription. Defaults to the result of getId().

• **baseUrl?**: `string` = `_baseUrl`

The base URL for the API endpoint. Defaults to _baseUrl.

## Returns

`Promise`\<[`Metadata`](../namespaces/OOMD/interfaces/Metadata.md)\>

- A promise that resolves to the metadata object.

## Defined in

[src/OOAPI.Core.ts:156](https://github.com/open-ordinal/open-ordinal-api/blob/3bda30e010ce0a6e33466519d113a28c8fe2684b/src/OOAPI.Core.ts#L156)
