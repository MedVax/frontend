import { AxiosInstance, AxiosRequestConfig } from "axios";

/**
 *
 * @param {import("axios").AxiosRequestConfig} baseConfig
 */
export default function axiosBaseQuery(
  baseConfig: AxiosRequestConfig,
  http: AxiosInstance
) {
  /**
   *
   * @param {import("axios").AxiosRequestConfig} config
   */
  async function request(config: AxiosRequestConfig) {
    const url = config.url
      ? (baseConfig.url || "") + config.url
      : baseConfig.url;
    try {
      const response = await http.request({ ...baseConfig, ...config, url });
      return {
        data: response.data || null,
        meta: { request: response.request, response },
      };
    } catch (error: any) {
      return {
        error: error.response
          ? {
              defaultUserMessage:
                (Array.isArray(error?.response?.data?.message)
                  ? error?.response?.data?.message?.[0]
                  : error?.response?.data?.message) ||
                error?.response?.data?.error,
              status: error?.response?.status,
              data: error?.response?.data,
            }
          : {
              defaultUserMessage: "Something went wrong",
              data: { defaultUserMessage: "Something went wrong" },
            },
      };
    }
  }
  return request;
}
