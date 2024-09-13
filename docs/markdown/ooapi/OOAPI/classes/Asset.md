[Open Ordial API](../../../README.md) / [ooapi/OOAPI](../README.md) / Asset

# Class: Asset

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

#### Parameters

• **options**: [`IAsset`](../interfaces/IAsset.md)

#### Returns

[`Asset`](Asset.md)

#### Defined in

ooapi/models/globals/Asset.ts:41

## Properties

### data()?

> `optional` **data**: () => `Promise`\<`any`\>

#### Returns

`Promise`\<`any`\>

#### Defined in

ooapi/models/globals/Asset.ts:39

***

### id?

> `optional` **id**: `string`

#### Defined in

ooapi/models/globals/Asset.ts:36

***

### name?

> `optional` **name**: `string`

#### Defined in

ooapi/models/globals/Asset.ts:38

***

### type?

> `optional` **type**: [`OrdinalType`](../enumerations/OrdinalType.md)

#### Defined in

ooapi/models/globals/Asset.ts:37

## Methods

### getData()

> **getData**(): `Promise`\<`any`\>

#### Returns

`Promise`\<`any`\>

#### Defined in

ooapi/models/globals/Asset.ts:64

***

### getId()

> **getId**(): `undefined` \| `string`

#### Returns

`undefined` \| `string`

#### Defined in

ooapi/models/globals/Asset.ts:60

***

### getName()

> **getName**(): `undefined` \| `string`

#### Returns

`undefined` \| `string`

#### Defined in

ooapi/models/globals/Asset.ts:56

***

### getType()

> **getType**(): `undefined` \| [`OrdinalType`](../enumerations/OrdinalType.md)

#### Returns

`undefined` \| [`OrdinalType`](../enumerations/OrdinalType.md)

#### Defined in

ooapi/models/globals/Asset.ts:52
