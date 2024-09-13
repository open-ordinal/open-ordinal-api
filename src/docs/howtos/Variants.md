---
title: Variants
group: Documents
---
# Variants
A Variant is a variant of the ordinal. It's a visual distinct visual representation. E.g. A 2D representation or a 3D representation.

This adds two variants by default. Upon calling `ooAPI.ready()`, the first variant added will be displayed

## Inside Ordinal (Expose)

Example:
```ts
let ooAPI = window.ooAPI;

ooAPI.addVariant({
    type: 'image',
    name: 'default',
    id: '123',
    onDisplay: () => {
        displayVariant('default');
    }
})

ooAPI.addVariant({
    type: 'image',
    name: 'reversed',
    id: '321',
    onDisplay: () => {
        displayVariant('reverse');
    }
})
```

## Outside Ordinal (Consume)

Exmaple:
```ts
let ooAPI = window.ooAPI;

const variants = ooAPI.getVariants();
for (let variant of variants) {
    // Fetch the asset data, DataURL, BLOB or inscription id
    let exportedVariant = await variant.export()
}
```