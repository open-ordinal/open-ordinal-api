---
title: Interacting With API
group: Documents
---
# Conclusion
Now you have a collection with a parent, as well as children connected to that parent. 

The parent has the Open Ordinal API set up, along with a visual representation. Connected to that, you have all the collection children, which also have the Open Ordinal API set up and a visual representation.

You can now start to think about how you want to interact with your collection. Consider what you want to allow users to see and export, whether it's a single asset on-chain or embedded data in your ordinal. 

Switching between different variants is possible by adding search parameters to the URL. 

For example, if you have two variants added to the Open Ordinal API, "Default" and "Rainbow", the default variant shown when you call `ooAPI.ready()` will be the first one added, which is "Default".

If you want to switch to the "Rainbow" variant, you can do so by adding `?variant=Rainbow` to the URL. The API will take that into account and execute the code for the Rainbow variant.

# API Overview
## Consuming the Open Ordinal API

Now that you have set up your ordinal collection using the Open Ordinal API, it's time to explore how to consume the API to interact with your collection. This guide will walk you through the various methods provided by the Open Ordinal API to access and manipulate your collection.

## Getting Variants

To get a list of all variants available in your collection, use the `ooAPI.getVariants()` method. This method returns an array of variant objects, each containing information about the variant such as its name, type, and ID.

Code
```js
ooAPI.getVariants().then(variants => {
    console.log(variants); // Array of variant objects
}).catch(error => {
    console.error("Error fetching variants:", error);
});
```

## Getting Compositions

To get a list of all compositions available in your collection, use the `ooAPI.getCompositions()` method. This method returns an array of composition objects, each containing information about the composition such as its name, description, and assets.

Code
```js
ooAPI.getCompositions().then(compositions => {
    console.log(compositions); // Array of composition objects
}).catch(error => {
    console.error("Error fetching compositions:", error);
});
```

## Getting the Collection

To get information about the collection itself, use the `ooAPI.getCollection()` method. This method returns an object containing information about the collection such as its name, description, and traits.

Code
```js
ooAPI.getCollection().then(collection => {
    console.log(collection); // Collection object
}).catch(error => {
    console.error("Error fetching collection:", error);
});
```

## Getting Assets

To get a list of all assets available in your collection, use the `ooAPI.getAssets()` method. This method returns an array of asset objects, each containing information about the asset such as its name, type, and URL.

Code
```js
ooAPI.getAssets().then(assets => {
    console.log(assets); // Array of asset objects
}).catch(error => {
    console.error("Error fetching assets:", error);
});
```

## Displaying Variants

To display different variants in your collection, use the `ooAPI.displayVariant()` method. This method takes the name of the variant you want to display to as an argument.

Code
```js
let variant_2 = ooAPI.getVariants()[1];

ooAPI.displayVariant(variant_2).then(() => {
    console.log("Displaying variant #2");
}).catch(error => {
    console.error("Error switching variant:", error);
});
```

or 

Code
```js
ooAPI.displayVariant('Rainbow').then(() => {
    console.log("Variant switched to Rainbow");
}).catch(error => {
    console.error("Error switching variant:", error);
});
```

## Conclusion

With these methods, you can now consume the Open Ordinal API to interact with your collection in various ways. Whether you want to display a list of variants, compositions, or assets, or switch between different variants, the Open Ordinal API provides a simple and intuitive way to do so.


