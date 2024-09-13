[Open Ordial API](../../../README.md) / [ooapi/OOAPI](../README.md) / IAsset

# Interface: IAsset

An Asset in the Open Ordinal API is a single asset the ordinal expose.
This can be a single image or different pars a image consists of.
If you expose multiple assets to compose a Composition eaach of these
are considered an Asset.

An Asset is defined when the ordinal want to expose them. One reason
to expose these is to give the user of an ordinal the option to bring
these to other platforms (i.e. games, remixing and other).

## Properties

### data?

> `optional` **data**: `string` \| () => `Promise`\<`any`\>

#### Defined in

ooapi/models/globals/Asset.ts:22

***

### id

> **id**: `string`

#### Defined in

ooapi/models/globals/Asset.ts:19

***

### name?

> `optional` **name**: `string`

#### Defined in

ooapi/models/globals/Asset.ts:21

***

### type?

> `optional` **type**: [`OrdinalType`](../enumerations/OrdinalType.md)

#### Defined in

ooapi/models/globals/Asset.ts:20
