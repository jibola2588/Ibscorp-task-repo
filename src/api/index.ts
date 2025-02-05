
import axios from 'axios';
import { User, QueryParams } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_KEY;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getUsers = async ({ page, limit, search, field, direction }: QueryParams) => {
  const response = await api.get<User[]>('/users');
  let filteredData = response.data;


  if (search) {
    filteredData = filteredData.filter(user => 
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
    );
  }

  if (field) {
    filteredData.sort((a: any, b: any) => {
      const aValue = a[field];
      const bValue = b[field];
      return direction === 'asc' ? 
        aValue.localeCompare(bValue) : 
        bValue.localeCompare(aValue);
    });
  }

  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedData = filteredData.slice(startIndex, endIndex);

  return {
    data: paginatedData,
    total: filteredData.length,
    totalPages: Math.ceil(filteredData.length / limit),
  };
};

export const updateUser = async (id: number, userData: Partial<User>) => {
  const response = await api.put<User>(`/users/${id}`, userData);
  return response.data;
};

export const deleteUser = async (id: number) => {
  await api.delete(`/users/${id}`);
  return id;
};

export const createUser = async (userData: Omit<User, 'id'>) => {
  const response = await api.post<User>('/users', userData);
  return response.data;
};