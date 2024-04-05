import { useCallback, useMemo, useState } from 'react';
import { useRecoilValue } from 'recoil';

import { API_HOST } from '../constants';
import { AccessTokenState } from '../states';
import { useLogout } from './use-logout';

interface IConfig {
  headers?: {
    Authorization?: string;
    'Content-Type'?: string;
  };
}

export const useNetwork = (isSetState = true) => {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [status, setStatus] = useState<any>(null);
  const accessToken = useRecoilValue(AccessTokenState);

  const { logout } = useLogout();

  const config: IConfig = useMemo(() => ({}), []);
  const postConfig: IConfig = useMemo(() => ({}), []);
  if (accessToken) {
    config.headers = {
      Authorization: `Bearer ${accessToken}`,
    };
  }

  if (!accessToken) {
    postConfig.headers = {
      'Content-Type': 'application/json',
    };
  } else {
    postConfig.headers = {
      'Content-Type': 'application/json',
      ...(config.headers ?? {}),
    };
  }
  const get = useCallback(
    async (url: string): Promise<any> => {
      if (isSetState) {
        setLoading(true);
      }
      try {
        const response = await fetch(API_HOST + url, config);
        const apiPayload = await response.json();
        if (apiPayload?.message === 'Unauthorized user.' || response.status === 401 ) {
          logout();
        }

        if (isSetState) {
          setStatus(response?.ok);
          setData(apiPayload);
          setIsLoaded(true);
        }
        return apiPayload;
      } catch (err: any) {
        console.log('ERROR::::::::::: GET: ', url, '==>>', err);
        if (isSetState) {
          setError(err);
        }
        return null;
      } finally {
        if (isSetState) {
          setLoading(false);
        }
      }
    },
    [config, accessToken],
  );

  const post = useCallback(
    async (url: string, requestJSON: any) => {
      setLoading(true);
      try {
        const response = await fetch(API_HOST + url, {
          method: 'POST',
          ...postConfig,
          body: JSON.stringify(requestJSON),
        });
        if (response.status === 500) {
          setStatus(500);
          setError(response.type);
          return response.type;
        }
        setStatus(response?.ok);
        const apiData = await response.json();
        if (apiData?.message === 'Unauthorized user.' ||response.status === 401 ) {
          logout();
        }
        const apiResponse = apiData.data ?? apiData;
        setData(apiResponse);
        return apiResponse;
      } catch (err: any) {
        console.log('ERROR::::::::::: POST: ', url, '==>>', err);
        setError(err);
        return null;
      } finally {
        setLoading(false);
      }
    },
    [postConfig],
  );

  const formData = useCallback(
    async (url: string, requestJSON: any) => {
      setLoading(true);
      try {
        const response = await fetch(API_HOST + url, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          body: requestJSON,
        });
        const apiData = await response.json();
        if (apiData?.message === 'Unauthorized user.' ||response.status === 401 ) {
          logout();
        }
        setStatus(response?.ok);
        setData(apiData);
        setLoading(false);
        return apiData;
      } catch (err: any) {
        console.log('ERROR::::::::::: FORM DATA: ', url, '==>>', err);
        setError(err);
        return null;
      } finally {
        setLoading(false);
      }
    },
    [accessToken],
  );

  const put = useCallback(
    async (url: string, requestJSON?: any) => {
      setLoading(true);
      try {
        const response = await fetch(API_HOST + url, {
          method: 'PUT',
          ...postConfig,
          body: JSON.stringify(requestJSON),
        });
        setStatus(response?.ok);
        const apiData = await response.json();
        if (apiData?.message === 'Unauthorized user.' ||response.status === 401 ) {
          logout();
        }
        setStatus(response.status);
        setData(apiData.data);
        return apiData;
      } catch (err: any) {
        console.log('ERROR::::::::::: PUT: ', url, '==>>', err)
        setError(err);
        return null;
      } finally {
        setLoading(false);
      }
    },
    [postConfig],
  );

  const remove = useCallback(
    async (url: string, requestJSON?: any) => {
      try {
        const response = await fetch(API_HOST + url, {
          method: 'DELETE',
          ...postConfig,
          body: JSON.stringify(requestJSON),
        });
        setStatus(response?.ok);
        const apiData = await response.json();
        if (apiData?.message === 'Unauthorized user.' ||response.status === 401 ) {
          logout();
        }
        setStatus(response.status);
        setData(apiData.data);
        return apiData;
      } catch (err: any) {
        console.log('ERROR::::::::::: DELETE: ', url, '==>>', err);
        setError(err);
        return null;
      } finally {
        setLoading(false);
      }
    },
    [postConfig],
  );

  const patch = useCallback(
    async (url: string, requestJSON?: any) => {
      try {
        const response = await fetch(API_HOST + url, {
          method: 'PATCH',
          ...postConfig,
          body: JSON.stringify(requestJSON),
        });
        setStatus(response?.ok);
        const apiData = await response.json();
        if (apiData?.message === 'Unauthorized user.' ||response.status === 401 ) {
          logout();
        }
        setStatus(response.status);
        setData(apiData.data ?? apiData);
        return apiData.data ?? apiData;
      } catch (err: any) {
        console.log('ERROR::::::::::: PATCH: ', url, '==>>', err);
        setError(err);
        return null;
      } finally {
        setLoading(false);
      }
    },
    [postConfig],
  );

  return {
    get,
    post,
    formData,
    put,
    data,
    status,
    error,
    loading,
    setLoading,
    remove,
    patch,
    isLoaded,
  };
};
