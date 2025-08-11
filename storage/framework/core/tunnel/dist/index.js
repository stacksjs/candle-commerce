// @bun
async function e(r){if(!r?.port)r={port:3000};return console.log("Creating local tunnel",r.port),"localTunnel"}async function l(r){return await e({port:r})}export{e as localTunnel,l as createLocalTunnel};
