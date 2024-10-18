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

[loaders/Track.ts:12](https://github.com/sagaverse-io/SagaverseOrdinalAPI/blob/90d228bc8061a836e19a66b3b1e83f3192c2e482/src/loaders/Track.ts#L12)

***

### title

> **title**: `string` = `""`

#### Defined in

[loaders/Track.ts:90](https://github.com/sagaverse-io/SagaverseOrdinalAPI/blob/90d228bc8061a836e19a66b3b1e83f3192c2e482/src/loaders/Track.ts#L90)

***

### artists

> **artists**: [`Artist`](Artist.md)[] = `[]`

#### Defined in

[loaders/Track.ts:93](https://github.com/sagaverse-io/SagaverseOrdinalAPI/blob/90d228bc8061a836e19a66b3b1e83f3192c2e482/src/loaders/Track.ts#L93)

***

### release

> **release**: [`Release`](Release.md)

#### Defined in

[loaders/Track.ts:96](https://github.com/sagaverse-io/SagaverseOrdinalAPI/blob/90d228bc8061a836e19a66b3b1e83f3192c2e482/src/loaders/Track.ts#L96)

***

### duration

> **duration**: `number` = `0.0`

#### Defined in

[loaders/Track.ts:136](https://github.com/sagaverse-io/SagaverseOrdinalAPI/blob/90d228bc8061a836e19a66b3b1e83f3192c2e482/src/loaders/Track.ts#L136)

***

### audioURL

> **audioURL**: `string` = `""`

#### Defined in

[loaders/Track.ts:139](https://github.com/sagaverse-io/SagaverseOrdinalAPI/blob/90d228bc8061a836e19a66b3b1e83f3192c2e482/src/loaders/Track.ts#L139)

***

### \_loaded

> **\_loaded**: `boolean` = `true`

#### Defined in

[loaders/Track.ts:142](https://github.com/sagaverse-io/SagaverseOrdinalAPI/blob/90d228bc8061a836e19a66b3b1e83f3192c2e482/src/loaders/Track.ts#L142)

***

### id?

> `optional` **id**: `string`

#### Defined in

[loaders/Track.ts:145](https://github.com/sagaverse-io/SagaverseOrdinalAPI/blob/90d228bc8061a836e19a66b3b1e83f3192c2e482/src/loaders/Track.ts#L145)

***

### mm

> **mm**: `Media` = `{}`

#### Defined in

[loaders/Track.ts:148](https://github.com/sagaverse-io/SagaverseOrdinalAPI/blob/90d228bc8061a836e19a66b3b1e83f3192c2e482/src/loaders/Track.ts#L148)

## Methods

### \_load()

> `static` **\_load**(`_id`): `Promise`\<[`Track`](Track.md)\>

#### Parameters

• **\_id**: `string`

#### Returns

`Promise`\<[`Track`](Track.md)\>

#### Defined in

[loaders/Track.ts:15](https://github.com/sagaverse-io/SagaverseOrdinalAPI/blob/90d228bc8061a836e19a66b3b1e83f3192c2e482/src/loaders/Track.ts#L15)

***

### loadData()

> **loadData**(): `Promise`\<[`Track`](Track.md)\>

#### Returns

`Promise`\<[`Track`](Track.md)\>

#### Defined in

[loaders/Track.ts:99](https://github.com/sagaverse-io/SagaverseOrdinalAPI/blob/90d228bc8061a836e19a66b3b1e83f3192c2e482/src/loaders/Track.ts#L99)
