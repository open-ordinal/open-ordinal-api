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

[models/globals/Asset.ts:19](https://github.com/sagaverse-io/SagaverseOrdinalAPI/blob/90d228bc8061a836e19a66b3b1e83f3192c2e482/src/models/globals/Asset.ts#L19)

***

### type?

> `optional` **type**: [`OrdinalType`](../enumerations/OrdinalType.md)

#### Defined in

[models/globals/Asset.ts:20](https://github.com/sagaverse-io/SagaverseOrdinalAPI/blob/90d228bc8061a836e19a66b3b1e83f3192c2e482/src/models/globals/Asset.ts#L20)

***

### name?

> `optional` **name**: `string`

#### Defined in

[models/globals/Asset.ts:21](https://github.com/sagaverse-io/SagaverseOrdinalAPI/blob/90d228bc8061a836e19a66b3b1e83f3192c2e482/src/models/globals/Asset.ts#L21)

***

### data?

> `optional` **data**: `string` \| () => `Promise`\<`any`\>

#### Defined in

[models/globals/Asset.ts:22](https://github.com/sagaverse-io/SagaverseOrdinalAPI/blob/90d228bc8061a836e19a66b3b1e83f3192c2e482/src/models/globals/Asset.ts#L22)