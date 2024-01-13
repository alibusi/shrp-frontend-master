/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ImputationVO } from './ImputationVO';
import type { OrderItem } from './OrderItem';

export type Page_ImputationVO_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: Array<OrderItem>;
    pages?: number;
    records?: Array<ImputationVO>;
    searchCount?: boolean;
    size?: number;
    total?: number;
};
