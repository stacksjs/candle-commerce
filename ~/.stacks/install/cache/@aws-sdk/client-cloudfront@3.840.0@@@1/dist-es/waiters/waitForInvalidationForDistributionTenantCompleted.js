import { checkExceptions, createWaiter, WaiterState } from "@smithy/util-waiter";
import { GetInvalidationForDistributionTenantCommand, } from "../commands/GetInvalidationForDistributionTenantCommand";
const checkState = async (client, input) => {
    let reason;
    try {
        const result = await client.send(new GetInvalidationForDistributionTenantCommand(input));
        reason = result;
        try {
            const returnComparator = () => {
                return result.Invalidation.Status;
            };
            if (returnComparator() === "Completed") {
                return { state: WaiterState.SUCCESS, reason };
            }
        }
        catch (e) { }
    }
    catch (exception) {
        reason = exception;
    }
    return { state: WaiterState.RETRY, reason };
};
export const waitForInvalidationForDistributionTenantCompleted = async (params, input) => {
    const serviceDefaults = { minDelay: 20, maxDelay: 600 };
    return createWaiter({ ...serviceDefaults, ...params }, input, checkState);
};
export const waitUntilInvalidationForDistributionTenantCompleted = async (params, input) => {
    const serviceDefaults = { minDelay: 20, maxDelay: 600 };
    const result = await createWaiter({ ...serviceDefaults, ...params }, input, checkState);
    return checkExceptions(result);
};
