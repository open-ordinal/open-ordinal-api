[Open Ordial API](../../README.md) / [OOAPI](../README.md) / cached

# Function: cached()

> **cached**\<`T`\>(`func`): (`id`) => `Promise`\<`T`\>

Defined in: [src/OOAPI.Core.ts:784](https://github.com/open-ordinal/open-ordinal-api/blob/09ea1ce92dd206b5b26f35b329c90c6b41c2680b/src/OOAPI.Core.ts#L784)

A cache helper to cache single functions and their return variable.

## Type Parameters

• **T**

## Parameters

### func

(`id`) => `Promise`\<`T`\>

The function to cache.

## Returns

`Function`

- A function which upon subsequent calls with the same id parameter returns the result from the first call.

### Parameters

#### id

`string`

### Returns

`Promise`\<`T`\>
