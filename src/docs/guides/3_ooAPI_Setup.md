---
title: Setup
group: Documents
---
# Setup of Ordinal Collection (General Idea, Open to Interpretation)
Setup process:

1. Each child is an HTML file that describes the ordinal through some kind of recipe.
2. Each child calls a common setup code that is part of the collection. (This is to reduce the size of the inscription and to make it easier to update.)
3. Each child is inscribed with the collection ordinal as the parent.
4. When the child is accessed, it calls on the common setup code and then displays the ordinal based on the recipe and any supported search parameters given in the URL.

Each ordinal should be self-contained and only load what is needed.

## Example Ordinal Collection Item

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>{ORDINAL_NAME}</title>
    </head>
    <body>
        <!-- Responsible for loading and calling the collection setup code code with the given recipe -->
        <script src="/content/{COLLECTION_JS_PLACEHOLDER}" onload="setup({recipe_for_this_specific_ordinal})"></script>
    </body>
</html>
```

Filled in with actual values it could look something like this:
```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>My Collection Ordinal #1</title>
    </head>
    <body>
        <script src="/content/b6a50f5ba932b0ea7f652d9d28e59eced47bc658371c25e02d8b3457bb60ac8fi0" onload="setup({recipe_for_this_specific_ordinal})"></script>
    </body>
</html>
```

When the page is loaded, it will call into the setup function, which is part of the common collection setup file. This setup function will then use the recipe for this specific ordinal to look up the actual data it needs to display the ordinal and fill in the API.

In our case, we again reference a common collection setup code, so we minimize the amount of data stored in the ordinal itself.

Example collection setup code:

## Common Setup Code
```js
let loadedImages = [];
async function exportDraw(recipe) {
    await loadImages();
    
    resizeCanvas();

    const canvas = document.getElementById("combinedCanvas");

    return canvas.toDataURL();
}

async function loadImages() {
    if(loadedImages.length > 0) {
        return;
    }

    // Fetch Images
    const res = await fetch('/content/{lookup_table}');
    const lookup_table = await res.json();
    let images = [];
    for(const trait of recipe) {
        // Fetches DataURL for each trait
        images.push(lookup_table[trait]); 
    }

    const loadImage = (src) => {
        return new Promise((resolve) => {
            const image = new Image();
            image.onload = () => resolve(image);
            image.src = src;
        });
    };

    for (let index = 0; index < images.length; index++) {
        let loadedImage = await loadImage(images[index]);
        loadedImages.push(loadedImage);
    }
}

function resizeCanvas() {
    const container = document.querySelector(".image-container");
    const canvas = document.getElementById("combinedCanvas");
    const ctx = canvas.getContext("2d");

    const width = container.clientWidth;
    canvas.width = width;
    canvas.height = width;
    ctx.imageSmoothingEnabled = false;

    drawImage();
}

function drawImage() {
    const container = document.querySelector(".image-container");
    const canvas = document.getElementById("combinedCanvas");
    const ctx = canvas.getContext("2d");

    if(!ctx || !container || !canvas) {
        return;
    }

    const width = container.clientWidth;

    for (let image of loadedImages) {
        ctx.drawImage(image, 0, 0, width, width);
    }
}

function getAssets(recipe) {
    // Your code to fetch assets for given ordinal
}

function getTraits(recipe) {
    // Your code to fetch traits for given ordinal
}

async function setup_ooapi(recipe) {
    // Update to fetch assets from somewhere
    let assets = await getAssets(recipe);
    let traits = await getTraits(recipe); 
    let ooapi = window.ooAPI;
    let inscriptionid = ooapi.getId()   

    assets.forEach((img, index) => {
        ooapi.addAsset({
            type: 'image',
            name: 'asset_' + String(index),
            id: inscriptionid,
            data: img.src
        })
    });

    traits.forEach((trait, index) => {
        ooapi.addTrait({
            name: trait.name,
            value: trait.value
        })
    });

    ooapi.addComposition({
        type: 'image',
        name: 'composition_' + String(index),
        id: inscriptionid,
        onExport: () => {
            return exportDraw();
        }
    })

    ooapi.addVariant({
        type: 'image',
        name: 'default',
        id: inscriptionid,
        onDisplay: () => {
            variant = 'default';
            resizeCanvas();
        }
    })

    ooapi.ready();
}

async function setup(recipe) {
    // Any styles you want to add to the body
    document.body.style.cssText = `
    html, body {
        margin: 0;
        padding: 0;
        height: 100%;
        width: 100%;
    }`;

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Add and load the Open Ordinal API
    const ooapi = '/content/{OOAPI_ORDINAL_ID}';
    if (!document.querySelector(`script[src="${ooapi}"]`)) {
        const script = document.createElement("script");
        script.src = ooapi;
        script.onload = () => {
            // Call ooAPI Setup when script loaded.
            setup_ooapi();
        };
        document.head.appendChild(script);
    }
}
window.setup = setup;
```

So in the end, each ordinal calls into the common collection entry javascript file, that does the setup. 

In this particular scenario, we reference a version that can not be updated since we are targeting a specificy content inscription id. To be able to update the code in the collection entry, you can have a "proxy" .js, that again can lookup the latest version of the collection entry by SAT. Another alternative is to import a script that adds this functionality, and call it from the HTML, or just add it to the HTML yourself.


## Next Steps

### [Conclusion - Consuming the Open Ordinal API](4_Interacting_With_ooAPI.md) (Part 4)

Congratulations on completing the setup of your ordinal collection! You now have a solid foundation for creating and managing your collection. Remember to explore the possibilities of interacting with your collection and consider how you want to allow users to engage with it.
