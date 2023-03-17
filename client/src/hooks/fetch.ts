import { AxiosRequestConfig } from 'axios';
import { api } from 'src/boot/axios';
import { useUserStore } from 'src/stores/userStore';

const userStore = useUserStore();

interface User {
  value: {
    token: string;
  }
}

interface Config {
  headers: {
    'Content-type'?: string,
    Authorization: string;
  }
}

// interface Api {
//   (params: AxiosRequestConfig): Promise<any>;
// }

type Method = 'get' | 'GET' | 'post' | 'POST' | 'put' | 'PUT' | 'delete' | 'DELETE';

type ContentType = 'application/json' | 'multipart/form-data' | 'application/x-www-form-urlencoded';

const user: User = userStore.user;

const config: Config = {
  headers: {
    'Content-type': 'application/json',
    Authorization: `Bearer ${user.value.token}`,
  }
}


const fetch = async (method: Method, url: string, data?: object, contentType?: ContentType) => {
  if (contentType) {
    config.headers['Content-type'] = contentType;
  }
  const params: AxiosRequestConfig = {
    method,
    url,
    headers: config.headers,
    data
  }
  return await api(params)
}

export default fetch
