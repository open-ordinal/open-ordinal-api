[Open Ordial API](../../README.md) / [OOAPI](../README.md) / Artist

# Class: Artist

Defined in: [src/loaders/Artist.ts:8](https://github.com/open-ordinal/open-ordinal-api/blob/a0d5891263931a6fab499adb8c2ba3d4a1ef0c78/src/loaders/Artist.ts#L8)

Represents an artist and provides methods to load and manage artist data.

## Constructors

### new Artist()

> **new Artist**(): [`Artist`](Artist.md)

#### Returns

[`Artist`](Artist.md)

## Properties

### load()

> `static` **load**: (`id`) => `Promise`\<[`Artist`](Artist.md)\>

Defined in: [src/loaders/Artist.ts:10](https://github.com/open-ordinal/open-ordinal-api/blob/a0d5891263931a6fab499adb8c2ba3d4a1ef0c78/src/loaders/Artist.ts#L10)

#### Parameters

##### id

`string`

#### Returns

`Promise`\<[`Artist`](Artist.md)\>

***

### name

> **name**: `string` = `""`

Defined in: [src/loaders/Artist.ts:34](https://github.com/open-ordinal/open-ordinal-api/blob/a0d5891263931a6fab499adb8c2ba3d4a1ef0c78/src/loaders/Artist.ts#L34)

***

### releases

> **releases**: [`Release`](Release.md)[] = `[]`

Defined in: [src/loaders/Artist.ts:104](https://github.com/open-ordinal/open-ordinal-api/blob/a0d5891263931a6fab499adb8c2ba3d4a1ef0c78/src/loaders/Artist.ts#L104)

***

### \_loaded

> **\_loaded**: `boolean` = `true`

Defined in: [src/loaders/Artist.ts:105](https://github.com/open-ordinal/open-ordinal-api/blob/a0d5891263931a6fab499adb8c2ba3d4a1ef0c78/src/loaders/Artist.ts#L105)

***

### md?

> `optional` **md**: [`Artist`](../namespaces/OOMD/interfaces/Artist.md)

Defined in: [src/loaders/Artist.ts:106](https://github.com/open-ordinal/open-ordinal-api/blob/a0d5891263931a6fab499adb8c2ba3d4a1ef0c78/src/loaders/Artist.ts#L106)

***

### id?

> `optional` **id**: `string`

Defined in: [src/loaders/Artist.ts:107](https://github.com/open-ordinal/open-ordinal-api/blob/a0d5891263931a6fab499adb8c2ba3d4a1ef0c78/src/loaders/Artist.ts#L107)

## Accessors

### releaseTypes

#### Get Signature

> **get** **releaseTypes**(): `string`[]

Defined in: [src/loaders/Artist.ts:76](https://github.com/open-ordinal/open-ordinal-api/blob/a0d5891263931a6fab499adb8c2ba3d4a1ef0c78/src/loaders/Artist.ts#L76)

Gets the types of releases associated with the artist.

##### Returns

`string`[]

- An array of release types.

***

### duration

#### Get Signature

> **get** **duration**(): `number`

Defined in: [src/loaders/Artist.ts:88](https://github.com/open-ordinal/open-ordinal-api/blob/a0d5891263931a6fab499adb8c2ba3d4a1ef0c78/src/loaders/Artist.ts#L88)

Gets the total duration of all tracks by the artist.

##### Returns

`number`

- The total duration of all tracks.

***

### tracks

#### Get Signature

> **get** **tracks**(): [`Track`](Track.md)[]

Defined in: [src/loaders/Artist.ts:100](https://github.com/open-ordinal/open-ordinal-api/blob/a0d5891263931a6fab499adb8c2ba3d4a1ef0c78/src/loaders/Artist.ts#L100)

Gets all tracks by the artist.

##### Returns

[`Track`](Track.md)[]

- An array of tracks.

## Methods

### \_load()

> `static` **\_load**(`_id`): `Promise`\<[`Artist`](Artist.md)\>

Defined in: [src/loaders/Artist.ts:17](https://github.com/open-ordinal/open-ordinal-api/blob/a0d5891263931a6fab499adb8c2ba3d4a1ef0c78/src/loaders/Artist.ts#L17)

Loads an artist by ID.

#### Parameters

##### \_id

`string`

The ID of the artist to load.

#### Returns

`Promise`\<[`Artist`](Artist.md)\>

- A promise that resolves to the loaded artist.

***

### loadData()

> **loadData**(): `Promise`\<[`Artist`](Artist.md)\>

Defined in: [src/loaders/Artist.ts:40](https://github.com/open-ordinal/open-ordinal-api/blob/a0d5891263931a6fab499adb8c2ba3d4a1ef0c78/src/loaders/Artist.ts#L40)

Loads additional data for the artist, including releases.

#### Returns

`Promise`\<[`Artist`](Artist.md)\>

- A promise that resolves to the artist with loaded data.
