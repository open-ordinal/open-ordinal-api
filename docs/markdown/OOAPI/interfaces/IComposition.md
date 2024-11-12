[Open Ordial API](../../README.md) / [OOAPI](../README.md) / IComposition

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

[src/models/globals/Composition.ts:17](https://github.com/open-ordinal/open-ordinal-api/blob/70e118e56492403aed907a3616034144dfc18228/src/models/globals/Composition.ts#L17)

***

### name?

> `optional` **name**: `string`

#### Defined in

[src/models/globals/Composition.ts:18](https://github.com/open-ordinal/open-ordinal-api/blob/70e118e56492403aed907a3616034144dfc18228/src/models/globals/Composition.ts#L18)

***

### onExport()?

> `optional` **onExport**: () => `Promise`\<[`Export`](../type-aliases/Export.md)\>

#### Returns

`Promise`\<[`Export`](../type-aliases/Export.md)\>

#### Defined in

[src/models/globals/Composition.ts:19](https://github.com/open-ordinal/open-ordinal-api/blob/70e118e56492403aed907a3616034144dfc18228/src/models/globals/Composition.ts#L19)
