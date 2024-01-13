/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseResponse_string_ } from "../models/BaseResponse_string_";

import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";
import axios, { AxiosProgressEvent } from "axios";

export class FileControllerService {
  /**
   * upload
   * @param file file
   * @param sessionId sessionId
   * @param onUploadProgress
   * @returns BaseResponse_string_ OK
   * @returns any Created
   * @throws ApiError
   */
  public static uploadUsingPost(
    file: Blob,
    sessionId: string,
    onUploadProgress: (progressEvent: AxiosProgressEvent) => void // 添加上传进度回调函数
  ): CancelablePromise<BaseResponse_string_ | any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/file/upload",
      query: {
        sessionId: sessionId,
      },
      formData: {
        file: file,
      },
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
      onUploadProgress: onUploadProgress,
    });
  }
}
