import { pki } from "node-forge";

export class CertificateStore {
    private keys: pki.KeyPair;
    private pemCertificate: pki.PEM;

    public get privateKey(): pki.PrivateKey {
        return this.keys.privateKey;
    }
    public get publicKey(): pki.PublicKey {
        return this.keys.publicKey;
    }
    public get PEM(): pki.PEM {
        return this.pemCertificate;
    }
    public createCert() {

        // generate a keypair and create an X.509v3 certificate
        this.keys = pki.rsa.generateKeyPair(4096);
        const cert = pki.createCertificate();
        cert.publicKey = this.keys.publicKey;
        // alternatively set public key from a csr
        //cert.publicKey = csr.publicKey;
        // NOTE: serialNumber is the hex encoded value of an ASN.1 INTEGER.
        // Conforming CAs should ensure serialNumber is:
        // - no more than 20 octets
        // - non-negative (prefix a '00' if your value starts with a '1' bit)
        cert.serialNumber = '01';
        cert.validity.notBefore = new Date();
        cert.validity.notAfter = new Date();
        cert.validity.notAfter.setFullYear(cert.validity.notBefore.getFullYear() + 1);
        const attrs = [{
            name: 'commonName',
            value: 'localhost'
        }];
        cert.setSubject(attrs);
        // alternatively set subject from a csr
        //cert.setSubject(csr.subject.attributes);
        cert.setIssuer(attrs);
        cert.sign(this.keys.privateKey);

        // convert a Forge certificate to PEM
        this.pemCertificate = pki.certificateToPem(cert);


    }
}