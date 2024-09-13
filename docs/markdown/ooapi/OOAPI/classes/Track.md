[Open Ordial API](../../../README.md) / [ooapi/OOAPI](../README.md) / Track

# Class: Track

## Constructors

### new Track()

> **new Track**(): [`Track`](Track.md)

#### Returns

[`Track`](Track.md)

## Properties

### \_loaded

> **\_loaded**: `boolean` = `true`

#### Defined in

ooapi/loaders/Track.ts:108

***

### artists

> **artists**: [`Artist`](Artist.md)[] = `[]`

#### Defined in

ooapi/loaders/Track.ts:74

***

### audioURL

> **audioURL**: `string` = `""`

#### Defined in

ooapi/loaders/Track.ts:106

***

### duration

> **duration**: `number` = `0.0`

#### Defined in

ooapi/loaders/Track.ts:105

***

### id?

> `optional` **id**: `string`

#### Defined in

ooapi/loaders/Track.ts:109

***

### mm

> **mm**: [`Media`](../../../OOMD/interfaces/Media.md) = `{}`

#### Defined in

ooapi/loaders/Track.ts:110

***

### release

> **release**: [`Release`](Release.md)

#### Defined in

ooapi/loaders/Track.ts:75

***

### title

> **title**: `string` = `""`

#### Defined in

ooapi/loaders/Track.ts:73

***

### load()

> `static` **load**: (`id`) => `Promise`\<[`Track`](Track.md)\>

#### Parameters

• **id**: `string`

#### Returns

`Promise`\<[`Track`](Track.md)\>

#### Defined in

ooapi/loaders/Track.ts:9

## Methods

### loadData()

> **loadData**(): `Promise`\<[`Track`](Track.md)\>

#### Returns

`Promise`\<[`Track`](Track.md)\>

#### Defined in

ooapi/loaders/Track.ts:77

***

### \_load()

> `static` **\_load**(`_id`): `Promise`\<[`Track`](Track.md)\>

#### Parameters

• **\_id**: `string`

#### Returns

`Promise`\<[`Track`](Track.md)\>

#### Defined in

ooapi/loaders/Track.ts:10
