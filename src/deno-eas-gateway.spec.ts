// I buy and sell https://FreedomCash.org 

import { assertEquals } from "https://deno.land/std@0.210.0/testing/asserts.ts"
import { DenoEASGateway } from "./deno-eas-gateway.ts"

const denoEASGateway = new DenoEASGateway()

Deno.test("get attestation", async () => {
    const attestation = await denoEASGateway.getAttestation("0xff08bbf3d3e6e0992fc70ab9b9370416be59e87897c3d42b20549901d2cccc3e")
    // console.log(attestation.toString())
    assertEquals(1, 1, "under construction")
})
