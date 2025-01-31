[Open Ordial API](../../README.md) / [OOAPI](../README.md) / IVariant

# Interface: IVariant

Defined in: [src/models/globals/Variant.ts:9](https://github.com/open-ordinal/open-ordinal-api/blob/a0d5891263931a6fab499adb8c2ba3d4a1ef0c78/src/models/globals/Variant.ts#L9)

Variant Class
A Variant is a variant of the ordinal. It's a visual distinct visual representation.
It can be 2D and / or 3D or any other variation. Not to be confused with Composition.

## Properties

### id

> **id**: `string`

Defined in: [src/models/globals/Variant.ts:10](https://github.com/open-ordinal/open-ordinal-api/blob/a0d5891263931a6fab499adb8c2ba3d4a1ef0c78/src/models/globals/Variant.ts#L10)

***

### type?

> `optional` **type**: [`OrdinalType`](../enumerations/OrdinalType.md)

Defined in: [src/models/globals/Variant.ts:11](https://github.com/open-ordinal/open-ordinal-api/blob/a0d5891263931a6fab499adb8c2ba3d4a1ef0c78/src/models/globals/Variant.ts#L11)

***

### name?

> `optional` **name**: `string`

Defined in: [src/models/globals/Variant.ts:12](https://github.com/open-ordinal/open-ordinal-api/blob/a0d5891263931a6fab499adb8c2ba3d4a1ef0c78/src/models/globals/Variant.ts#L12)

***

### onDisplay()?

> `optional` **onDisplay**: () => `Promise`\<`void`\>

Defined in: [src/models/globals/Variant.ts:13](https://github.com/open-ordinal/open-ordinal-api/blob/a0d5891263931a6fab499adb8c2ba3d4a1ef0c78/src/models/globals/Variant.ts#L13)

#### Returns

`Promise`\<`void`\>

***

### onHide()?

> `optional` **onHide**: () => `Promise`\<`void`\>

Defined in: [src/models/globals/Variant.ts:14](https://github.com/open-ordinal/open-ordinal-api/blob/a0d5891263931a6fab499adb8c2ba3d4a1ef0c78/src/models/globals/Variant.ts#L14)

#### Returns

`Promise`\<`void`\>

***

### onExport()?

> `optional` **onExport**: () => `Promise`\<[`Export`](../type-aliases/Export.md)\>

Defined in: [src/models/globals/Variant.ts:15](https://github.com/open-ordinal/open-ordinal-api/blob/a0d5891263931a6fab499adb8c2ba3d4a1ef0c78/src/models/globals/Variant.ts#L15)

#### Returns

`Promise`\<[`Export`](../type-aliases/Export.md)\>
