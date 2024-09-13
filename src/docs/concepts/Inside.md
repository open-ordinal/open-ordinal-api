# Inside of the Ordinal
Developing with the Open Ordinal API. Usage of the Open Ordinal API from a **developer** perspective.

```js
let ooAPI = window.ooAPI;

// Exposing Variants
// To expose a variant that can be displayed, use the following code:
// The first variant added, will have its onDisplay function called when the
// ooAPI.ready() function is called.
ooAPI.addVariant({
    type: 'image',
    name: 'Default',
    id: 'my-variant-id',
    onDisplay: () => {
        // Logic to be executed when the variant is displayed
        console.log('Displaying Default');
    },
    onHide: () => {
        // Logic to be executed when the variant is hidden
        console.log('Hiding Default');
    }
});

// Add compositions you want to be available for consumers
ooAPI.addComposition({
    type: 'image',
    name: 'My Composition',
    id: 'my-composition-id',
    onExport: () => {
        // Logic to export the composition
        console.log('Exporting My Composition');
    }
});

// Add assets you want to be available for consumers
ooAPI.addAsset({
    type: 'image',
    name: 'My Image Asset',
    id: 'my-image-id',
    data: 'data:image/png;base64,...' // Base64 encoded image data or inscription ID
});
```