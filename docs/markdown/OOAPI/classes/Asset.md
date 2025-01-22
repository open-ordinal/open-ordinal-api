[Open Ordial API](../../README.md) / [OOAPI](../README.md) / Asset

# Class: Asset

Defined in: [src/models/globals/Asset.ts:35](https://github.com/open-ordinal/open-ordinal-api/blob/09ea1ce92dd206b5b26f35b329c90c6b41c2680b/src/models/globals/Asset.ts#L35)

An Asset in the Open Ordinal API is a single asset the ordinal expose.
This can be a single image or different pars a image consists of.
If you expose multiple assets to compose a Composition eaach of these
are considered an Asset.

An Asset is defined when the ordinal want to expose them. One reason
to expose these is to give the user of an ordinal the option to bring
these to other platforms (i.e. games, remixing and other).

## Constructors

### new Asset()

> **new Asset**(`options`): [`Asset`](Asset.md)

Defined in: [src/models/globals/Asset.ts:41](https://github.com/open-ordinal/open-ordinal-api/blob/09ea1ce92dd206b5b26f35b329c90c6b41c2680b/src/models/globals/Asset.ts#L41)

#### Parameters

##### options

[`IAsset`](../interfaces/IAsset.md)

#### Returns

[`Asset`](Asset.md)

## Properties

### id?

> `optional` **id**: `string`

Defined in: [src/models/globals/Asset.ts:36](https://github.com/open-ordinal/open-ordinal-api/blob/09ea1ce92dd206b5b26f35b329c90c6b41c2680b/src/models/globals/Asset.ts#L36)

***

### type?

> `optional` **type**: [`OrdinalType`](../enumerations/OrdinalType.md)

Defined in: [src/models/globals/Asset.ts:37](https://github.com/open-ordinal/open-ordinal-api/blob/09ea1ce92dd206b5b26f35b329c90c6b41c2680b/src/models/globals/Asset.ts#L37)

***

### name?

> `optional` **name**: `string`

Defined in: [src/models/globals/Asset.ts:38](https://github.com/open-ordinal/open-ordinal-api/blob/09ea1ce92dd206b5b26f35b329c90c6b41c2680b/src/models/globals/Asset.ts#L38)

***

### data()?

> `optional` **data**: () => `Promise`\<`any`\>

Defined in: [src/models/globals/Asset.ts:39](https://github.com/open-ordinal/open-ordinal-api/blob/09ea1ce92dd206b5b26f35b329c90c6b41c2680b/src/models/globals/Asset.ts#L39)

#### Returns

`Promise`\<`any`\>

## Methods

### getType()

> **getType**(): `undefined` \| [`OrdinalType`](../enumerations/OrdinalType.md)

Defined in: [src/models/globals/Asset.ts:52](https://github.com/open-ordinal/open-ordinal-api/blob/09ea1ce92dd206b5b26f35b329c90c6b41c2680b/src/models/globals/Asset.ts#L52)

#### Returns

`undefined` \| [`OrdinalType`](../enumerations/OrdinalType.md)

***

### getName()

> **getName**(): `undefined` \| `string`

Defined in: [src/models/globals/Asset.ts:56](https://github.com/open-ordinal/open-ordinal-api/blob/09ea1ce92dd206b5b26f35b329c90c6b41c2680b/src/models/globals/Asset.ts#L56)

#### Returns

`undefined` \| `string`

***

### getId()

> **getId**(): `undefined` \| `string`

Defined in: [src/models/globals/Asset.ts:60](https://github.com/open-ordinal/open-ordinal-api/blob/09ea1ce92dd206b5b26f35b329c90c6b41c2680b/src/models/globals/Asset.ts#L60)

#### Returns

`undefined` \| `string`

***

### getData()

> **getData**(): `Promise`\<`any`\>

Defined in: [src/models/globals/Asset.ts:64](https://github.com/open-ordinal/open-ordinal-api/blob/09ea1ce92dd206b5b26f35b329c90c6b41c2680b/src/models/globals/Asset.ts#L64)

#### Returns

`Promise`\<`any`\>
