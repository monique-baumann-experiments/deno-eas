import { DenoEASGateway } from "./src/deno-eas-gateway.ts"

const denoEASGateway = new DenoEASGateway()

const attestation = await denoEASGateway.getAttestation("0xff08bbf3d3e6e0992fc70ab9b9370416be59e87897c3d42b20549901d2cccc3e")
console.log(attestation)
