---
title: Traits
group: Documents
---
# Traits
Defines a single or multiple traits of the ordinal by name and value

## Inside Ordinal (Expose)

Code
```ts
let ooAPI = window.ooAPI;

ooAPI.addTrait({
    name: 'hat',
    value: "party hat"
});

ooAPI.addTrait({
    name: 'head',
    value: "human"
});
```

## Outside Ordinal (Consume)

Code
```ts
let ooAPI = window.ooAPI;

const traits = ooAPI.getTraits();
for (let trait of traits) {
    let name = trait.name;
    let value = trait.value;
}
```