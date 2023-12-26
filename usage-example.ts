import { SchemaCreator } from "./src/schema-creator.ts"
import { AttestationCreator } from "./src/attestation-creator.ts"

const schemaCreator = new SchemaCreator()
const attestationCreator = new AttestationCreator()

await schemaCreator.createSchema()
await attestationCreator.createAttestation()