[Open Ordial API](../../../../README.md) / [OOAPI](../../../README.md) / [OOMD](../README.md) / Track

# Interface: Track

Defined in: node\_modules/@open-ordinal/metadata/lib/protocols/Track.d.ts:10

This interface represents a track, including its title and optional arrays of
linked releases and artists.

## Properties

### title

> **title**: `string`

Defined in: node\_modules/@open-ordinal/metadata/lib/protocols/Track.d.ts:14

The title of the track

***

### releases?

> `optional` **releases**: (`string` \| [`Linked`](../type-aliases/Linked.md)\<[`Release`](Release.md)\>)[]

Defined in: node\_modules/@open-ordinal/metadata/lib/protocols/Track.d.ts:19

An optional array of linked releases or release names, otherwise assumed to
be any parent inscriptions implementing Release

***

### artists?

> `optional` **artists**: (`string` \| [`Linked`](../type-aliases/Linked.md)\<[`Artist`](Artist.md)\>)[]

Defined in: node\_modules/@open-ordinal/metadata/lib/protocols/Track.d.ts:24

An optional array of linked artists or artist names, otherwise assumed to
be any grand parent inscriptions implementing Artist
