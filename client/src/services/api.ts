import type {Payment, PaymentData} from '@/types/payment';
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
  private baseUrl = 'http://localhost:3000/api/v1';

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options,
    }
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, config) 
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
    return this.request<T>(url);
  }

  post<T>(endpoint: string, body: PaymentData) {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: body ? JSON.stringify(body) : undefined,
    })
  }

  delete<T>(endpoint: string) {
    return this.request<T>(endpoint, {
      method: 'DELETE',
    })
  }

  patch<T>(endpoint: string, body: Payment) {
    return this.request<T>(endpoint, {
      method: 'PATCH',
      body: body ? JSON.stringify(body) : undefined,
    })
  }
}

export const api = new ApiService();