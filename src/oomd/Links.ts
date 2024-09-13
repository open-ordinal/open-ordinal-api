export type InscriptionId = string;
export type SatNo = number;
export type URI = string;

/**
 * @category Protocols
 */
export type Link 
	= { "@id": InscriptionId } 
	//| { "@sat": SatNo }
	;

/**
 * @category Protocols
 */
export type Linked<T extends Object>
	= Link // Linked inscription must implement protocol T
	| T
	; 

/**
 * @category Protocols
 */
export type LinkedModule<T extends Object>
	= Link // Content of linked inscription must be a javascript module exporting T
	//| URI  // Content pointed to by URI must be a javascript module exporting T
	; 

/**
 * @category Protocols
 */
export type LinkedVisual
	= Link // Content of inscription must be a visual presentable in an HTML iframe (image, html, ++)
	//| URI  // Content pointed to by URI must be a visual presentable in an HTML iframe (image, html, ++)
	;