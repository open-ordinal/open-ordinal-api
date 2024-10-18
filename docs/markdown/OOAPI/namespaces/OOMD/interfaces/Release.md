[Open Ordial API](../../../../README.md) / [OOAPI](../../../README.md) / [OOMD](../README.md) / Release

# Interface: Release

This interface represents a release, including its type, title, optional date,
optional cover, and optional arrays of linked artists and tracks.

## Properties

### type

> **type**: `string`

The type of the release (e.g., album, single, EP, compilation,
or custom string)

#### Defined in

node\_modules/@open-ordinal/metadata/lib/protocols/Release.d.ts:15

***

### title

> **title**: `string`

The title of the release

#### Defined in

node\_modules/@open-ordinal/metadata/lib/protocols/Release.d.ts:19

***

### date?

> `optional` **date**: `Date`

An optional release date

#### Defined in

node\_modules/@open-ordinal/metadata/lib/protocols/Release.d.ts:23

***

### cover?

> `optional` **cover**: [`Link`](../type-aliases/Link.md)

An optional cover visual

#### Defined in

node\_modules/@open-ordinal/metadata/lib/protocols/Release.d.ts:27

***

### artists?

> `optional` **artists**: (`string` \| [`Linked`](../type-aliases/Linked.md)\<[`Artist`](Artist.md)\>)[]

An optional array of linked artists or artist names, otherwise assumed
to be parent inscriptions implementing Artist

#### Defined in

node\_modules/@open-ordinal/metadata/lib/protocols/Release.d.ts:32

***

### tracks?

> `optional` **tracks**: [`Linked`](../type-aliases/Linked.md)\<[`Track`](Track.md)\>[]

An optional array of linked tracks, otherwise assumed to be child
inscriptions implementing Track

#### Defined in

node\_modules/@open-ordinal/metadata/lib/protocols/Release.d.ts:37
