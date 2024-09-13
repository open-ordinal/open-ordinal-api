---
title: Collections
group: Documents
---
# Collections
A Collection Object defines the name, description, and trait categories of the collection.

## Inside Ordinal (Expose)

Example:
```ts
let ooAPI = window.ooAPI;
let collection = new ooAPI.Collection({});

collection.addTraitCategory({
    name: 'hat',
    traitNames: ["party hat", "santa hat"]
})
collection.addTraitCategory({
    name: 'head',
    traitNames: ["devil", "human", "angel"]
})
collection.addTraitCategory({
    name: 'body',
    traitNames: ["chunky", "green", "cowboy"]
})
collection.addTraitCategory({
    name: 'asset',
    traitNames: ["ski mask", "apple vision"]
})

ooAPI.addCollection(collection);
```

## Outside Ordinal (Consume)

```ts
let ooAPI = window.ooAPI;

const collections = ooAPI.getCollections();
for (let collection of collections) {
    let name = collection.name;
    let description = collection.description;
    let traits = collection.collectionTraits;
}
```