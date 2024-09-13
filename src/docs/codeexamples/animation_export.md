---
title: Animation Export
group: Documents
---
# Use case - Animation Export

This example demonstrates how to set up and export animations using the `ooAPI`. It is designed for developers who already have their own code to display animations and want to integrate animation export functionality into their applications.

In this example, we define an animation template that includes two animations: "idle" and "walk." Each animation consists of keyframes that specify the properties of the character's outfit and limbs at different points in time. The `oosetup` function initializes these animations and registers them with the `ooAPI`.

The code also includes a mechanism to export the animations when needed, utilizing a lazy loading approach for the animation manager. This allows for efficient management of resources and ensures that animations are only loaded when required.

```js
// Assuming ooAPI is already initialized and available
let ooAPI = window.ooAPI;
// Function to lazily set up animations
async function oosetup() {
    // Example animation template for an animation system, where we have a idle and walk animation
    const animationTemplate = {
    'idle': {
        duration: 120,
        keyframes: {
            0: { outfit: { y: 0 }, leftFoot: { y: 0 }, rightFoot: { y: 0 } },
            60: { outfit: { y: -2 }, leftFoot: { y: 0 }, rightFoot: { y: 0 } },
            120: { outfit: { y: 0 }, leftFoot: { y: 0 }, rightFoot: { y: 0 } }
        }
    },
    'walk': {
        duration: 60,
            keyframes: {
                0: { outfit: { y: 0 }, leftFoot: { x: -10, y: 0 }, rightFoot: { x: 10, y: 0 } },
                30: { outfit: { y: -2 }, leftFoot: { x: 0, y: -5 }, rightFoot: { x: 0, y: 0 } },
                60: { outfit: { y: 0 }, leftFoot: { x: 10, y: 0 }, rightFoot: { x: -10, y: 0 } }
            }
        }
    };

    for(const animationKey in animationTemplate) {
        ooAPI.addComposition({
            type: 'animation',
            name: animationKey,
            id: 'my-animation-id',
            onExport: () => {
                // lazy load animation manager, and export animation
                // Psuedo code to get a implementation of an animation manager
                let myAnimationManager = getAnimationManager(animationTemplate)

                // Return the result
                return myAnimationManager.exportAnimation(animationKey)
            }
        });
    }
}
// Start the main function
oosetup();
```