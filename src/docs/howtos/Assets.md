---
title: Assets
group: Documents
---
# Assets
Asset(s) an Ordinal exposes to be used by externals e.g. an Image asset, audio asset, jpeg etc. 

## Inside Ordinal (Expose)

Code
```ts
let ooAPI = window.ooAPI;

ooAPI.addAsset({
    type: 'image',
    name: 'asset1',
    id: '123',
    onExport: () => {
        return someFunctionOrVariableWithDataURL;
    }
});

ooAPI.addAsset({
    type: 'image',
    name: 'asset2',
    id: '321',
    onExport: () => {
        return '6fb976ab49dcec017f1e201e84395983204ae1a7c2abf7ced0a85d692e442799i0';
    }
});
```

## Outside Ordinal (Consume)

Code
```ts
let ooAPI = window.ooAPI;

const assets = ooAPI.getAssets();
for (let asset of assets) {
    // Export an asset
    let assetData = await asset.data();
}
```
