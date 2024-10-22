[Open Ordial API](../../README.md) / [OOAPI](../README.md) / Artist

# Class: Artist

Represents an artist and provides methods to load and manage artist data.

## Constructors

### new Artist()

> **new Artist**(): [`Artist`](Artist.md)

#### Returns

[`Artist`](Artist.md)

## Properties

### load()

> `static` **load**: (`id`) => `Promise`\<[`Artist`](Artist.md)\>

#### Parameters

• **id**: `string`

#### Returns

`Promise`\<[`Artist`](Artist.md)\>

#### Defined in

[src/loaders/Artist.ts:10](https://github.com/open-ordinal/open-ordinal-api/blob/853cbf2a017c45362e48e478b4771550a39cd1c4/src/loaders/Artist.ts#L10)

***

### name

> **name**: `string` = `""`

#### Defined in

[src/loaders/Artist.ts:34](https://github.com/open-ordinal/open-ordinal-api/blob/853cbf2a017c45362e48e478b4771550a39cd1c4/src/loaders/Artist.ts#L34)

***

### releases

> **releases**: [`Release`](Release.md)[] = `[]`

#### Defined in

[src/loaders/Artist.ts:104](https://github.com/open-ordinal/open-ordinal-api/blob/853cbf2a017c45362e48e478b4771550a39cd1c4/src/loaders/Artist.ts#L104)

***

### \_loaded

> **\_loaded**: `boolean` = `true`

#### Defined in

[src/loaders/Artist.ts:105](https://github.com/open-ordinal/open-ordinal-api/blob/853cbf2a017c45362e48e478b4771550a39cd1c4/src/loaders/Artist.ts#L105)

***

### md?

> `optional` **md**: [`Artist`](../namespaces/OOMD/interfaces/Artist.md)

#### Defined in

[src/loaders/Artist.ts:106](https://github.com/open-ordinal/open-ordinal-api/blob/853cbf2a017c45362e48e478b4771550a39cd1c4/src/loaders/Artist.ts#L106)

***

### id?

> `optional` **id**: `string`

#### Defined in

[src/loaders/Artist.ts:107](https://github.com/open-ordinal/open-ordinal-api/blob/853cbf2a017c45362e48e478b4771550a39cd1c4/src/loaders/Artist.ts#L107)

## Accessors

### releaseTypes

> `get` **releaseTypes**(): `string`[]

Gets the types of releases associated with the artist.

#### Returns

`string`[]

- An array of release types.

#### Defined in

[src/loaders/Artist.ts:76](https://github.com/open-ordinal/open-ordinal-api/blob/853cbf2a017c45362e48e478b4771550a39cd1c4/src/loaders/Artist.ts#L76)

***

### duration

> `get` **duration**(): `number`

Gets the total duration of all tracks by the artist.

#### Returns

`number`

- The total duration of all tracks.

#### Defined in

[src/loaders/Artist.ts:88](https://github.com/open-ordinal/open-ordinal-api/blob/853cbf2a017c45362e48e478b4771550a39cd1c4/src/loaders/Artist.ts#L88)

***

### tracks

> `get` **tracks**(): [`Track`](Track.md)[]

Gets all tracks by the artist.

#### Returns

[`Track`](Track.md)[]

- An array of tracks.

#### Defined in

[src/loaders/Artist.ts:100](https://github.com/open-ordinal/open-ordinal-api/blob/853cbf2a017c45362e48e478b4771550a39cd1c4/src/loaders/Artist.ts#L100)

## Methods

### \_load()

> `static` **\_load**(`_id`): `Promise`\<[`Artist`](Artist.md)\>

Loads an artist by ID.

#### Parameters

• **\_id**: `string`

The ID of the artist to load.

#### Returns

`Promise`\<[`Artist`](Artist.md)\>

- A promise that resolves to the loaded artist.

#### Defined in

[src/loaders/Artist.ts:17](https://github.com/open-ordinal/open-ordinal-api/blob/853cbf2a017c45362e48e478b4771550a39cd1c4/src/loaders/Artist.ts#L17)

***

### loadData()

> **loadData**(): `Promise`\<[`Artist`](Artist.md)\>

Loads additional data for the artist, including releases.

#### Returns

`Promise`\<[`Artist`](Artist.md)\>

- A promise that resolves to the artist with loaded data.

#### Defined in

[src/loaders/Artist.ts:40](https://github.com/open-ordinal/open-ordinal-api/blob/853cbf2a017c45362e48e478b4771550a39cd1c4/src/loaders/Artist.ts#L40)
