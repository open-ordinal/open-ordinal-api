---
title: Compositions
group: Documents
---
# Compositions
A composition is usually a composition of multiple assets that represents a single output. The output can be e.g. an animated, a sprite, a combination of a character that is not default(No background).

## Inside Ordinal (Expose)

Code
```ts
let ooAPI = window.ooAPI;

ooAPI.addComposition({
    type: 'image',
    name: 'composition1',
    id: '123',
    onExport: () => {
        return drawComposition(0);
    }
});

ooAPI.addComposition({
    type: 'image',
    name: 'composition2',
    id: '321',
    onExport: () => {
        return drawComposition(1);
    }
});
```

## Outside Ordinal (Consume)

Code
```ts
let ooAPI = window.ooAPI;

const compositions = ooAPI.getCompositions();
for (let composition of compositions) {
    // Fetch the asset data, DataURL, BLOB or inscription id
    let data = await compositions.export();
}
```