export class ApiError extends Error {
  public status: number;
  public data?: unknown;

  constructor(
    message: string,
    status: number,
    data?: unknown
  ) {
    super(message);
    this.status = status;
    this.data = data;
    this.name = 'ApiError';
  }
}


class ApiService {
  #baseUrl = 'http://localhost:3000/api/v1';

  #getAuthHeader(): Record<string, string> {
    const token = localStorage.getItem('token');
    return token ? { 'Authorization': `Bearer ${token}` } : {};
  }

  async #request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
         ...this.#getAuthHeader(),
        ...options.headers
      },
      ...options,
    }
    try {
      const response = await fetch(`${this.#baseUrl}${endpoint}`, config) 
      if (!response.ok) {
        const errorData = await response.json().catch(() => null);

        throw new ApiError(
          errorData.message || `HTTP ${response.status}`,
          response.status,
          errorData
        );
      }

      if (response.status === 204) return {} as T

      return response.json();
    } catch (error) {

      if (error instanceof ApiError) {
        throw error;
      }

      throw new ApiError('Network error', 0, error);
    }
  }

  get<T>(endpoint: string, params?: Record<string, string>) {
    const url = params ? `${endpoint}?${new URLSearchParams(params)}` : endpoint;
    return this.#request<T>(url);
  }

  post<T, B = unknown>(endpoint: string, body?: B) {
    return this.#request<T>(endpoint, {
      method: 'POST',
      body: body ? JSON.stringify(body) : undefined,
    })
  }

  delete<T>(endpoint: string) {
    return this.#request<T>(endpoint, {
      method: 'DELETE',
    })
  }

  patch<T, B = unknown>(endpoint: string, body?: B) {
    return this.request<T>(endpoint, {
      method: 'PATCH',
      body: body ? JSON.stringify(body) : undefined,
    })
  }
  
  put<T, B = unknown>(endpoint: string, body?: B) {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: body ? JSON.stringify(body) : undefined,
    })
  }
}

export const api = new ApiService();