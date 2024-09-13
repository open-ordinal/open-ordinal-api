[Open Ordial API](../../../README.md) / [ooapi/OOAPI](../README.md) / Variant

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

ooapi/models/globals/Variant.ts:30

## Properties

### id

> **id**: `string`

#### Defined in

ooapi/models/globals/Variant.ts:24

***

### name?

> `optional` **name**: `string`

#### Defined in

ooapi/models/globals/Variant.ts:26

***

### onDisplay()?

> `optional` **onDisplay**: () => `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Defined in

ooapi/models/globals/Variant.ts:27

***

### onExport()?

> `optional` **onExport**: () => `Promise`\<`Export`\>

#### Returns

`Promise`\<`Export`\>

#### Inherited from

`Exportable.onExport`

#### Defined in

ooapi/models/utilities/Export.ts:26

***

### onHide()?

> `optional` **onHide**: () => `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Defined in

ooapi/models/globals/Variant.ts:28

***

### type?

> `optional` **type**: [`OrdinalType`](../enumerations/OrdinalType.md)

#### Defined in

ooapi/models/globals/Variant.ts:25

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

***

### hide()

> **hide**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Defined in

ooapi/models/globals/Variant.ts:70

***

### show()

> **show**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Defined in

ooapi/models/globals/Variant.ts:39
