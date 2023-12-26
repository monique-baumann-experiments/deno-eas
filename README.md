# Deno EAS Gateway

This [module](https://deno.land/x/eas_gateway) is under construction. 
  
It utilizes [Bollinger Bands](https://www.youtube.com/watch?v=-6cbdJulb7s) and [sleep](https://deno.land/x/sleep). 

## Usage Example
```ts
import { SchemaCreator } from "./src/schema-creator.ts"
import { AttestationCreator } from "./src/attestation-creator.ts"

const schemaCreator = new SchemaCreator()
const attestationCreator = new AttestationCreator()

await schemaCreator.createSchema()
await attestationCreator.createAttestation()
```

## Execute Usage Example
```sh
deno run https://deno.land/x/eas_gateway/usage-example.ts
```

## Execute Unit Tests
```sh
deno test https://deno.land/x/eas_gateway/src/schema-creator.spec.ts
deno test https://deno.land/x/eas_gateway/src/attestation-creator.spec.ts
```

---
  
## Donations
Thanks to [Freedom Cash](https://FreedomCash.org), we are already free.  
If you want to donate, you might consider donating to the [otherparty.co.uk](https://www.otherparty.co.uk/donate-crypto-the-other-party) to ensure people do not need to donate to victims but rather donate successfully to problem solvers.   
  
![direct-democracy](https://github.com/michael-spengler/sleep/assets/145258627/fe97b7da-62b4-4cf6-9be0-7b03b2f3095a)