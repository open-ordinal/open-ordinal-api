[Open Ordial API](../../../../README.md) / [OOAPI](../../../README.md) / [OOMD](../README.md) / Artist

# Interface: Artist

Defined in: node\_modules/@open-ordinal/metadata/lib/protocols/Artist.d.ts:9

This interface represents an artist, including their name, an optional description,
and an optional array of linked releases.

## Properties

### name

> **name**: `string`

Defined in: node\_modules/@open-ordinal/metadata/lib/protocols/Artist.d.ts:13

The name of the artist

***

### description?

> `optional` **description**: `string`

Defined in: node\_modules/@open-ordinal/metadata/lib/protocols/Artist.d.ts:17

An optional description of the artist

***

### releases?

> `optional` **releases**: [`Linked`](../type-aliases/Linked.md)\<[`Release`](Release.md)\>[]

Defined in: node\_modules/@open-ordinal/metadata/lib/protocols/Artist.d.ts:22

An optional array of linked releases, otherwise assumed to be child inscriptions
implementing Release
