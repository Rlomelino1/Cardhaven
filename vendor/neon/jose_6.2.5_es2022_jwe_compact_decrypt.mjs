/* esm.sh - jose@6.2.5/jwe/compact/decrypt */
import{prepareDecrypt as o,decryptCompact as n}from"./jose_6.2.5_es2022_dist_webapi_lib_jwe_decrypt.mjs";async function i(p,e,c){let t=await n(p,o(c),e),r={plaintext:t.plaintext,protectedHeader:t.parsedProt};return typeof e=="function"?{...r,key:t.key}:r}export{i as compactDecrypt};
//# sourceMappingURL=decrypt.mjs.map