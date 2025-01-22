[Open Ordial API](../../README.md) / [OOAPI](../README.md) / Variant

# Class: Variant

Defined in: [src/models/globals/Variant.ts:23](https://github.com/open-ordinal/open-ordinal-api/blob/09ea1ce92dd206b5b26f35b329c90c6b41c2680b/src/models/globals/Variant.ts#L23)

Variant Class
A Variant is a variant of the ordinal. It's a visual distinct visual representation.
It can be 2D and / or 3D or any other variation. Not to be confused with Composition.

## Extends

- `Exportable`

## Constructors

### new Variant()

> **new Variant**(`options`): [`Variant`](Variant.md)

Defined in: [src/models/globals/Variant.ts:30](https://github.com/open-ordinal/open-ordinal-api/blob/09ea1ce92dd206b5b26f35b329c90c6b41c2680b/src/models/globals/Variant.ts#L30)

#### Parameters

##### options

[`IVariant`](../interfaces/IVariant.md)

#### Returns

[`Variant`](Variant.md)

#### Overrides

`Exportable.constructor`

## Properties

### id

> **id**: `string`

Defined in: [src/models/globals/Variant.ts:24](https://github.com/open-ordinal/open-ordinal-api/blob/09ea1ce92dd206b5b26f35b329c90c6b41c2680b/src/models/globals/Variant.ts#L24)

***

### type?

> `optional` **type**: [`OrdinalType`](../enumerations/OrdinalType.md)

Defined in: [src/models/globals/Variant.ts:25](https://github.com/open-ordinal/open-ordinal-api/blob/09ea1ce92dd206b5b26f35b329c90c6b41c2680b/src/models/globals/Variant.ts#L25)

***

### name?

> `optional` **name**: `string`

Defined in: [src/models/globals/Variant.ts:26](https://github.com/open-ordinal/open-ordinal-api/blob/09ea1ce92dd206b5b26f35b329c90c6b41c2680b/src/models/globals/Variant.ts#L26)

***

### onDisplay()?

> `optional` **onDisplay**: () => `Promise`\<`void`\>

Defined in: [src/models/globals/Variant.ts:27](https://github.com/open-ordinal/open-ordinal-api/blob/09ea1ce92dd206b5b26f35b329c90c6b41c2680b/src/models/globals/Variant.ts#L27)

#### Returns

`Promise`\<`void`\>

***

### onHide()?

> `optional` **onHide**: () => `Promise`\<`void`\>

Defined in: [src/models/globals/Variant.ts:28](https://github.com/open-ordinal/open-ordinal-api/blob/09ea1ce92dd206b5b26f35b329c90c6b41c2680b/src/models/globals/Variant.ts#L28)

#### Returns

`Promise`\<`void`\>

***

### onExport()?

> `optional` **onExport**: () => `Promise`\<[`Export`](../type-aliases/Export.md)\>

Defined in: [src/models/utilities/Export.ts:32](https://github.com/open-ordinal/open-ordinal-api/blob/09ea1ce92dd206b5b26f35b329c90c6b41c2680b/src/models/utilities/Export.ts#L32)

#### Returns

`Promise`\<[`Export`](../type-aliases/Export.md)\>

#### Inherited from

`Exportable.onExport`

## Methods

### show()

> **show**(): `Promise`\<`void`\>

Defined in: [src/models/globals/Variant.ts:39](https://github.com/open-ordinal/open-ordinal-api/blob/09ea1ce92dd206b5b26f35b329c90c6b41c2680b/src/models/globals/Variant.ts#L39)

#### Returns

`Promise`\<`void`\>

***

### hide()

> **hide**(): `Promise`\<`void`\>

Defined in: [src/models/globals/Variant.ts:70](https://github.com/open-ordinal/open-ordinal-api/blob/09ea1ce92dd206b5b26f35b329c90c6b41c2680b/src/models/globals/Variant.ts#L70)

#### Returns

`Promise`\<`void`\>

***

### canExport()

> **canExport**(): `boolean`

Defined in: [src/models/utilities/Export.ts:38](https://github.com/open-ordinal/open-ordinal-api/blob/09ea1ce92dd206b5b26f35b329c90c6b41c2680b/src/models/utilities/Export.ts#L38)

#### Returns

`boolean`

#### Inherited from

`Exportable.canExport`

***

### export()

> **export**(): `Promise`\<`string`\>

Defined in: [src/models/utilities/Export.ts:42](https://github.com/open-ordinal/open-ordinal-api/blob/09ea1ce92dd206b5b26f35b329c90c6b41c2680b/src/models/utilities/Export.ts#L42)

#### Returns

`Promise`\<`string`\>

#### Inherited from

`Exportable.export`
