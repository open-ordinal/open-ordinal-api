---
title: Setup Example
group: Documents
---
# Use Case - Initial Setup of ooAPI

This example demonstrates how to initialize the `ooAPI`, add some fake asset files, and call `ooAPI.ready()`.

In this example, we will create two fake image assets and add them to the `ooAPI`. We will also define a default variant and a composition that can be exported later. This setup is a foundational step for any application that utilizes the `ooAPI`.

Code
```js
// Assuming ooAPI is already available in the window
const fakeAssets = [
    {
        type: 'image',
        name: 'Fake Image 1',
        id: 'fake-image-1',
        data: 'data:image/png;base64,...' // Replace with actual Base64 DataURL or /content/ inscription id
    },
    {
        type: 'image',
        name: 'Fake Image 2',
        id: 'fake-image-2',
        data: 'data:image/png;base64,...' // Replace with actual Base64 DataURL or /content/ inscription id
    }
];

let ooAPI = window.ooAPI;
// Function to set up ooAPI with fake assets
async function setupOOAPI() {
    // Adding assets to ooAPI
    fakeAssets.forEach(asset => {
        ooAPI.addAsset(asset);
        console.log(Added asset: ${asset.name});
    });
    
    // Adding a variant, this will be displayed by default when ooAPI.ready() is called
    ooAPI.addVariant({
        type: 'image',
        name: 'Default Variant',
        id: 'default-variant',
        onDisplay: () => {
            console.log('Displaying Default Variant');
        }
    });
    // Adding a composition
    ooAPI.addComposition({
        type: 'image',
        name: 'Fake Composition',
        id: 'fake-composition',
        onExport: () => {
            console.log('Exporting Fake Composition');
            let comp = funcToExport();
            return comp;
        }
    });
    // Call ready to signal that setup is complete
    ooAPI.ready();
    console.log('ooAPI is ready!');
}
// Start the setup
setupOOAPI();
```