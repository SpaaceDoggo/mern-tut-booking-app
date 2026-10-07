import type { LoginForm } from "./pages/Login";
import type { RegisterFormData } from "./pages/Register";
import type {
  HotelPagination,
  HotelType,
} from "../../backend/src/shared/types";

const API_URL = import.meta.env.VITE_API_BASE_URL || "";
export const register = async (data: RegisterFormData) => {
  const req = await fetch(`${API_URL}/api/user/register`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const res = await req.json();
  console.log(res);
  if (!req.ok) {
    throw new Error(res.message);
  }
};

export const validateCookie = async () => {
  const req = await fetch(`${API_URL}/api/auth/validate-cookie`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Application-Type": "application/json",
    },
  });

  if (!req.ok) {
    throw new Error("Token invalid");
  }

  return req.json();
};

export const login = async (data: LoginForm) => {
  console.log(data);
  const req = await fetch(`${API_URL}/api/auth/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const res = await req.json();

  if (!req.ok) {
    console.log(res);
    throw new Error(res.message);
  }

  return res.userId;
};

export const logout = async () => {
  const req = await fetch(`${API_URL}/api/auth/logout`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Application-Type": "application/json",
    },
  });

  if (!req.ok) {
    throw new Error("Logout error");
  }
};

export const addHotel = async (hotelData: FormData) => {
  const req = await fetch(`${API_URL}/api/my-hotels`, {
    method: "POST",
    credentials: "include",
    body: hotelData,
  });

  if (!req.ok) {
    throw Error("Something went wrong creating a hotel. Please try again");
  }

  return req.json();
};

export const fetchHotels = async (): Promise<HotelType[]> => {
  const req = await fetch(`${API_URL}/api/my-hotels/get-hotels`, {
    credentials: "include",
  });

  if (!req.ok) {
    throw new Error("Error in fetching my hotels");
  }

  return req.json();
};

export const getHotel = async (id: string) => {
  const res = await fetch(`${API_URL}/api/my-hotels/${id}`, {
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Error getting hotel");
  }

  return res.json();
};

export const updateHotel = async (id: string, hotel: FormData) => {
  const res = await fetch(`${API_URL}/api/my-hotels/edit-hotel/${id}`, {
    method: "PUT",
    body: hotel,
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Error in updating hotel");
  }

  return res.json();
};

export type QuerySearch = {
  location?: string;
  adultCount?: string;
  childCount?: string;
  startDate?: string;
  endDate?: string;
  page?: string;
  facilities?: string[];
  types?: string[];
  stars?: string[];
  priceMax?: string;
  sortOptions?: string;
};

export const searchHotel = async (
  query: QuerySearch,
): Promise<HotelPagination> => {
  const queryParams = new URLSearchParams();

  queryParams.append("location", query.location || "");
  queryParams.append("adultCount", query.adultCount || "");
  queryParams.append("startDate", query.startDate || "");
  queryParams.append("endDate", query.endDate || "");
  queryParams.append("pagination", query.page || "1");
  queryParams.append("priceMax", query.priceMax || "");
  queryParams.append("sortOptions", query.sortOptions || "");

  query.facilities?.map((facility) =>
    queryParams.append("facilities", facility),
  );

  query.types?.map((type) => queryParams.append("types", type));

  query.stars?.map((star) => queryParams.append("stars", star));

  const res = await fetch(`${API_URL}/api/search?${queryParams.toString()}`);

  if (!res.ok) {
    throw new Error("Error in fetching search hotel");
  }

  return res.json();
};
