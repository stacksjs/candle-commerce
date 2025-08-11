import{me as Z}from"./chunk-9ph3hk3r.js";var U=Z((V,Y)=>{var{defineProperty:B,getOwnPropertyDescriptor:$,getOwnPropertyNames:A}=Object,D=Object.prototype.hasOwnProperty,G=(b,j)=>B(b,"name",{value:j,configurable:!0}),E=(b,j)=>{for(var q in j)B(b,q,{get:j[q],enumerable:!0})},I=(b,j,q,K)=>{if(j&&typeof j==="object"||typeof j==="function"){for(let z of A(j))if(!D.call(b,z)&&z!==q)B(b,z,{get:()=>j[z],enumerable:!(K=$(j,z))||K.enumerable})}return b},M=(b)=>I(B({},"__esModule",{value:!0}),b),L={};E(L,{emitWarningIfUnsupportedVersion:()=>N,setCredentialFeature:()=>Q,setFeature:()=>R,setTokenFeature:()=>X,state:()=>H});Y.exports=M(L);var H={warningEmitted:!1},N=G((b)=>{if(b&&!H.warningEmitted&&parseInt(b.substring(1,b.indexOf(".")))<18)H.warningEmitted=!0,process.emitWarning(`NodeDeprecationWarning: The AWS SDK for JavaScript (v3) will
no longer support Node.js 16.x on January 6, 2025.

To continue receiving updates to AWS services, bug fixes, and security
updates please upgrade to a supported Node.js LTS version.

More information can be found at: https://a.co/74kJMmI`)},"emitWarningIfUnsupportedVersion");function Q(b,j,q){if(!b.$source)b.$source={};return b.$source[j]=q,b}G(Q,"setCredentialFeature");function R(b,j,q){if(!b.__aws_sdk_context)b.__aws_sdk_context={features:{}};else if(!b.__aws_sdk_context.features)b.__aws_sdk_context.features={};b.__aws_sdk_context.features[j]=q}G(R,"setFeature");function X(b,j,q){if(!b.$source)b.$source={};return b.$source[j]=q,b}G(X,"setTokenFeature")});
export{U as ie};
