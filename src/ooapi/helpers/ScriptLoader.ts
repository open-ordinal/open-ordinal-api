/**
 * Load scripts dynamically
 */
let _loadedScripts: Map<string, Promise<HTMLScriptElement>> = new Map<string, Promise<HTMLScriptElement>>();

export async function loadScript( scriptUrl: string, scriptType: string = 'text/javascript' ) {
    let scriptPromise = _loadedScripts.get(scriptUrl)

    if( !scriptPromise ) {
        scriptPromise = new Promise( (resolve, reject) => {

            let script = document.createElement('script');

            script.src = scriptUrl;
            script.async = true;
            script.type = scriptType;
            script.onload = () => {
                resolve(script);
            };
            script.onerror = (e) => {
                reject(e);
            }
            document.head.appendChild(script);

        });
        _loadedScripts.set(scriptUrl, scriptPromise);
    }

    return await scriptPromise;
}
