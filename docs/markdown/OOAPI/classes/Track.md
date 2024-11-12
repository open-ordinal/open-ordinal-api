[Open Ordial API](../../README.md) / [OOAPI](../README.md) / Track

# Class: Track

## Constructors

### new Track()

> **new Track**(): [`Track`](Track.md)

#### Returns

[`Track`](Track.md)

## Properties

### load()

> `static` **load**: (`id`) => `Promise`\<[`Track`](Track.md)\>

#### Parameters

• **id**: `string`

#### Returns

`Promise`\<[`Track`](Track.md)\>

#### Defined in

[src/loaders/Track.ts:12](https://github.com/open-ordinal/open-ordinal-api/blob/70e118e56492403aed907a3616034144dfc18228/src/loaders/Track.ts#L12)

***

### title

> **title**: `string` = `""`

#### Defined in

[src/loaders/Track.ts:90](https://github.com/open-ordinal/open-ordinal-api/blob/70e118e56492403aed907a3616034144dfc18228/src/loaders/Track.ts#L90)

***

### artists

> **artists**: [`Artist`](Artist.md)[] = `[]`

#### Defined in

[src/loaders/Track.ts:93](https://github.com/open-ordinal/open-ordinal-api/blob/70e118e56492403aed907a3616034144dfc18228/src/loaders/Track.ts#L93)

***

### release

> **release**: [`Release`](Release.md)

#### Defined in

[src/loaders/Track.ts:96](https://github.com/open-ordinal/open-ordinal-api/blob/70e118e56492403aed907a3616034144dfc18228/src/loaders/Track.ts#L96)

***

### duration

> **duration**: `number` = `0.0`

#### Defined in

[src/loaders/Track.ts:136](https://github.com/open-ordinal/open-ordinal-api/blob/70e118e56492403aed907a3616034144dfc18228/src/loaders/Track.ts#L136)

***

### audioURL

> **audioURL**: `string` = `""`

#### Defined in

[src/loaders/Track.ts:139](https://github.com/open-ordinal/open-ordinal-api/blob/70e118e56492403aed907a3616034144dfc18228/src/loaders/Track.ts#L139)

***

### \_loaded

> **\_loaded**: `boolean` = `true`

#### Defined in

[src/loaders/Track.ts:142](https://github.com/open-ordinal/open-ordinal-api/blob/70e118e56492403aed907a3616034144dfc18228/src/loaders/Track.ts#L142)

***

### id?

> `optional` **id**: `string`

#### Defined in

[src/loaders/Track.ts:145](https://github.com/open-ordinal/open-ordinal-api/blob/70e118e56492403aed907a3616034144dfc18228/src/loaders/Track.ts#L145)

***

### mm

> **mm**: [`Media`](../namespaces/OOMD/interfaces/Media.md) = `{}`

#### Defined in

[src/loaders/Track.ts:148](https://github.com/open-ordinal/open-ordinal-api/blob/70e118e56492403aed907a3616034144dfc18228/src/loaders/Track.ts#L148)

## Methods

### \_load()

> `static` **\_load**(`_id`): `Promise`\<[`Track`](Track.md)\>

#### Parameters

• **\_id**: `string`

#### Returns

`Promise`\<[`Track`](Track.md)\>

#### Defined in

[src/loaders/Track.ts:15](https://github.com/open-ordinal/open-ordinal-api/blob/70e118e56492403aed907a3616034144dfc18228/src/loaders/Track.ts#L15)

***

### loadData()

> **loadData**(): `Promise`\<[`Track`](Track.md)\>

#### Returns

`Promise`\<[`Track`](Track.md)\>

#### Defined in

[src/loaders/Track.ts:99](https://github.com/open-ordinal/open-ordinal-api/blob/70e118e56492403aed907a3616034144dfc18228/src/loaders/Track.ts#L99)
