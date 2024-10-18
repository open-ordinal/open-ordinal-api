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

[loaders/Artist.ts:10](https://github.com/sagaverse-io/SagaverseOrdinalAPI/blob/90d228bc8061a836e19a66b3b1e83f3192c2e482/src/loaders/Artist.ts#L10)

***

### name

> **name**: `string` = `""`

#### Defined in

[loaders/Artist.ts:34](https://github.com/sagaverse-io/SagaverseOrdinalAPI/blob/90d228bc8061a836e19a66b3b1e83f3192c2e482/src/loaders/Artist.ts#L34)

***

### releases

> **releases**: [`Release`](Release.md)[] = `[]`

#### Defined in

[loaders/Artist.ts:104](https://github.com/sagaverse-io/SagaverseOrdinalAPI/blob/90d228bc8061a836e19a66b3b1e83f3192c2e482/src/loaders/Artist.ts#L104)

***

### \_loaded

> **\_loaded**: `boolean` = `true`

#### Defined in

[loaders/Artist.ts:105](https://github.com/sagaverse-io/SagaverseOrdinalAPI/blob/90d228bc8061a836e19a66b3b1e83f3192c2e482/src/loaders/Artist.ts#L105)

***

### md?

> `optional` **md**: `Artist`

#### Defined in

[loaders/Artist.ts:106](https://github.com/sagaverse-io/SagaverseOrdinalAPI/blob/90d228bc8061a836e19a66b3b1e83f3192c2e482/src/loaders/Artist.ts#L106)

***

### id?

> `optional` **id**: `string`

#### Defined in

[loaders/Artist.ts:107](https://github.com/sagaverse-io/SagaverseOrdinalAPI/blob/90d228bc8061a836e19a66b3b1e83f3192c2e482/src/loaders/Artist.ts#L107)

## Accessors

### releaseTypes

> `get` **releaseTypes**(): `string`[]

Gets the types of releases associated with the artist.

#### Returns

`string`[]

- An array of release types.

#### Defined in

[loaders/Artist.ts:76](https://github.com/sagaverse-io/SagaverseOrdinalAPI/blob/90d228bc8061a836e19a66b3b1e83f3192c2e482/src/loaders/Artist.ts#L76)

***

### duration

> `get` **duration**(): `number`

Gets the total duration of all tracks by the artist.

#### Returns

`number`

- The total duration of all tracks.

#### Defined in

[loaders/Artist.ts:88](https://github.com/sagaverse-io/SagaverseOrdinalAPI/blob/90d228bc8061a836e19a66b3b1e83f3192c2e482/src/loaders/Artist.ts#L88)

***

### tracks

> `get` **tracks**(): [`Track`](Track.md)[]

Gets all tracks by the artist.

#### Returns

[`Track`](Track.md)[]

- An array of tracks.

#### Defined in

[loaders/Artist.ts:100](https://github.com/sagaverse-io/SagaverseOrdinalAPI/blob/90d228bc8061a836e19a66b3b1e83f3192c2e482/src/loaders/Artist.ts#L100)

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

[loaders/Artist.ts:17](https://github.com/sagaverse-io/SagaverseOrdinalAPI/blob/90d228bc8061a836e19a66b3b1e83f3192c2e482/src/loaders/Artist.ts#L17)

***

### loadData()

> **loadData**(): `Promise`\<[`Artist`](Artist.md)\>

Loads additional data for the artist, including releases.

#### Returns

`Promise`\<[`Artist`](Artist.md)\>

- A promise that resolves to the artist with loaded data.

#### Defined in

[loaders/Artist.ts:40](https://github.com/sagaverse-io/SagaverseOrdinalAPI/blob/90d228bc8061a836e19a66b3b1e83f3192c2e482/src/loaders/Artist.ts#L40)