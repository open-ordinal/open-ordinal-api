[Open Ordial API](../../README.md) / [OOAPI](../README.md) / getOrdinalApiFromIFrame

# Function: getOrdinalApiFromIFrame()

> **getOrdinalApiFromIFrame**(`iframe`): `Promise`\<`any`\>

Defined in: [src/OOAPI.Core.ts:689](https://github.com/open-ordinal/open-ordinal-api/blob/a0d5891263931a6fab499adb8c2ba3d4a1ef0c78/src/OOAPI.Core.ts#L689)

Detects and extracts Open Ordinal API if present in an Iframe.

## Parameters

### iframe

`HTMLIFrameElement`

The iframe element to check for the Open Ordinal API.

## Returns

`Promise`\<`any`\>

- A promise that resolves with the Open Ordinal API if available, otherwise rejects with an error message.
