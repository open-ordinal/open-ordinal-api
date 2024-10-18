[Open Ordial API](../../README.md) / [OOAPI](../README.md) / Composition

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

[models/globals/Composition.ts:39](https://github.com/sagaverse-io/SagaverseOrdinalAPI/blob/90d228bc8061a836e19a66b3b1e83f3192c2e482/src/models/globals/Composition.ts#L39)

## Properties

### id

> **id**: `string`

#### Defined in

[models/globals/Composition.ts:36](https://github.com/sagaverse-io/SagaverseOrdinalAPI/blob/90d228bc8061a836e19a66b3b1e83f3192c2e482/src/models/globals/Composition.ts#L36)

***

### name?

> `optional` **name**: `string`

#### Defined in

[models/globals/Composition.ts:37](https://github.com/sagaverse-io/SagaverseOrdinalAPI/blob/90d228bc8061a836e19a66b3b1e83f3192c2e482/src/models/globals/Composition.ts#L37)

***

### onExport()?

> `optional` **onExport**: () => `Promise`\<`Export`\>

#### Returns

`Promise`\<`Export`\>

#### Inherited from

`Exportable.onExport`

#### Defined in

[models/utilities/Export.ts:26](https://github.com/sagaverse-io/SagaverseOrdinalAPI/blob/90d228bc8061a836e19a66b3b1e83f3192c2e482/src/models/utilities/Export.ts#L26)

## Methods

### canExport()

> **canExport**(): `boolean`

#### Returns

`boolean`

#### Inherited from

`Exportable.canExport`

#### Defined in

[models/utilities/Export.ts:32](https://github.com/sagaverse-io/SagaverseOrdinalAPI/blob/90d228bc8061a836e19a66b3b1e83f3192c2e482/src/models/utilities/Export.ts#L32)

***

### export()

> **export**(): `Promise`\<`string`\>

#### Returns

`Promise`\<`string`\>

#### Inherited from

`Exportable.export`

#### Defined in

[models/utilities/Export.ts:36](https://github.com/sagaverse-io/SagaverseOrdinalAPI/blob/90d228bc8061a836e19a66b3b1e83f3192c2e482/src/models/utilities/Export.ts#L36)
