const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

export interface CreateUserInput {
  name: string;
  mobile: string;
  state: string;
  district: string;
  subDistrict: string;
  villageOrTown: string;
  country?: string;
  wantsToVolunteer?: boolean;
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
  subDistrict: string;
  villageOrTown: string;
  wantsToVolunteer: boolean;
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

export interface ApiEvent {
  _id: string;
  name: string;
  descriptions: string;
  imageUrls: string[];
  videoUrls: string[];
  createdAt: string;
  updatedAt: string;
}

// Public, unauthenticated read — backs the "View Gallery & Videos" dialog.
// Returns every admin-managed event; the dialog merges all of their
// imageUrls/videoUrls into one combined gallery/video list.
export async function getPublicEvents(): Promise<ApiEvent[]> {
  let response: Response;
  try {
    response = await fetch(`${API_BASE_URL}/events/public`);
  } catch {
    throw new ApiError('Unable to reach the server. Check your connection and try again.', 0);
  }

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new ApiError(data.message || 'Something went wrong', response.status, data.errors || []);
  }

  return data as ApiEvent[];
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
