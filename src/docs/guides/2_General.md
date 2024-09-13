---
title: General
group: Documents
---
## General
Without going too much into detail, or defining a specific way or structure to create an ordinal collection, here's a few general ideas that should help guide you in the right direction.

### Lazy Loading
To ensure your ordinal loads fast, and to ensure your users have a good experience, you should lazy load most of your code. 

# Use a recipe to define the ordinal in the collection
It's generally a good idea to use a recipe to define the parts of your ordinal. In a general case, a recipe would be a small snippet of, for example numbers in a given sequence that defines what parts the ordinal is made out of. This could also be a JSON object that specifies what the ordinal is made out of. This also ensures that each ordinal that is inscribed is as small as possible.

You can then later on use lookup tables to define and fetch the actual data you need, which can be stored separately from the ordinal itself.

An example of this could be:

// Based on the traits added in 1. Structure
[0,1,1] 

This recipe would define that the first trait (Head) is `Alien`, the second trait (Body) is `Police Officer`, and the third trait (Item) is `Boxing Gloves`.

## Next Steps

### [Setup of Ordinal Collection](3_ooAPI_Setup.md) (Part 3)

Dive into the next section to explore general ideas and best practices for creating ordinal collections!