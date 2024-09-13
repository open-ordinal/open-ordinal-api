[Open Ordial API](../../../README.md) / [ooapi/OOAPI](../README.md) / IComposition

# Interface: IComposition

A Composition in the Open Ordinal API is a single image as a combination
of assets. This can be a single image with different assets combined (staged).

Examples of what a Composition can be:
- Single image composed of multiple assets
- Animated GIF
- Rigged of multiple assets
- PFP (With background),
- PFP (No background)
- PFP Theme
- and so on...

## Properties

### id

> **id**: `string`

#### Defined in

ooapi/models/globals/Composition.ts:17

***

### name?

> `optional` **name**: `string`

#### Defined in

ooapi/models/globals/Composition.ts:18

***

### onExport()?

> `optional` **onExport**: () => `Promise`\<`Export`\>

#### Returns

`Promise`\<`Export`\>

#### Defined in

ooapi/models/globals/Composition.ts:19
