/* esm.sh - jose@6.2.5/jws/compact/verify */
import{prepareVerify as p,verifyCompact as i}from"./jose_6.2.5_es2022_dist_webapi_lib_jws_verify.mjs";async function f(o,r,a){let e=await i(o,p(a),r),t={payload:e.payload,protectedHeader:e.parsedProt};return typeof r=="function"?{...t,key:e.key}:t}export{f as compactVerify};
//# sourceMappingURL=verify.mjs.map