---
title: Character Variants Example
group: Documents
---
# Use Case - Adding 2D and 3D Variants of a Character

This example demonstrates how to add a 2D and a 3D variant of a character using the `ooAPI`. 
By utilizing the `ooAPI`, developers can create multiple visual representations of a character, enhancing the user experience in applications such as games or interactive storytelling.

In this example, we define a character with various traits, such as class, strength, and special abilities. The code sets up two visual variants: a 2D image representation and a 3D model representation. This allows users to switch between different views of the character seamlessly.

```js
// Assuming ooAPI is already available in the window
let ooAPI = window.ooAPI;
// Function to set up character variants

const characterTraits = [
{ name: 'Class', value: 'Warrior' },
{ name: 'Strength', value: 18 },
{ name: 'Dexterity', value: 14 },
{ name: 'Constitution', value: 16 },
{ name: 'Intelligence', value: 10 },
{ name: 'Wisdom', value: 12 },
{ name: 'Charisma', value: 8 },
{ name: 'Weapon', value: 'Two-handed Sword' },
{ name: 'Armor', value: 'Plate Mail' },
{ name: 'Special Ability', value: 'Berserker Rage' }
];

async function setupCharacterVariants() {
    // Setting up the default variant of the ordinal
    ooAPI.addVariant({
        type: 'image',
        name: 'Default',
        id: 'character-2d',
        onDisplay: () => {
            // Pseudo code for displaying the 2D variant
            // Can be adding something to the DOM, or draws to a canvas, etc.
            display('default');
        },
        onHide: () => {
            // Removes the content from the DOM, or clears the canvas   
            hide('default');
        }
    });
    // Adding a 2D variant
    ooAPI.addVariant({
        type: 'image',
        name: '2D Character Variant',
        id: 'character-2d',
        onDisplay: () => {
            display('2d');
        },
        onHide: () => {
            hide('2d');
        }
    });
    // Adding a 3D variant
    ooAPI.addVariant({
        type: 'model',
        name: '3D Character Variant',
        id: 'character-3d',
        onDisplay: () => {
            display('3d');
        },
        onHide: () => {
            hide('3d');
        }
    });

    // Loops over the traits for the character and adds them to the ordinal
    characterTraits.forEach(trait => {
        ooAPI.addTrait(trait);
    });

    // Set the displayed variant to default(Since thats the first variant)
    ooAPI.ready();
}
// Start the setup
setupCharacterVariants();
```