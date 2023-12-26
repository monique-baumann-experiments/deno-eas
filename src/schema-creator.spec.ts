// I buy and sell https://FreedomCash.org 

import { assertEquals } from "https://deno.land/std@0.210.0/testing/asserts.ts"
import { SchemaCreator } from "./schema-creator.ts"

const schemaCreator = new SchemaCreator()

Deno.test("create attestation", async () => {
    await schemaCreator.createSchema()
    assertEquals(1, 1, "tbd")
})
