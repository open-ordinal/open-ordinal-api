[Open Ordial API](../../../README.md) / [ooapi/OOAPI](../README.md) / Artist

# Class: Artist

## Constructors

### new Artist()

> **new Artist**(): [`Artist`](Artist.md)

#### Returns

[`Artist`](Artist.md)

## Properties

### \_loaded

> **\_loaded**: `boolean` = `true`

#### Defined in

ooapi/loaders/Artist.ts:73

***

### id?

> `optional` **id**: `string`

#### Defined in

ooapi/loaders/Artist.ts:75

***

### md?

> `optional` **md**: [`Artist`](../../../OOMD/interfaces/Artist.md)

#### Defined in

ooapi/loaders/Artist.ts:74

***

### name

> **name**: `string` = `""`

#### Defined in

ooapi/loaders/Artist.ts:19

***

### releases

> **releases**: [`Release`](Release.md)[] = `[]`

#### Defined in

ooapi/loaders/Artist.ts:71

***

### load()

> `static` **load**: (`id`) => `Promise`\<[`Artist`](Artist.md)\>

#### Parameters

• **id**: `string`

#### Returns

`Promise`\<[`Artist`](Artist.md)\>

#### Defined in

ooapi/loaders/Artist.ts:6

## Accessors

### duration

> `get` **duration**(): `number`

#### Returns

`number`

#### Defined in

ooapi/loaders/Artist.ts:59

***

### releaseTypes

> `get` **releaseTypes**(): `string`[]

#### Returns

`string`[]

#### Defined in

ooapi/loaders/Artist.ts:51

***

### tracks

> `get` **tracks**(): [`Track`](Track.md)[]

#### Returns

[`Track`](Track.md)[]

#### Defined in

ooapi/loaders/Artist.ts:67

## Methods

### loadData()

> **loadData**(): `Promise`\<[`Artist`](Artist.md)\>

#### Returns

`Promise`\<[`Artist`](Artist.md)\>

#### Defined in

ooapi/loaders/Artist.ts:21

***

### \_load()

> `static` **\_load**(`_id`): `Promise`\<[`Artist`](Artist.md)\>

#### Parameters

• **\_id**: `string`

#### Returns

`Promise`\<[`Artist`](Artist.md)\>

#### Defined in

ooapi/loaders/Artist.ts:7
