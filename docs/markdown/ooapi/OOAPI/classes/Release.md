[Open Ordial API](../../../README.md) / [ooapi/OOAPI](../README.md) / Release

# Class: Release

## Constructors

### new Release()

> **new Release**(): [`Release`](Release.md)

#### Returns

[`Release`](Release.md)

## Properties

### \_loaded

> **\_loaded**: `boolean` = `true`

#### Defined in

ooapi/loaders/Release.ts:113

***

### \_tracks?

> `optional` **\_tracks**: [`Linked`](../../../OOMD/type-aliases/Linked.md)\<[`Track`](../../../OOMD/interfaces/Track.md)\>[]

#### Defined in

ooapi/loaders/Release.ts:114

***

### artists

> **artists**: [`Artist`](Artist.md)[] = `[]`

#### Defined in

ooapi/loaders/Release.ts:79

***

### coverURL

> **coverURL**: `string` = `""`

#### Defined in

ooapi/loaders/Release.ts:81

***

### date

> **date**: `Date`

#### Defined in

ooapi/loaders/Release.ts:77

***

### id?

> `optional` **id**: `string`

#### Defined in

ooapi/loaders/Release.ts:73

***

### title

> **title**: `string` = `""`

#### Defined in

ooapi/loaders/Release.ts:75

***

### tracks

> **tracks**: [`Track`](Track.md)[] = `[]`

#### Defined in

ooapi/loaders/Release.ts:111

***

### type

> **type**: `string` = `""`

#### Defined in

ooapi/loaders/Release.ts:76

***

### fallbackCover

> `static` **fallbackCover**: `string` = `""`

#### Defined in

ooapi/loaders/Release.ts:7

***

### load()

> `static` **load**: (`id`) => `Promise`\<[`Release`](Release.md)\>

#### Parameters

• **id**: `string`

#### Returns

`Promise`\<[`Release`](Release.md)\>

#### Defined in

ooapi/loaders/Release.ts:9

## Accessors

### artist

> `get` **artist**(): [`Artist`](Artist.md)

#### Returns

[`Artist`](Artist.md)

#### Defined in

ooapi/loaders/Release.ts:57

***

### duration

> `get` **duration**(): `number`

#### Returns

`number`

#### Defined in

ooapi/loaders/Release.ts:65

***

### year

> `get` **year**(): `number`

#### Returns

`number`

#### Defined in

ooapi/loaders/Release.ts:61

## Methods

### loadData()

> **loadData**(): `Promise`\<[`Release`](Release.md)\>

#### Returns

`Promise`\<[`Release`](Release.md)\>

#### Defined in

ooapi/loaders/Release.ts:83

***

### \_load()

> `static` **\_load**(`_id`): `Promise`\<[`Release`](Release.md)\>

#### Parameters

• **\_id**: `string`

#### Returns

`Promise`\<[`Release`](Release.md)\>

#### Defined in

ooapi/loaders/Release.ts:10
