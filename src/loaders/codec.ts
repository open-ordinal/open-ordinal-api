import { DecoderFunction } from "@open-ordinal/metadata";

const decoders: { [id: string]: any } = {};

/**
 * Fetches and returns a decoder function for a given ID.
 * 
 * @param {string} id - The ID of the decoder to fetch.
 * @returns {Promise<DecoderFunction>} - A promise that resolves with the decoder function.
 */
export async function getDecoder(id: string): Promise<DecoderFunction> {
    // Check if the decoder for the given ID is already cached
    if (decoders[id] == undefined) {
        // If not cached, import the decoder module dynamically
        decoders[id] = import(/* webpackIgnore: true */`/content/${id}`);
    }

    // Await the import and return the default export as the decoder function
    return (await decoders[id]).default as DecoderFunction;
}

/**
 * Encodes an AudioBuffer into a WAV file format.
 * 
 * @category Core
 * @param {AudioBuffer} audioBuffer - The audio buffer to encode.
 * @returns {ArrayBuffer} - The encoded WAV file as an ArrayBuffer.
 */
export function encodeWAV(audioBuffer: AudioBuffer) {
    let numOfChan = audioBuffer.numberOfChannels, // Number of audio channels
        length = audioBuffer.length * numOfChan * 2 + 44, // Calculate the length of the WAV file
        buffer = new ArrayBuffer(length), // Create a buffer to hold the WAV file data
        view = new DataView(buffer), // Create a DataView to manipulate the buffer
        channels = [], // Array to hold the audio data for each channel
        i, sample, offset = 0, pos = 0;

    // Write WAV container header
    setUint32(0x46464952); // "RIFF" in ASCII
    setUint32(length - 8); // File length - 8
    setUint32(0x45564157); // "WAVE" in ASCII
    setUint32(0x20746d66); // "fmt " in ASCII
    setUint32(16); // Length of format data
    setUint16(1); // Format type (PCM)
    setUint16(numOfChan); // Number of channels
    setUint32(audioBuffer.sampleRate); // Sample rate
    setUint32(audioBuffer.sampleRate * 2 * numOfChan); // Byte rate
    setUint16(numOfChan * 2); // Block align
    setUint16(16); // Bits per sample
    setUint32(0x61746164); // "data" in ASCII
    setUint32(length - pos - 4); // Data length

    // Write interleaved audio data
    for (i = 0; i < audioBuffer.numberOfChannels; i++) {
        channels.push(audioBuffer.getChannelData(i)); // Get audio data for each channel
    }

    while (pos < length) {
        for (i = 0; i < numOfChan; i++) {
            // Interleave channels
            sample = Math.max(-1, Math.min(1, channels[i][offset])); // Clamp sample value
            sample = (0.5 + sample < 0 ? sample * 32768 : sample * 32767) | 0; // Scale to 16-bit signed int
            view.setInt16(pos, sample, true); // Write 16-bit sample
            pos += 2;
        }
        offset++; // Move to the next sample
    }

    return buffer; // Return the encoded WAV file buffer

    // Helper function to write a 16-bit unsigned integer to the DataView
    function setUint16(data: number) {
        view.setUint16(pos, data, true);
        pos += 2;
    }

    // Helper function to write a 32-bit unsigned integer to the DataView
    function setUint32(data: number) {
        view.setUint32(pos, data, true);
        pos += 4;
    }
}
