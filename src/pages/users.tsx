import React, { useState, useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { User, QueryParams } from '../types';
import { getUsers, updateUser, deleteUser, createUser } from '../api';
import { UserTable } from '../components/userTable';
import { UserModal } from '../components/modals/user';
import { Input } from '../components/input';
import { Button } from '../components/button';
import { useDebounce } from '../hooks/useDebounce';
import { LoadingSpinner } from '../components/loader';
import { toast } from "react-toastify";

const DEFAULT_QUERY_PARAMS: QueryParams = {
  page: 1,
  limit: 5,
  search: '',
  field: 'name',
  direction: 'asc',
};

function Users() {
  const [queryParams, setQueryParams] = useState<QueryParams>(DEFAULT_QUERY_PARAMS);
  const [selectedUser, setSelectedUser] = useState<User | undefined>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const debouncedSearch = useDebounce(queryParams.search);
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ['users', { ...queryParams, search: debouncedSearch }],
    queryFn: () => getUsers({ ...queryParams, search: debouncedSearch }),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<User> }) =>
      updateUser(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast.success('User updated successfully!');
      setIsModalOpen(false);
    },
    onError: () => {
      toast.error('Failed to update user. Please try again.');
    }
  });

  const deleteMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast.success('User deleted successfully!');
    },
    onError: () => {
      toast.error('Failed to delete user. Please try again.');
    }
  });

  const createMutation = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast.success('User created successfully!');
      setIsModalOpen(false);
    },
    onError: () => {
      toast.error('Failed to create user. Please try again.');
    }
  });

  const handleSort = useCallback((field: string) => {
    setQueryParams(prev => ({
      ...prev,
      field,
      direction: prev.field === field && prev.direction === 'asc' ? 'desc' : 'asc',
    }));
  }, []);

  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setQueryParams(prev => ({ ...prev, search: e.target.value, page: 1 }));
  }, []);

  const handlePageChange = useCallback((newPage: number) => {
    setQueryParams(prev => ({ ...prev, page: newPage }));
  }, []);

  const handleEdit = useCallback((user: User) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  }, []);

  const handleCreate = useCallback(() => {
    setSelectedUser(undefined);
    setIsModalOpen(true);
  }, []);

  const handleSubmit = useCallback((formData: Partial<User>) => {
    if (selectedUser) {
      updateMutation.mutate({ id: selectedUser.id, data: formData });
    } else {
      createMutation.mutate(formData as Omit<User, 'id'>);
    }
  }, [selectedUser, updateMutation, createMutation]);

  if (error) {
    toast.error("Error occured reload page!");
  }

  return (
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
         
        <div className="mt-8">
          <div className="flex items-center justify-between flex-wrap-reverse mb-6">
            <Input
              placeholder="Search users..."
              value={queryParams.search}
              onChange={handleSearch}
            />
            <Button onClick={handleCreate} className='cursor-pointer'>Add User</Button>
          </div>

          {isLoading ? (
            <LoadingSpinner />
          ) : error ? (<div className='text-center text-red-500 text-xl'>Error occurred try again</div>): (
            <>
              <UserTable
                users={data?.data ?? []}
                onEdit={handleEdit}
                onDelete={(id) => deleteMutation.mutate(id)}
                sortParams={{ field: queryParams.field, direction: queryParams.direction }}
                onSort={handleSort}
                isLoading={deleteMutation.isPending}
              />

              <div className="mt-4 flex items-center justify-between">
                <div className="text-sm text-gray-700">
                  Showing {((queryParams.page - 1) * queryParams.limit) + 1} to{' '}
                  {Math.min(queryParams.page * queryParams.limit, data?.total ?? 0)} of{' '}
                  {data?.total ?? 0} results
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="secondary"
                    onClick={() => handlePageChange(queryParams.page - 1)}
                    disabled={queryParams.page === 1}
                    className={queryParams.page === 1 ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}
                  >
                    Previous
                  </Button>
                  <Button
                    variant="primary"
                    onClick={() => handlePageChange(queryParams.page + 1)}
                    disabled={queryParams.page >= (data?.totalPages ?? 1)}
                    className={queryParams.page >= (data?.totalPages ?? 1) ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}
                  >
                    Next
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>

        <UserModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleSubmit}
          user={selectedUser}
          isLoading={updateMutation.isPending || createMutation.isPending}
        />
      </div>
  );
}

export default Users;