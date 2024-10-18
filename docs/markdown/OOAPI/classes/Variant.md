[Open Ordial API](../../README.md) / [OOAPI](../README.md) / Variant

# Class: Variant

Variant Class
A Variant is a variant of the ordinal. It's a visual distinct visual representation.
It can be 2D and / or 3D or any other variation. Not to be confused with Composition.

## Extends

- `Exportable`

## Constructors

### new Variant()

> **new Variant**(`options`): [`Variant`](Variant.md)

#### Parameters

• **options**: [`IVariant`](../interfaces/IVariant.md)

#### Returns

[`Variant`](Variant.md)

#### Overrides

`Exportable.constructor`

#### Defined in

[models/globals/Variant.ts:30](https://github.com/sagaverse-io/SagaverseOrdinalAPI/blob/90d228bc8061a836e19a66b3b1e83f3192c2e482/src/models/globals/Variant.ts#L30)

## Properties

### id

> **id**: `string`

#### Defined in

[models/globals/Variant.ts:24](https://github.com/sagaverse-io/SagaverseOrdinalAPI/blob/90d228bc8061a836e19a66b3b1e83f3192c2e482/src/models/globals/Variant.ts#L24)

***

### type?

> `optional` **type**: [`OrdinalType`](../enumerations/OrdinalType.md)

#### Defined in

[models/globals/Variant.ts:25](https://github.com/sagaverse-io/SagaverseOrdinalAPI/blob/90d228bc8061a836e19a66b3b1e83f3192c2e482/src/models/globals/Variant.ts#L25)

***

### name?

> `optional` **name**: `string`

#### Defined in

[models/globals/Variant.ts:26](https://github.com/sagaverse-io/SagaverseOrdinalAPI/blob/90d228bc8061a836e19a66b3b1e83f3192c2e482/src/models/globals/Variant.ts#L26)

***

### onDisplay()?

> `optional` **onDisplay**: () => `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Defined in

[models/globals/Variant.ts:27](https://github.com/sagaverse-io/SagaverseOrdinalAPI/blob/90d228bc8061a836e19a66b3b1e83f3192c2e482/src/models/globals/Variant.ts#L27)

***

### onHide()?

> `optional` **onHide**: () => `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Defined in

[models/globals/Variant.ts:28](https://github.com/sagaverse-io/SagaverseOrdinalAPI/blob/90d228bc8061a836e19a66b3b1e83f3192c2e482/src/models/globals/Variant.ts#L28)

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

### show()

> **show**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Defined in

[models/globals/Variant.ts:39](https://github.com/sagaverse-io/SagaverseOrdinalAPI/blob/90d228bc8061a836e19a66b3b1e83f3192c2e482/src/models/globals/Variant.ts#L39)

***

### hide()

> **hide**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Defined in

[models/globals/Variant.ts:70](https://github.com/sagaverse-io/SagaverseOrdinalAPI/blob/90d228bc8061a836e19a66b3b1e83f3192c2e482/src/models/globals/Variant.ts#L70)

***

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
