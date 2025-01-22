[Open Ordial API](../../../../README.md) / [OOAPI](../../../README.md) / [OOMD](../README.md) / Bootstrap

# Interface: Bootstrap

Defined in: node\_modules/@open-ordinal/metadata/lib/protocols/Bootstrap.d.ts:6

This interface defines the Options used for Open Ordinal Bootstrap.

## Properties

### mode

> **mode**: [`BootstrapMode`](../enumerations/BootstrapMode.md)

Defined in: node\_modules/@open-ordinal/metadata/lib/protocols/Bootstrap.d.ts:11

The mode for bootstrap. Mode 0 is obmitted due to the default and would
lead to a recursive deadlock.

***

### id?

> `optional` **id**: `number`

Defined in: node\_modules/@open-ordinal/metadata/lib/protocols/Bootstrap.d.ts:15

Optional: The inscription Id to bootstrap

***

### sat?

> `optional` **sat**: `number`

Defined in: node\_modules/@open-ordinal/metadata/lib/protocols/Bootstrap.d.ts:19

Optional: The sat Id to bootstrap

***

### index?

> `optional` **index**: `number`

Defined in: node\_modules/@open-ordinal/metadata/lib/protocols/Bootstrap.d.ts:23

Optional: Index on sat to bootstrap

***

### data?

> `optional` **data**: `any`

Defined in: node\_modules/@open-ordinal/metadata/lib/protocols/Bootstrap.d.ts:27

Optional: Data to pass into the bootstrap

***

### res?

> `optional` **res**: `object`

Defined in: node\_modules/@open-ordinal/metadata/lib/protocols/Bootstrap.d.ts:31

Optional: Additional inscriptions to load and pass into `bootstrap()`

#### Index Signature

\[`_`: `string`\]: [`BootstrapResource`](BootstrapResource.md)

***

### oo?

> `optional` **oo**: [`BootstrapOpenOrdinalModules`](BootstrapOpenOrdinalModules.md)

Defined in: node\_modules/@open-ordinal/metadata/lib/protocols/Bootstrap.d.ts:37

Optional: Additional Open Ordinal modules to load
