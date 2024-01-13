/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";
import { AxiosProgressEvent } from "axios";
import { ImputationAddDTO } from "../models/ImputationAddDTO";
import { BaseResponse_boolean_ } from "../models/BaseResponse_boolean_";
import { BaseResponse_long_ } from "../models/BaseResponse_long_";
import { ImputationDeleteDTO } from "../models/ImputationDeleteDTO";
import { ImputationQueryDTO } from "../models/ImputationQueryDTO";
import { BaseResponse_Page_ImputationVO_ } from "../models/BaseResponse_Page_ImputationVO_";

export class ImputationControllerService {
  /**
   * count
   * @returns BaseResponse_long_ OK
   * @throws ApiError
   */
  public static countUsingGet(): CancelablePromise<BaseResponse_long_> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/imputation/count",
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * delete
   * @param imputationDeleteDto imputationDeleteDTO
   * @returns BaseResponse_boolean_ OK
   * @returns any Created
   * @throws ApiError
   */
  public static deleteUsingPost(
    imputationDeleteDto: ImputationDeleteDTO
  ): CancelablePromise<BaseResponse_boolean_ | any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/imputation/delete",
      body: imputationDeleteDto,
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * download
   * @param id id
   * @param responseType
   * @returns any OK
   * @throws ApiError
   */
  public static downloadUsingGet(
    id: number,
    responseType: XMLHttpRequestResponseType
  ): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/imputation/download",
      query: {
        id: id,
      },
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
      responseType: responseType,
    });
  }

  /**
   * list
   * @param imputationQueryDto imputationQueryDTO
   * @returns BaseResponse_Page_ImputationVO_ OK
   * @returns any Created
   * @throws ApiError
   */
  public static listUsingPost(
    imputationQueryDto: ImputationQueryDTO
  ): CancelablePromise<BaseResponse_Page_ImputationVO_ | any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/imputation/list/page",
      body: imputationQueryDto,
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }
}
