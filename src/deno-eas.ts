import { EAS, Offchain, SchemaEncoder, SchemaRegistry, PartialTypedDataConfig, OffchainAttestationVersion } from "npm:@ethereum-attestation-service/eas-sdk";
import { ethers } from '../deps.ts'; 

export class DenoEAS {

    private readonly easAddress
    private readonly schemaRegistryAddress
    private readonly resolverAddress
    private readonly provider
    private eas
    private schemaString
    private schemaRegistry: SchemaRegistry

    public constructor(providerURL?: string) {
        this.easAddress = "0xC2679fBD37d54388Ce493F1DB75320D236e1815e"; // Sepolia v0.26
        this.schemaRegistryAddress = "0x0a7E2Ff54e76B8E6659aedc9103FB21c038050D0"; // Sepolia v0.26
        this.resolverAddress = "0x0a7E2Ff54e76B8E6659aedc9103FB21c038050D0"; // Sepolia 0.26
        this.schemaRegistry = new SchemaRegistry(this.schemaRegistryAddress)
        this.schemaRegistry.connect(this.provider);
        this.schemaString = "uint256 eventId, uint8 voteIndex"
        this.eas = new EAS(this.easAddress);
        if (providerURL == undefined) {
            this.provider = ethers.getDefaultProvider("sepolia");
        } else {
            this.provider = new ethers.JsonRpcProvider(providerURL)
        }
        this.eas.connect(this.provider);
    }

