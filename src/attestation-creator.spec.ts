// I buy and sell https://FreedomCash.org 

import { assertEquals } from "https://deno.land/std@0.210.0/testing/asserts.ts"
import { AttestationCreator } from "./attestation-creator.ts"

const attestationCreator = new AttestationCreator()

Deno.test("create attestation", async () => {
    await attestationCreator.createAttestation()
    assertEquals(1, 1, "tbd")
})
