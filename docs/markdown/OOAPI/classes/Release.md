[Open Ordial API](../../README.md) / [OOAPI](../README.md) / Release

# Class: Release

Defined in: [src/loaders/Release.ts:6](https://github.com/open-ordinal/open-ordinal-api/blob/09ea1ce92dd206b5b26f35b329c90c6b41c2680b/src/loaders/Release.ts#L6)

## Constructors

### new Release()

> **new Release**(): [`Release`](Release.md)

#### Returns

[`Release`](Release.md)

## Properties

### fallbackCover

> `static` **fallbackCover**: `string` = `""`

Defined in: [src/loaders/Release.ts:8](https://github.com/open-ordinal/open-ordinal-api/blob/09ea1ce92dd206b5b26f35b329c90c6b41c2680b/src/loaders/Release.ts#L8)

***

### load()

> `static` **load**: (`id`) => `Promise`\<[`Release`](Release.md)\>

Defined in: [src/loaders/Release.ts:11](https://github.com/open-ordinal/open-ordinal-api/blob/09ea1ce92dd206b5b26f35b329c90c6b41c2680b/src/loaders/Release.ts#L11)

#### Parameters

##### id

`string`

#### Returns

`Promise`\<[`Release`](Release.md)\>

***

### id?

> `optional` **id**: `string`

Defined in: [src/loaders/Release.ts:89](https://github.com/open-ordinal/open-ordinal-api/blob/09ea1ce92dd206b5b26f35b329c90c6b41c2680b/src/loaders/Release.ts#L89)

***

### title

> **title**: `string` = `""`

Defined in: [src/loaders/Release.ts:92](https://github.com/open-ordinal/open-ordinal-api/blob/09ea1ce92dd206b5b26f35b329c90c6b41c2680b/src/loaders/Release.ts#L92)

***

### type

> **type**: `string` = `""`

Defined in: [src/loaders/Release.ts:95](https://github.com/open-ordinal/open-ordinal-api/blob/09ea1ce92dd206b5b26f35b329c90c6b41c2680b/src/loaders/Release.ts#L95)

***

### date

> **date**: `Date`

Defined in: [src/loaders/Release.ts:98](https://github.com/open-ordinal/open-ordinal-api/blob/09ea1ce92dd206b5b26f35b329c90c6b41c2680b/src/loaders/Release.ts#L98)

***

### artists

> **artists**: [`Artist`](Artist.md)[] = `[]`

Defined in: [src/loaders/Release.ts:101](https://github.com/open-ordinal/open-ordinal-api/blob/09ea1ce92dd206b5b26f35b329c90c6b41c2680b/src/loaders/Release.ts#L101)

***

### coverURL

> **coverURL**: `string` = `""`

Defined in: [src/loaders/Release.ts:104](https://github.com/open-ordinal/open-ordinal-api/blob/09ea1ce92dd206b5b26f35b329c90c6b41c2680b/src/loaders/Release.ts#L104)

***

### tracks

> **tracks**: [`Track`](Track.md)[] = `[]`

Defined in: [src/loaders/Release.ts:142](https://github.com/open-ordinal/open-ordinal-api/blob/09ea1ce92dd206b5b26f35b329c90c6b41c2680b/src/loaders/Release.ts#L142)

***

### \_loaded

> **\_loaded**: `boolean` = `true`

Defined in: [src/loaders/Release.ts:145](https://github.com/open-ordinal/open-ordinal-api/blob/09ea1ce92dd206b5b26f35b329c90c6b41c2680b/src/loaders/Release.ts#L145)

***

### \_tracks?

> `optional` **\_tracks**: [`Linked`](../namespaces/OOMD/type-aliases/Linked.md)\<[`Track`](../namespaces/OOMD/interfaces/Track.md)\>[]

Defined in: [src/loaders/Release.ts:148](https://github.com/open-ordinal/open-ordinal-api/blob/09ea1ce92dd206b5b26f35b329c90c6b41c2680b/src/loaders/Release.ts#L148)

## Accessors

### artist

#### Get Signature

> **get** **artist**(): [`Artist`](Artist.md)

Defined in: [src/loaders/Release.ts:70](https://github.com/open-ordinal/open-ordinal-api/blob/09ea1ce92dd206b5b26f35b329c90c6b41c2680b/src/loaders/Release.ts#L70)

##### Returns

[`Artist`](Artist.md)

***

### year

#### Get Signature

> **get** **year**(): `number`

Defined in: [src/loaders/Release.ts:75](https://github.com/open-ordinal/open-ordinal-api/blob/09ea1ce92dd206b5b26f35b329c90c6b41c2680b/src/loaders/Release.ts#L75)

##### Returns

`number`

***

### duration

#### Get Signature

> **get** **duration**(): `number`

Defined in: [src/loaders/Release.ts:80](https://github.com/open-ordinal/open-ordinal-api/blob/09ea1ce92dd206b5b26f35b329c90c6b41c2680b/src/loaders/Release.ts#L80)

##### Returns

`number`

## Methods

### \_load()

> `static` **\_load**(`_id`): `Promise`\<[`Release`](Release.md)\>

Defined in: [src/loaders/Release.ts:14](https://github.com/open-ordinal/open-ordinal-api/blob/09ea1ce92dd206b5b26f35b329c90c6b41c2680b/src/loaders/Release.ts#L14)

#### Parameters

##### \_id

`string`

#### Returns

`Promise`\<[`Release`](Release.md)\>

***

### loadData()

> **loadData**(): `Promise`\<[`Release`](Release.md)\>

Defined in: [src/loaders/Release.ts:107](https://github.com/open-ordinal/open-ordinal-api/blob/09ea1ce92dd206b5b26f35b329c90c6b41c2680b/src/loaders/Release.ts#L107)

#### Returns

`Promise`\<[`Release`](Release.md)\>
