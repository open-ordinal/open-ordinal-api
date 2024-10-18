[Open Ordial API](../../README.md) / [OOAPI](../README.md) / Collection

# Class: Collection

A Collection is usually defined as a ordinal collection. This class
expose the trais that are available for the Collection.

## Constructors

### new Collection()

> **new Collection**(`options`): [`Collection`](Collection.md)

#### Parameters

• **options**: [`ICollection`](../interfaces/ICollection.md)

#### Returns

[`Collection`](Collection.md)

#### Defined in

[models/usecases/Collection.ts:26](https://github.com/sagaverse-io/SagaverseOrdinalAPI/blob/90d228bc8061a836e19a66b3b1e83f3192c2e482/src/models/usecases/Collection.ts#L26)

## Properties

### id

> **id**: `string`

#### Defined in

[models/usecases/Collection.ts:21](https://github.com/sagaverse-io/SagaverseOrdinalAPI/blob/90d228bc8061a836e19a66b3b1e83f3192c2e482/src/models/usecases/Collection.ts#L21)

***

### name?

> `optional` **name**: `string`

#### Defined in

[models/usecases/Collection.ts:22](https://github.com/sagaverse-io/SagaverseOrdinalAPI/blob/90d228bc8061a836e19a66b3b1e83f3192c2e482/src/models/usecases/Collection.ts#L22)

***

### description?

> `optional` **description**: `string`

#### Defined in

[models/usecases/Collection.ts:23](https://github.com/sagaverse-io/SagaverseOrdinalAPI/blob/90d228bc8061a836e19a66b3b1e83f3192c2e482/src/models/usecases/Collection.ts#L23)

***

### collectionTraits

> **collectionTraits**: `CollectionTrait`[] = `[]`

#### Defined in

[models/usecases/Collection.ts:24](https://github.com/sagaverse-io/SagaverseOrdinalAPI/blob/90d228bc8061a836e19a66b3b1e83f3192c2e482/src/models/usecases/Collection.ts#L24)

## Methods

### addTraitCategory()

> **addTraitCategory**(`category`): `void`

#### Parameters

• **category**: [`ICollectionTrait`](../interfaces/ICollectionTrait.md)

#### Returns

`void`

#### Defined in

[models/usecases/Collection.ts:33](https://github.com/sagaverse-io/SagaverseOrdinalAPI/blob/90d228bc8061a836e19a66b3b1e83f3192c2e482/src/models/usecases/Collection.ts#L33)
