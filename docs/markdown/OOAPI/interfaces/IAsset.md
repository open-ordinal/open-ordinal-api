[Open Ordial API](../../README.md) / [OOAPI](../README.md) / IAsset

# Interface: IAsset

An Asset in the Open Ordinal API is a single asset the ordinal expose.
This can be a single image or different pars a image consists of.
If you expose multiple assets to compose a Composition eaach of these
are considered an Asset.

An Asset is defined when the ordinal want to expose them. One reason
to expose these is to give the user of an ordinal the option to bring
these to other platforms (i.e. games, remixing and other).

## Properties

### id

> **id**: `string`

#### Defined in

[src/models/globals/Asset.ts:19](https://github.com/open-ordinal/open-ordinal-api/blob/70e118e56492403aed907a3616034144dfc18228/src/models/globals/Asset.ts#L19)

***

### type?

> `optional` **type**: [`OrdinalType`](../enumerations/OrdinalType.md)

#### Defined in

[src/models/globals/Asset.ts:20](https://github.com/open-ordinal/open-ordinal-api/blob/70e118e56492403aed907a3616034144dfc18228/src/models/globals/Asset.ts#L20)

***

### name?

> `optional` **name**: `string`

#### Defined in

[src/models/globals/Asset.ts:21](https://github.com/open-ordinal/open-ordinal-api/blob/70e118e56492403aed907a3616034144dfc18228/src/models/globals/Asset.ts#L21)

***

### data?

> `optional` **data**: `string` \| () => `Promise`\<`any`\>

#### Defined in

[src/models/globals/Asset.ts:22](https://github.com/open-ordinal/open-ordinal-api/blob/70e118e56492403aed907a3616034144dfc18228/src/models/globals/Asset.ts#L22)
