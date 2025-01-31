[Open Ordial API](../../README.md) / [OOAPI](../README.md) / cached

# Function: cached()

> **cached**\<`T`\>(`func`): (`id`) => `Promise`\<`T`\>

Defined in: [src/OOAPI.Core.ts:784](https://github.com/open-ordinal/open-ordinal-api/blob/a0d5891263931a6fab499adb8c2ba3d4a1ef0c78/src/OOAPI.Core.ts#L784)

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
