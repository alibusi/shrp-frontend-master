/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { SseEmitter } from '../models/SseEmitter';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class SseControllerService {

    /**
     * streamSseMvc
     * @returns SseEmitter OK
     * @throws ApiError
     */
    public static streamSseMvcUsingGet(): CancelablePromise<SseEmitter> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/sse/stream',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

}
