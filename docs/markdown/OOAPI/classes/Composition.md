[Open Ordial API](../../README.md) / [OOAPI](../README.md) / Composition

# Class: Composition

Defined in: [src/models/globals/Composition.ts:35](https://github.com/open-ordinal/open-ordinal-api/blob/a0d5891263931a6fab499adb8c2ba3d4a1ef0c78/src/models/globals/Composition.ts#L35)

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

## Extends

- `Exportable`

## Constructors

### new Composition()

> **new Composition**(`options`): [`Composition`](Composition.md)

Defined in: [src/models/globals/Composition.ts:39](https://github.com/open-ordinal/open-ordinal-api/blob/a0d5891263931a6fab499adb8c2ba3d4a1ef0c78/src/models/globals/Composition.ts#L39)

#### Parameters

##### options

[`IComposition`](../interfaces/IComposition.md)

#### Returns

[`Composition`](Composition.md)

#### Overrides

`Exportable.constructor`

## Properties

### id

> **id**: `string`

Defined in: [src/models/globals/Composition.ts:36](https://github.com/open-ordinal/open-ordinal-api/blob/a0d5891263931a6fab499adb8c2ba3d4a1ef0c78/src/models/globals/Composition.ts#L36)

***

### name?

> `optional` **name**: `string`

Defined in: [src/models/globals/Composition.ts:37](https://github.com/open-ordinal/open-ordinal-api/blob/a0d5891263931a6fab499adb8c2ba3d4a1ef0c78/src/models/globals/Composition.ts#L37)

***

### onExport()?

> `optional` **onExport**: () => `Promise`\<[`Export`](../type-aliases/Export.md)\>

Defined in: [src/models/utilities/Export.ts:32](https://github.com/open-ordinal/open-ordinal-api/blob/a0d5891263931a6fab499adb8c2ba3d4a1ef0c78/src/models/utilities/Export.ts#L32)

#### Returns

`Promise`\<[`Export`](../type-aliases/Export.md)\>

#### Inherited from

`Exportable.onExport`

## Methods

### canExport()

> **canExport**(): `boolean`

Defined in: [src/models/utilities/Export.ts:38](https://github.com/open-ordinal/open-ordinal-api/blob/a0d5891263931a6fab499adb8c2ba3d4a1ef0c78/src/models/utilities/Export.ts#L38)

#### Returns

`boolean`

#### Inherited from

`Exportable.canExport`

***

### export()

> **export**(): `Promise`\<`string`\>

Defined in: [src/models/utilities/Export.ts:42](https://github.com/open-ordinal/open-ordinal-api/blob/a0d5891263931a6fab499adb8c2ba3d4a1ef0c78/src/models/utilities/Export.ts#L42)

#### Returns

`Promise`\<`string`\>

#### Inherited from

`Exportable.export`
