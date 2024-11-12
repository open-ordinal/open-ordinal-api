[Open Ordial API](../../../../README.md) / [OOAPI](../../../README.md) / [OOMD](../README.md) / Bootstrap

# Interface: Bootstrap

This interface defines the Options used for Open Ordinal Bootstrap.

## Properties

### mode

> **mode**: [`BootstrapMode`](../enumerations/BootstrapMode.md)

The mode for bootstrap. Mode 0 is obmitted due to the default and would
lead to a recursive deadlock.

#### Defined in

node\_modules/@open-ordinal/metadata/lib/protocols/Bootstrap.d.ts:11

***

### id?

> `optional` **id**: `number`

Optional: The inscription Id to bootstrap

#### Defined in

node\_modules/@open-ordinal/metadata/lib/protocols/Bootstrap.d.ts:15

***

### sat?

> `optional` **sat**: `number`

Optional: The sat Id to bootstrap

#### Defined in

node\_modules/@open-ordinal/metadata/lib/protocols/Bootstrap.d.ts:19

***

### index?

> `optional` **index**: `number`

Optional: Index on sat to bootstrap

#### Defined in

node\_modules/@open-ordinal/metadata/lib/protocols/Bootstrap.d.ts:23

***

### data?

> `optional` **data**: `any`

Optional: Data to pass into the bootstrap

#### Defined in

node\_modules/@open-ordinal/metadata/lib/protocols/Bootstrap.d.ts:27

***

### res?

> `optional` **res**: `object`

Optional: Additional inscriptions to load and pass into `bootstrap()`

#### Index Signature

 \[`_`: `string`\]: [`BootstrapResource`](BootstrapResource.md)

#### Defined in

node\_modules/@open-ordinal/metadata/lib/protocols/Bootstrap.d.ts:31

***

### oo?

> `optional` **oo**: [`BootstrapOpenOrdinalModules`](BootstrapOpenOrdinalModules.md)

Optional: Additional Open Ordinal modules to load

#### Defined in

node\_modules/@open-ordinal/metadata/lib/protocols/Bootstrap.d.ts:37
