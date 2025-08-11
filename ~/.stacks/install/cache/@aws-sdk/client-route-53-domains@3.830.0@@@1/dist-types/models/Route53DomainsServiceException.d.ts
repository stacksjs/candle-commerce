import { ServiceException as __ServiceException, ServiceExceptionOptions as __ServiceExceptionOptions } from "@smithy/smithy-client";
export type { __ServiceExceptionOptions };
export { __ServiceException };
/**
 * @public
 *
 * Base exception class for all service exceptions from Route53Domains service.
 */
export declare class Route53DomainsServiceException extends __ServiceException {
    /**
     * @internal
     */
    constructor(options: __ServiceExceptionOptions);
}
