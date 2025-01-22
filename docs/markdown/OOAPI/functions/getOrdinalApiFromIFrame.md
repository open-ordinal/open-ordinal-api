[Open Ordial API](../../README.md) / [OOAPI](../README.md) / getOrdinalApiFromIFrame

# Function: getOrdinalApiFromIFrame()

> **getOrdinalApiFromIFrame**(`iframe`): `Promise`\<`any`\>

Defined in: [src/OOAPI.Core.ts:689](https://github.com/open-ordinal/open-ordinal-api/blob/09ea1ce92dd206b5b26f35b329c90c6b41c2680b/src/OOAPI.Core.ts#L689)

Detects and extracts Open Ordinal API if present in an Iframe.

## Parameters

### iframe

`HTMLIFrameElement`

The iframe element to check for the Open Ordinal API.

## Returns

`Promise`\<`any`\>

- A promise that resolves with the Open Ordinal API if available, otherwise rejects with an error message.
