import { LinkedModule } from "../Links";

/**
 * @category Protocols
 */
export interface Media {
	duration?: number;
	decoder?: LinkedModule<DecoderModule>; // optional decoder module to use for this track - consider moving to Audio
}


export interface DecoderModule {
	default: DecoderFunction;
}

export type DecoderFunction = (content: ArrayBuffer, metadata: Object) => Promise<DecoderResult>;

export interface DecoderResult {
	audioBuffer?: () => Promise<AudioBuffer>;
}
