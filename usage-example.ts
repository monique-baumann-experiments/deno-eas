import { DenoEAS } from "./src/deno-eas.ts"

const denoEAS = new DenoEAS()

// const attestation = await denoEAS.getAttestation("0xff08bbf3d3e6e0992fc70ab9b9370416be59e87897c3d42b20549901d2cccc3e")
// console.log(attestation)
const schema = await denoEAS.getSchemaInfo("0xb16fa048b0d597f5a821747eba64efa4762ee5143e9a80600d0005386edfc995")
console.log(schema)

// await denoEAS.verifyOffchainAttestation()