[Open Ordial API](../../../../README.md) / [OOAPI](../../../README.md) / [OOMD](../README.md) / Release

# Interface: Release

Defined in: node\_modules/@open-ordinal/metadata/lib/protocols/Release.d.ts:10

This interface represents a release, including its type, title, optional date,
optional cover, and optional arrays of linked artists and tracks.

## Properties

### type

> **type**: `string`

Defined in: node\_modules/@open-ordinal/metadata/lib/protocols/Release.d.ts:15

The type of the release (e.g., album, single, EP, compilation,
or custom string)

***

### title

> **title**: `string`

Defined in: node\_modules/@open-ordinal/metadata/lib/protocols/Release.d.ts:19

The title of the release

***

### date?

> `optional` **date**: `Date`

Defined in: node\_modules/@open-ordinal/metadata/lib/protocols/Release.d.ts:23

An optional release date

***

### cover?

> `optional` **cover**: [`Link`](../type-aliases/Link.md)

Defined in: node\_modules/@open-ordinal/metadata/lib/protocols/Release.d.ts:27

An optional cover visual

***

### artists?

> `optional` **artists**: (`string` \| [`Linked`](../type-aliases/Linked.md)\<[`Artist`](Artist.md)\>)[]

Defined in: node\_modules/@open-ordinal/metadata/lib/protocols/Release.d.ts:32

An optional array of linked artists or artist names, otherwise assumed
to be parent inscriptions implementing Artist

***

### tracks?

> `optional` **tracks**: [`Linked`](../type-aliases/Linked.md)\<[`Track`](Track.md)\>[]

Defined in: node\_modules/@open-ordinal/metadata/lib/protocols/Release.d.ts:37

An optional array of linked tracks, otherwise assumed to be child
inscriptions implementing Track
