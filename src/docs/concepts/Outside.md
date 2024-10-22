# Outside of the Ordinal
Consuming the Open Ordinal API. Usage of the Open Ordinal API from a **consumer** perspective.

## v1

Code
```js
// Get the ooAPI instance - Assuming an async context
let ooAPI = window.ooAPI;

// Handle assets
let allAssets = ooAPI.getAssets();

// If known assets by name, id 
let filterNames = ['first_asset', 'second_asset'];
let filteredAssets = allAssets.filter(asset => filterNames.includes(asset.name))

for(const asset of filteredAssets) {
   let data = await asset.data();
    // Do something with asset
}

for(const asset of allAssets) {
   let data = await asset.data();
    // Do something with asset
}

// Handle compositions
let allCompositions = ooAPI.getCompositions();

// If known assets by name or id 
let filterIdsComps = ['first_comp_id', 'second_comp_id']
let filteredCompositions = allCompositions.filter(composition => filterIdsComps.includes(composition.id))

for(const comp of filteredCompositions) {
    let exported = await comp.export();
    // Do something with exported composition (DataURL usually)
}

for(const comp of allCompositions) {
     let exported = await comp.export();
    // Do something with all exported compositions
}

// Variants
let allVariants = ooAPI.getVariants();

let filteredVariantNames = ['Default', 'Secondary'];
let filteredVariants = allVariants.filter(variant => filteredVariantNames.includes(variant.name))

for(const variant of filteredVariants) {
    // Display the variant
    ooAPI.setDisplayedVariant(variant);
}

for(const variant of allVariants) {
    // Export all variants, as long as they are exportable
    let exportedVariant = await variant.export();
    // Do something with the exported variant
}
```

## v2

Code
```js
// Get the ooAPI instance - Assuming an async context
let ooAPI = window.ooAPI;

async function processOrdinalWithOOAPI() {
    // Handle assets
    let allAssets = ooAPI.getAssets();

    // If known assets by name, id 
    let filterNames = ['My Image Asset', 'second_asset'];
    let filteredAssets = allAssets.filter(asset => filterNames.includes(asset.name));

    for (const asset of filteredAssets) {
        try {
            let data = await asset.data(); // Ensure this is in an async function
            // Do something with asset
        } catch (error) {
            console.error('Error fetching data for asset:', asset, error);
        }
    }

    for (const asset of allAssets) {
        try {
            let data = await asset.data(); // Ensure this is in an async function
            // Do something with asset
        } catch (error) {
            console.error('Error fetching data for asset:', asset, error);
        }
    }

    // Handle compositions
    let allCompositions = ooAPI.getCompositions();

    // If known assets by name or id 
    let filterIdsComps = ['my-composition-id', 'second_comp_id'];
    let filteredCompositions = allCompositions.filter(composition => filterIdsComps.includes(composition.id));

    for (const comp of filteredCompositions) {
        try {
            let exported = await comp.export();
            // Do something with exported composition (DataURL usually)
        } catch (error) {
            console.error('Error exporting composition:', comp, error);
        }
    }

    for (const comp of allCompositions) {
        try {
            let exported = await comp.export();
            // Do something with all exported compositions
        } catch (error) {
            console.error('Error exporting composition:', comp, error);
        }
    }

    // Variants
    let allVariants = ooAPI.getVariants();

    let filteredVariantNames = ['Default', 'Secondary'];
    let filteredVariants = allVariants.filter(variant => filteredVariantNames.includes(variant.name));

    for (const variant of filteredVariants) {
        // Display the variant
        ooAPI.setDisplayedVariant(variant);
    }

    for (const variant of allVariants) {
        try {
            // Export all variants, as long as they are exportable
            let exportedVariant = await variant.export();
            // Do something with the exported variant
        } catch (error) {
            console.error('Error exporting variant:', variant, error);
        }
    }
}

// Start the processing
processOrdinalWithOOAPI()
```