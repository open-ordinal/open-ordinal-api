[Open Ordial API](../../README.md) / [OOAPI](../README.md) / Collection

# Class: Collection

Defined in: [src/models/usecases/Collection.ts:20](https://github.com/open-ordinal/open-ordinal-api/blob/a0d5891263931a6fab499adb8c2ba3d4a1ef0c78/src/models/usecases/Collection.ts#L20)

A Collection is usually defined as a ordinal collection. This class
expose the trais that are available for the Collection.

## Constructors

### new Collection()

> **new Collection**(`options`): [`Collection`](Collection.md)

Defined in: [src/models/usecases/Collection.ts:26](https://github.com/open-ordinal/open-ordinal-api/blob/a0d5891263931a6fab499adb8c2ba3d4a1ef0c78/src/models/usecases/Collection.ts#L26)

#### Parameters

##### options

[`ICollection`](../interfaces/ICollection.md)

#### Returns

[`Collection`](Collection.md)

## Properties

### id

> **id**: `string`

Defined in: [src/models/usecases/Collection.ts:21](https://github.com/open-ordinal/open-ordinal-api/blob/a0d5891263931a6fab499adb8c2ba3d4a1ef0c78/src/models/usecases/Collection.ts#L21)

***

### name?

> `optional` **name**: `string`

Defined in: [src/models/usecases/Collection.ts:22](https://github.com/open-ordinal/open-ordinal-api/blob/a0d5891263931a6fab499adb8c2ba3d4a1ef0c78/src/models/usecases/Collection.ts#L22)

***

### description?

> `optional` **description**: `string`

Defined in: [src/models/usecases/Collection.ts:23](https://github.com/open-ordinal/open-ordinal-api/blob/a0d5891263931a6fab499adb8c2ba3d4a1ef0c78/src/models/usecases/Collection.ts#L23)

***

### collectionTraits

> **collectionTraits**: `CollectionTrait`[] = `[]`

Defined in: [src/models/usecases/Collection.ts:24](https://github.com/open-ordinal/open-ordinal-api/blob/a0d5891263931a6fab499adb8c2ba3d4a1ef0c78/src/models/usecases/Collection.ts#L24)

## Methods

### addTraitCategory()

> **addTraitCategory**(`category`): `void`

Defined in: [src/models/usecases/Collection.ts:33](https://github.com/open-ordinal/open-ordinal-api/blob/a0d5891263931a6fab499adb8c2ba3d4a1ef0c78/src/models/usecases/Collection.ts#L33)

#### Parameters

##### category

[`ICollectionTrait`](../interfaces/ICollectionTrait.md)

#### Returns

`void`
