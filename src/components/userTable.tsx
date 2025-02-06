import React, { useState } from 'react';
import { User, SortParams }from '../types';
import { Button } from './button';
import { ConfirmationDialog } from '../components/dialogue';
import { HiArrowSmUp,HiArrowSmDown } from "react-icons/hi";
import { BiSort } from "react-icons/bi";

interface UserTableProps {
  users: User[];
  isLoading:boolean,
  onEdit: (user: User) => void;
  onDelete: (id: number) => void;
  sortParams: SortParams;
  onSort: (field: string) => void;
}

export const UserTable: React.FC<UserTableProps> = ({
  users,
  onEdit,
  onDelete,
  sortParams,
  onSort,
  isLoading = false
}) => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  const handleDeleteClick = (id: number) => {
    setSelectedUserId(id);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedUserId !== null) {
      onDelete(selectedUserId);
      setDeleteDialogOpen(false);
      setSelectedUserId(null);
    }
  };

  const handleCancelDelete = () => {
    setDeleteDialogOpen(false);
    setSelectedUserId(null);
  };

  const getSortIcon = (field: string) => {
    if (sortParams.field !== field) return <BiSort />;
    return sortParams.direction === 'asc' ? <HiArrowSmUp/> : <HiArrowSmDown />;
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-300">
        <thead>
          <tr>
            <th
              className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 cursor-pointer"
              onClick={() => onSort('name')}
            >
              <div className='flex items-end gap-1'> 
                Name {getSortIcon('name')}
              </div>
            </th>
            <th
              className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 cursor-pointer"
              onClick={() => onSort('email')}
            >
               <div className='flex items-end gap-1'> 
                Email {getSortIcon('email')}
              </div>
            </th>
            <th 
            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900" 
            >
              Phone
            </th>
            <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
              Website
            </th>
            <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
              Company
            </th>
            <th className="relative py-3.5 pl-3 pr-4 sm:pr-6">
              <span className="sr-only">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {users.map((user) => (
            <tr key={user.id}>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                {user.name}
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                {user.email}
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                {user.phone}
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                {user.website}
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                {user.company.name}
              </td>
              <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6 space-x-2">
                <Button
                  variant="secondary"
                  size="md"
                  onClick={() => onEdit(user)}
                  className='cursor-pointer'
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  size="md"
                  className='cursor-pointer'
                  onClick={() => handleDeleteClick(user.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <ConfirmationDialog
        isLoading={isLoading}
        open={deleteDialogOpen}
        title="Delete User?"
        message="Are you sure you want to delete this user? This action cannot be undone."
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};