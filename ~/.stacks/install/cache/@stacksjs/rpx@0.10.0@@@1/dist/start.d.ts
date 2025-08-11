import type { CleanupOptions, ProxyOption } from './types';
import type { IncomingHttpHeaders } from 'node:http2';

declare const activeServers: Set<http.Server | https.Server>;
declare type AnyServerType = http.Server | https.Server | http2.Http2SecureServer
type AnyIncomingMessage = http.IncomingMessage | http2.Http2ServerRequest
type AnyServerResponse = http.ServerResponse | http2.Http2ServerResponse

let isCleaningUp = false

export async function cleanup(options?: CleanupOptions): Promise<void> {
  if (isCleaningUp) {
    debugLog('cleanup', 'Cleanup already in progress, skipping', options?.verbose)
    return
  }

  isCleaningUp = true
  debugLog('cleanup', 'Starting cleanup process', options?.verbose)

  try {
    await processManager.stopAll(options?.verbose)

    log.info('Shutting down proxy servers...')

    const cleanupPromises: Promise<void>[] = []

    const serverClosePromises = Array.from(activeServers).map(server =>
      new Promise<void>((resolve) => {
        server.close(() => {
          debugLog('cleanup', 'Server closed successfully', options?.verbose)
          resolve()
        })
      }),
    )
    cleanupPromises.push(...serverClosePromises)

    if (options?.hosts && options.domains?.length) {
      debugLog('cleanup', 'Cleaning up hosts file entries', options?.verbose)
      const domainsToClean = options.domains.filter(domain => !domain.includes('localhost'))

      if (domainsToClean.length > 0) {
        log.info('Cleaning up hosts file entries...')
        cleanupPromises.push(
          removeHosts(domainsToClean, options?.verbose)
            .then(() => {
              debugLog('cleanup', `Removed hosts entries for ${domainsToClean.join(', ')}`, options?.verbose)
            })
            .catch((err) => {
              debugLog('cleanup', `Failed to remove hosts entries: ${err}`, options?.verbose)
              log.warn(`Failed to clean up hosts file entries for ${domainsToClean.join(', ')}:`, err)
            }),
        )
      }
    }

    if (options?.certs && options.domains?.length) {
      debugLog('cleanup', 'Cleaning up SSL certificates', options?.verbose)
      log.info('Cleaning up SSL certificates...')

      const certCleanupPromises = options.domains.map(async (domain) => {
        try {
          await cleanupCertificates(domain, options?.verbose)
          debugLog('cleanup', `Removed certificates for ${domain}`, options?.verbose)
        }
        catch (err) {
          debugLog('cleanup', `Failed to remove certificates for ${domain}: ${err}`, options?.verbose)
          log.warn(`Failed to clean up certificates for ${domain}:`, err)
        }
      })

      cleanupPromises.push(...certCleanupPromises)
    }

    await Promise.allSettled(cleanupPromises)
    debugLog('cleanup', 'All cleanup tasks completed successfully', options?.verbose)
    log.success('All cleanup tasks completed successfully')
  }
  catch (err) {
    debugLog('cleanup', `Error during cleanup: ${err}`, options?.verbose)
    log.error('Error during cleanup:', err)
  }
  finally {
    isCleaningUp = false
    process.exit(0)
  }
}

let isHandlingSignal = false
declare function signalHandler(): void;
declare function isPortInUse(port: number, hostname: string, verbose?: boolean): Promise<boolean>;
declare function normalizeHeaders(headers: IncomingHttpHeaders): http.OutgoingHttpHeaders;
declare function setupServer(serverInstance: AnyServerType): void;
export declare function startHttpRedirectServer(verbose?: boolean): void;
export declare function startProxy(options: ProxyOption): void;