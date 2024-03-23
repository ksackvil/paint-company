"use server";

interface GetTokenResponse {
  access: string;
  refresh: string;
}
export async function getToken(
  username: string,
  password: string
): Promise<GetTokenResponse> {
  return makeApiRequest("/token/", "POST", undefined, {
    username: username,
    password: password,
  });
}

export async function getRefreshToken(
  token: string
): Promise<GetTokenResponse> {
  return makeApiRequest("/token/refresh/", "POST", undefined, {
    refresh: token,
  });
}

async function makeApiRequest<T>(
  endpoint: string,
  method: string,
  token?: string,
  body?: object
): Promise<T> {
  /* Wrapper for calling fetch on our API */
  const apiBaseUrl = "http://localhost:8000/api";
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const config: RequestInit = {
    method,
    headers,
    cache: "no-store",
  };
  if (body) {
    config.body = JSON.stringify(body);
  }

  const response = await fetch(`${apiBaseUrl}${endpoint}`, config);

  if (!response.ok) {
    throw new Error(`Error: ${response.status} - ${response.statusText}`);
  }

  const data: T = await response.json();
  return data;
}
