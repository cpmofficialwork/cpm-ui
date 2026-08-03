const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

export interface CreateUserInput {
  name: string;
  mobile: string;
  state: string;
  district: string;
  constituency: string;
  country?: string;
}

export interface ApiUser {
  _id: string;
  memberID: string;
  name: string;
  countryCode: string;
  mobile: string;
  country: string;
  state: string;
  district: string;
  constituency: string;
  createdAt: string;
  updatedAt: string;
}

export interface FieldError {
  field: string;
  message: string;
}

export class ApiError extends Error {
  status: number;
  fieldErrors: FieldError[];

  constructor(message: string, status: number, fieldErrors: FieldError[] = []) {
    super(message);
    this.status = status;
    this.fieldErrors = fieldErrors;
  }
}

export async function createUser(input: CreateUserInput): Promise<ApiUser> {
  let response: Response;
  try {
    response = await fetch(`${API_BASE_URL}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
    });
  } catch {
    throw new ApiError('Unable to reach the server. Check your connection and try again.', 0);
  }

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new ApiError(data.message || 'Something went wrong', response.status, data.errors || []);
  }

  return data as ApiUser;
}
