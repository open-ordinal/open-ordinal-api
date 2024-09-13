[Open Ordial API](../../../README.md) / [ooapi/OOAPI](../README.md) / Composition

# Class: Composition

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

#### Parameters

• **options**: [`IComposition`](../interfaces/IComposition.md)

#### Returns

[`Composition`](Composition.md)

#### Overrides

`Exportable.constructor`

#### Defined in

ooapi/models/globals/Composition.ts:39

## Properties

### id

> **id**: `string`

#### Defined in

ooapi/models/globals/Composition.ts:36

***

### name?

> `optional` **name**: `string`

#### Defined in

ooapi/models/globals/Composition.ts:37

***

### onExport()?

> `optional` **onExport**: () => `Promise`\<`Export`\>

#### Returns

`Promise`\<`Export`\>

#### Inherited from

`Exportable.onExport`

#### Defined in

ooapi/models/utilities/Export.ts:26

## Methods

### canExport()

> **canExport**(): `boolean`

#### Returns

`boolean`

#### Inherited from

`Exportable.canExport`

#### Defined in

ooapi/models/utilities/Export.ts:32

***

### export()

> **export**(): `Promise`\<`string`\>

#### Returns

`Promise`\<`string`\>

#### Inherited from

`Exportable.export`

#### Defined in

ooapi/models/utilities/Export.ts:36
