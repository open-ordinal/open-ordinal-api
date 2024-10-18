[Open Ordial API](../../../../README.md) / [OOAPI](../../../README.md) / [OOMD](../README.md) / Artist

# Interface: Artist

This interface represents an artist, including their name, an optional description,
and an optional array of linked releases.

## Properties

### name

> **name**: `string`

The name of the artist

#### Defined in

node\_modules/@open-ordinal/metadata/lib/protocols/Artist.d.ts:13

***

### description?

> `optional` **description**: `string`

An optional description of the artist

#### Defined in

node\_modules/@open-ordinal/metadata/lib/protocols/Artist.d.ts:17

***

### releases?

> `optional` **releases**: [`Linked`](../type-aliases/Linked.md)\<[`Release`](Release.md)\>[]

An optional array of linked releases, otherwise assumed to be child inscriptions
implementing Release

#### Defined in

node\_modules/@open-ordinal/metadata/lib/protocols/Artist.d.ts:22
