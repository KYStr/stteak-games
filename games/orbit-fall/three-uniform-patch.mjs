import {sha256} from './rapier-init-patch.mjs';
export const THREE_UNIFORM_PATCH={"id": "three-0.180.0-double-uniform-cache-1", "inputSha256": "c8211c69345d2e9949dc7a8ac969380497aa0600a5a8ac6a459c8cd02dd9cb8a", "outputSha256": "cebab00f7194088cfef916d3aecd08c3d5bca7fca75a609412e68fcc24e1fccd"};
const before="class SingleUniform {\n\n\tconstructor( id, activeInfo, addr ) {\n\n\t\tthis.id = id;\n\t\tthis.addr = addr;\n\t\tthis.cache = [];",after="class SingleUniform {\n\n\tconstructor( id, activeInfo, addr ) {\n\n\t\tthis.id = id;\n\t\tthis.addr = addr;\n\t\t// Fixed double caches avoid boxing every animated uniform upload.\n\t\tconst widths = { 5126:1, 35664:2, 35665:3, 35666:4, 35674:4, 35675:9, 35676:16 };\n\t\tthis.cache = widths[activeInfo.type] ? new Float64Array( widths[activeInfo.type] ).fill( NaN ) : [];";
export function patchThreeUniforms(bytes){
 if(!(bytes instanceof Uint8Array)||sha256(bytes)!==THREE_UNIFORM_PATCH.inputSha256)throw Error('THREE uniforms refuse unknown upstream bytes');
 const source=Buffer.from(bytes).toString('utf8');if(source.split(before).length!==2)throw Error('THREE uniforms require exact single replacement');
 const vendor=Buffer.from(source.replace(before,after));if(sha256(vendor)!==THREE_UNIFORM_PATCH.outputSha256)throw Error('THREE uniforms output mismatch');return vendor;
}
