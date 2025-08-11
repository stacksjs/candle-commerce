import forge, { pki, tls } from 'node-forge';
import type { CAOptions, Cert, CertPath, Certificate, CertificateExtension, CertificateOptions, RandomSerialNumber, SubjectAltName, TlsOption } from './types';

declare function generateSubjectAltNames(options: CertificateOptions): SubjectAltName[];
export declare function generateRandomSerial(verbose?: boolean): RandomSerialNumber;
export declare function calculateValidityDates(options: { validityDays?: number, validityYears?: number, notBeforeDays?: number, verbose?: boolean }): void;
declare function generateCertificateExtensions(options: CertificateOptions): CertificateExtension[];
export declare function createRootCA(options: CAOptions): Promise<Certificate>;
export declare function generateCertificate(options: CertificateOptions): Promise<Certificate>;
export declare function addCertToSystemTrustStoreAndSaveCert(cert: Cert, caCert: string, options?: TlsOption): Promise<CertPath>;
export declare function storeCertificate(cert: Cert, options?: TlsOption): CertPath;
export declare function storeCACertificate(caCert: string, options?: TlsOption): CertPath;

export { forge, pki, tls }