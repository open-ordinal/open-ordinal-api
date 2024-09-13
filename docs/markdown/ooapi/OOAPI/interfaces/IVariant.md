[Open Ordial API](../../../README.md) / [ooapi/OOAPI](../README.md) / IVariant

# Interface: IVariant

Variant Class
A Variant is a variant of the ordinal. It's a visual distinct visual representation.
It can be 2D and / or 3D or any other variation. Not to be confused with Composition.

## Properties

### id

> **id**: `string`

#### Defined in

ooapi/models/globals/Variant.ts:10

***

### name?

> `optional` **name**: `string`

#### Defined in

ooapi/models/globals/Variant.ts:12

***

### onDisplay()?

> `optional` **onDisplay**: () => `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Defined in

ooapi/models/globals/Variant.ts:13

***

### onExport()?

> `optional` **onExport**: () => `Promise`\<`Export`\>

#### Returns

`Promise`\<`Export`\>

#### Defined in

ooapi/models/globals/Variant.ts:15

***

### onHide()?

> `optional` **onHide**: () => `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Defined in

ooapi/models/globals/Variant.ts:14

***

### type?

> `optional` **type**: [`OrdinalType`](../enumerations/OrdinalType.md)

#### Defined in

ooapi/models/globals/Variant.ts:11
