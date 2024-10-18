[Open Ordial API](../../README.md) / [OOAPI](../README.md) / Release

# Class: Release

## Constructors

### new Release()

> **new Release**(): [`Release`](Release.md)

#### Returns

[`Release`](Release.md)

## Properties

### fallbackCover

> `static` **fallbackCover**: `string` = `""`

#### Defined in

[loaders/Release.ts:8](https://github.com/sagaverse-io/SagaverseOrdinalAPI/blob/90d228bc8061a836e19a66b3b1e83f3192c2e482/src/loaders/Release.ts#L8)

***

### load()

> `static` **load**: (`id`) => `Promise`\<[`Release`](Release.md)\>

#### Parameters

• **id**: `string`

#### Returns

`Promise`\<[`Release`](Release.md)\>

#### Defined in

[loaders/Release.ts:11](https://github.com/sagaverse-io/SagaverseOrdinalAPI/blob/90d228bc8061a836e19a66b3b1e83f3192c2e482/src/loaders/Release.ts#L11)

***

### id?

> `optional` **id**: `string`

#### Defined in

[loaders/Release.ts:89](https://github.com/sagaverse-io/SagaverseOrdinalAPI/blob/90d228bc8061a836e19a66b3b1e83f3192c2e482/src/loaders/Release.ts#L89)

***

### title

> **title**: `string` = `""`

#### Defined in

[loaders/Release.ts:92](https://github.com/sagaverse-io/SagaverseOrdinalAPI/blob/90d228bc8061a836e19a66b3b1e83f3192c2e482/src/loaders/Release.ts#L92)

***

### type

> **type**: `string` = `""`

#### Defined in

[loaders/Release.ts:95](https://github.com/sagaverse-io/SagaverseOrdinalAPI/blob/90d228bc8061a836e19a66b3b1e83f3192c2e482/src/loaders/Release.ts#L95)

***

### date

> **date**: `Date`

#### Defined in

[loaders/Release.ts:98](https://github.com/sagaverse-io/SagaverseOrdinalAPI/blob/90d228bc8061a836e19a66b3b1e83f3192c2e482/src/loaders/Release.ts#L98)

***

### artists

> **artists**: [`Artist`](Artist.md)[] = `[]`

#### Defined in

[loaders/Release.ts:101](https://github.com/sagaverse-io/SagaverseOrdinalAPI/blob/90d228bc8061a836e19a66b3b1e83f3192c2e482/src/loaders/Release.ts#L101)

***

### coverURL

> **coverURL**: `string` = `""`

#### Defined in

[loaders/Release.ts:104](https://github.com/sagaverse-io/SagaverseOrdinalAPI/blob/90d228bc8061a836e19a66b3b1e83f3192c2e482/src/loaders/Release.ts#L104)

***

### tracks

> **tracks**: [`Track`](Track.md)[] = `[]`

#### Defined in

[loaders/Release.ts:142](https://github.com/sagaverse-io/SagaverseOrdinalAPI/blob/90d228bc8061a836e19a66b3b1e83f3192c2e482/src/loaders/Release.ts#L142)

***

### \_loaded

> **\_loaded**: `boolean` = `true`

#### Defined in

[loaders/Release.ts:145](https://github.com/sagaverse-io/SagaverseOrdinalAPI/blob/90d228bc8061a836e19a66b3b1e83f3192c2e482/src/loaders/Release.ts#L145)

***

### \_tracks?

> `optional` **\_tracks**: `Linked`\<`Track`\>[]

#### Defined in

[loaders/Release.ts:148](https://github.com/sagaverse-io/SagaverseOrdinalAPI/blob/90d228bc8061a836e19a66b3b1e83f3192c2e482/src/loaders/Release.ts#L148)

## Accessors

### artist

> `get` **artist**(): [`Artist`](Artist.md)

#### Returns

[`Artist`](Artist.md)

#### Defined in

[loaders/Release.ts:70](https://github.com/sagaverse-io/SagaverseOrdinalAPI/blob/90d228bc8061a836e19a66b3b1e83f3192c2e482/src/loaders/Release.ts#L70)

***

### year

> `get` **year**(): `number`

#### Returns

`number`

#### Defined in

[loaders/Release.ts:75](https://github.com/sagaverse-io/SagaverseOrdinalAPI/blob/90d228bc8061a836e19a66b3b1e83f3192c2e482/src/loaders/Release.ts#L75)

***

### duration

> `get` **duration**(): `number`

#### Returns

`number`

#### Defined in

[loaders/Release.ts:80](https://github.com/sagaverse-io/SagaverseOrdinalAPI/blob/90d228bc8061a836e19a66b3b1e83f3192c2e482/src/loaders/Release.ts#L80)

## Methods

### \_load()

> `static` **\_load**(`_id`): `Promise`\<[`Release`](Release.md)\>

#### Parameters

• **\_id**: `string`

#### Returns

`Promise`\<[`Release`](Release.md)\>

#### Defined in

[loaders/Release.ts:14](https://github.com/sagaverse-io/SagaverseOrdinalAPI/blob/90d228bc8061a836e19a66b3b1e83f3192c2e482/src/loaders/Release.ts#L14)

***

### loadData()

> **loadData**(): `Promise`\<[`Release`](Release.md)\>

#### Returns

`Promise`\<[`Release`](Release.md)\>

#### Defined in

[loaders/Release.ts:107](https://github.com/sagaverse-io/SagaverseOrdinalAPI/blob/90d228bc8061a836e19a66b3b1e83f3192c2e482/src/loaders/Release.ts#L107)
