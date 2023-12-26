import { EAS, Offchain, SchemaEncoder, SchemaRegistry } from "npm:@ethereum-attestation-service/eas-sdk";
import { ethers } from 'npm:ethers';

export class DenoEASGateway {

    private readonly easAddress
    private readonly provider
    private eas

    public constructor(providerURL?: string) {
        this.easAddress = "0xC2679fBD37d54388Ce493F1DB75320D236e1815e"; // Sepolia v0.26
        this.eas = new EAS(this.easAddress);

        if (providerURL == undefined) {
            this.provider = ethers.getDefaultProvider("sepolia");
        } else {
            this.provider = new ethers.JsonRpcProvider(providerURL)
        }

        // Connects an ethers style provider/signingProvider to perform read/write functions.
        // MUST be a signer to do write operations!
        this.eas.connect(this.provider);
    }

    public async getAttestation(uid: string): Promise<any> {
        const attestation = await this.eas.getAttestation(uid);
        return attestation
    }
}
