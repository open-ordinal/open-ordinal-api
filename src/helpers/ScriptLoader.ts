let _loadedScripts: Map<string, Promise<HTMLScriptElement>> = new Map<string, Promise<HTMLScriptElement>>(); // Initialize a map to cache loaded scripts

/**
 * Load scripts dynamically.
 * 
 * @category Core
 * @param {string} scriptUrl - The URL of the script to load.
 * @param {string} [scriptType='text/javascript'] - The type of the script. Defaults to 'text/javascript'.
 * @returns {Promise<HTMLScriptElement>} - A promise that resolves with the loaded script element.
 */
export async function loadScript(scriptUrl: string, scriptType: string = 'text/javascript'): Promise<HTMLScriptElement> {
    // Check if the script is already cached
    let scriptPromise = _loadedScripts.get(scriptUrl);

    // If the script is not cached, create a new promise to load the script
    if (!scriptPromise) {
        scriptPromise = new Promise((resolve, reject) => {
            // Create a new script element
            let script = document.createElement('script');

            // Set the script's attributes
            script.src = scriptUrl;
            script.async = true;
            script.type = scriptType;

            // Resolve the promise when the script is loaded
            script.onload = () => {
                resolve(script);
            };

            // Reject the promise if an error occurs while loading the script
            script.onerror = (e) => {
                reject(e);
            };

            // Append the script to the document head
            document.head.appendChild(script);
        });

        // Cache the promise for the script
        _loadedScripts.set(scriptUrl, scriptPromise);
    }

    // Return the cached or newly created promise
    return await scriptPromise;
}
