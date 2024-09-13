import { DecoderFunction } from "../../oomd/protocols/Media";

const decoders: {[id: string] : any } = {};

export async function getDecoder(id: string) : Promise<DecoderFunction>{
	if(decoders[id] == undefined ) {
		decoders[id] = import(/* webpackIgnore: true */`/content/${id}`);
	}
	return (await decoders[id]).default as DecoderFunction;
}

export function encodeWAV(audioBuffer: AudioBuffer) {
    let numOfChan = audioBuffer.numberOfChannels,
        length = audioBuffer.length * numOfChan * 2 + 44,
        buffer = new ArrayBuffer(length),
        view = new DataView(buffer),
        channels = [],
        i,
        sample,
        offset = 0,
        pos = 0;

    // write WAV container
    setUint32(0x46464952);                         // "RIFF" in ASCII
    setUint32(length - 8);                         // file length - 8
    setUint32(0x45564157);                         // "WAVE" in ASCII
    setUint32(0x20746d66);                         // "fmt " in ASCII
    setUint32(16);                                 // length of format data
    setUint16(1);                                  // format type (PCM)
    setUint16(numOfChan);
    setUint32(audioBuffer.sampleRate);
    setUint32(audioBuffer.sampleRate * 2 * numOfChan); // byte rate
    setUint16(numOfChan * 2);                      // block align
    setUint16(16);                                 // bits per sample
    setUint32(0x61746164);                         // "data" in ASCII
    setUint32(length - pos - 4);                   // data length

    // write interleaved data
    for(i = 0; i < audioBuffer.numberOfChannels; i++)
        channels.push(audioBuffer.getChannelData(i));

    while(pos < length) {
        for(i = 0; i < numOfChan; i++) {
            // interleave channels
            sample = Math.max(-1, Math.min(1, channels[i][offset])); // clamp
            sample = (0.5 + sample < 0 ? sample * 32768 : sample * 32767)|0; // scale to 16-bit signed int
            view.setInt16(pos, sample, true); // write 16-bit sample
            pos += 2;
        }
        offset++ // next source sample
    }

    return buffer;

    function setUint16(data: number) {
        view.setUint16(pos, data, true);
        pos += 2;
    }

    function setUint32(data: number) {
        view.setUint32(pos, data, true);
        pos += 4;
    }
}