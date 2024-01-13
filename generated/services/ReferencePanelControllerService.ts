/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseResponse_List_ReferencePanelVO_ } from '../models/BaseResponse_List_ReferencePanelVO_';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class ReferencePanelControllerService {

    /**
     * list
     * @returns BaseResponse_List_ReferencePanelVO_ OK
     * @throws ApiError
     */
    public static listUsingGet1(): CancelablePromise<BaseResponse_List_ReferencePanelVO_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/referencePanel/list',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

}
