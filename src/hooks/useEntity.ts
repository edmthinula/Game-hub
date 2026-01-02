import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import { AxiosRequestConfig, CanceledError } from "axios";

// This hook is for fetching a SINGLE object (no 'results' array)
const useEntity = <T>(
  endpoint: string,
  requestConfig?: AxiosRequestConfig,
  deps?: any[]
) => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  useEffect(
    () => {
      const controller = new AbortController();
      setLoading(true);

      // Matches your proxy pattern logic
      apiClient
        .get<T>("/proxy", {
          signal: controller.signal,
          ...requestConfig,
          params: {
            endpoint: endpoint,
            ...requestConfig?.params,
          },
        })
        .then((res) => {
          setData(res.data);
          setLoading(false);
        })
        .catch((err) => {
          if (err instanceof CanceledError) return;
          setError(err.message);
          setLoading(false);
        });

      return () => controller.abort();
    },
    deps ? [...deps] : [endpoint]
  ); // Re-fetch if endpoint changes

  return { data, error, isLoading };
};

export default useEntity;