    public async registerNewSchema(waitForTransactionCompleted: boolean) {

        const revocable = false;
        const transaction = await this.schemaRegistry.register({
            schema: this.schemaString,
            resolverAddress: this.resolverAddress,
            revocable,
        });

        if (waitForTransactionCompleted) {
            await transaction.wait();
        }
    }
    public async createAttestation(waitForTransactionCompleted: boolean) {
        const schemaEncoder = new SchemaEncoder(this.schemaString);
        const schemaUID = "0xb16fa048b0d597f5a821747eba64efa4762ee5143e9a80600d0005386edfc995";
        const tx = await this.eas.attest({
            schema: schemaUID,
            data: {
                recipient: "0xFD50b031E778fAb33DfD2Fc3Ca66a1EeF0652165",
                expirationTime: 0,
                revocable: false,
                data: schemaEncoder.encodeData([{ name: "eventId", value: 1, type: "uint256" }, { name: "voteIndex", value: 1, type: "uint8" }])
            },
        });

        if (waitForTransactionCompleted) {
            const newAttestationUID = await tx.wait();
            console.log("New attestation UID:", newAttestationUID);
        }
    }
    public async getSchemaInfo(schemaUID: string) {;
        const schemaRecord = await this.schemaRegistry.getSchema({ uid: schemaUID });
        return schemaRecord.toString();
    }
    public async createOffChainAttestation() {
        const offchain = await this.eas.getOffchain();

        const schemaEncoder = new SchemaEncoder(this.schemaString);
        const encodedData = schemaEncoder.encodeData([
            { name: "eventId", value: 1, type: "uint256" },
            { name: "voteIndex", value: 1, type: "uint8" },
        ]);
        const offchainAttestation = await offchain.signOffchainAttestation({
            recipient: '0xFD50b031E778fAb33DfD2Fc3Ca66a1EeF0652165',
            expirationTime: 0, // 0 for no expiration
            time: 1671219636, // // Unix timestamp of current time
            revocable: true, // if your schema is not revocable, this MUST be false
            version: 1,
            nonce: 0,
            schema: "0xb16fa048b0d597f5a821747eba64efa4762ee5143e9a80600d0005386edfc995",
            refUID: '0x0000000000000000000000000000000000000000000000000000000000000000',
            data: encodedData,
        }, await this.getSigner());
        console.log(offchainAttestation)
    }
    public async revokeOnChainAttestation(waitForTransactionCompleted: boolean) {
        const transaction = await this.eas.revoke({
            schema: "0x85500e806cf1e74844d51a20a6d893fe1ed6f6b0738b50e43d774827d08eca61",
            data: { uid: "0x6776de8122c352b4d671003e58ca112aedb99f34c629a1d1fe3b332504e2943a" }
        });

        if (waitForTransactionCompleted) {
            await transaction.wait();
        }
    }
    public async revokeOffchainAttestation(inputData: string[], waitForTransactionCompleted: boolean) {
        let data = []
        for (const input of inputData) {
            data.push(ethers.utils.formatBytes32String(inputData)); // 0x6776de8122c352b4d671003e58ca112aedb99f34c629a1d1fe3b332504e2943a
        }
        let transaction
        if (data.length === 1) {
            transaction = await this.eas.revokeOffchain(data[0]);
        } else if (data.length > 1) {
            transaction = await this.eas.multiRevokeOffchain(data);
        } else {
            throw new Error(`please reconsider your input to timestampData`)
        }
        if (waitForTransactionCompleted) {
            await transaction.wait();
        }

        if (waitForTransactionCompleted) {
            await transaction.wait();
        }
    }
    public async timestampData(inputData: string[], waitForTransactionCompleted: boolean) {
        let data = []
        for (const input of inputData) {
            data.push(ethers.utils.formatBytes32String(inputData));
        }
        let transaction
        if (data.length === 1) {
            transaction = await this.eas.timestamp(data[0]);
        } else if (data.length > 1) {
            transaction = await this.eas.multiTimestamp(data);
        } else {
            throw new Error(`please reconsider your input to timestampData`)
        }
        if (waitForTransactionCompleted) {
            await transaction.wait();
        }
    }
    public async verifyOffchainAttestation() {
        // https://github.com/ethereum-attestation-service/eas-sdk/issues/77 
        const attestation = {
          // your offchain attestation
          sig: {
            domain: {
              name: "EAS Attestation",
              version: "0.26",
              chainId: 1,
              verifyingContract: "0xA1207F3BBa224E2c9c3c6D5aF63D0eb1582Ce587",
            },
            primaryType: "Attest",
            types: {
              Attest: [],
            },
            signature: {
              r: "",
              s: "",
              v: 28,
            },
            uid: "0x5134f511e0533f997e569dac711952dde21daf14b316f3cce23835defc82c065",
            message: {
              version: 1,
              schema: "0x27d06e3659317e9a4f8154d1e849eb53d43d91fb4f219884d1684f86d797804a",
              refUID: "0x0000000000000000000000000000000000000000000000000000000000000000",
              time: 1671219600,
              expirationTime: 0,
              recipient: "0xFD50b031E778fAb33DfD2Fc3Ca66a1EeF0652165",
              attester: "0x1e3de6aE412cA218FD2ae3379750388D414532dc",
              revocable: true,
              data: "0x0000000000000000000000000000000000000000000000000000000000000000",
            },
          },
          signer: "0x1e3de6aE412cA218FD2ae3379750388D414532dc",
        };
        
        const EAS_CONFIG: PartialTypedDataConfig = {
          address: attestation.sig.domain.verifyingContract,
          version: attestation.sig.domain.version,
          chainId: attestation.sig.domain.chainId,
        };
        const offchain = new Offchain(EAS_CONFIG, OffchainAttestationVersion, this.eas);
        // const isValidAttestation = offchain.verifyOffchainAttestationSignature(
        //   attestation.signer,
        //   attestation.sig
        // );        
    }
    public async getAttestation(uid: string): Promise<any> {
        const attestation = await this.eas.getAttestation(uid);
        return attestation
    }
    private async getSigner() {
        const configuration = JSON.parse(Deno.readTextFileSync('./.env.json'))
        const wallet = new ethers.Wallet(configuration.pkTestWallet, this.provider)
        const signer = await wallet.connect(this.provider)
        return signer
    }
}
