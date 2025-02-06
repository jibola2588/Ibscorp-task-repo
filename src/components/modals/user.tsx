import React, { useEffect, useState } from 'react';
import { User } from '../../types';
import { Modal } from './index';
import { Input } from '../input';
import { Button } from '../button';
import { toast } from 'react-toastify';

interface UserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Partial<User>) => void;
  user?: User;
  isLoading?: boolean;
}

export const UserModal: React.FC<UserModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  user,
  isLoading = false,
}) => {
  const [formData, setFormData] = useState<Partial<User>>(
    user ?? {
      name: '',
      email: '',
      phone: '',
      website: '',
      company: {
        name: '',
        catchPhrase: '',
        bs: '',
      },
    }
  );
  
  
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        phone: user.phone,
        website: user.website,
        company: {
          name: user.company?.name || "",
          catchPhrase: user.company?.catchPhrase || "",
          bs: user.company?.bs || "",
        },
      });
    }else{ 
      setFormData({
        name: '',
        email: '',
        phone: '',
        website: '',
        company: {
          name: "",
          catchPhrase: "",
          bs:"",
        },
      });
    }
  }, [user,isOpen]);

  const validateForm = () => {
    const requiredFields = ['name', 'email', 'phone','website', 'company.name'];
    const newErrors: Record<string, string> = {};
  
    requiredFields.forEach(field => {
      const value = field.split('.').reduce((acc:any, key) => acc?.[key], formData);
      if (!value?.trim()) newErrors[field] = `${field.replace('.', ' ')} is required`;
    });
  
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    } else {
      toast.warning('Please fill in all required fields');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
    setFormData(prev => ({
        ...prev,
        [parent]: {
          ...((prev[parent as keyof User] as object) ?? {}), 
          [child]: value,
        },
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={user ? 'Edit User' : 'Create User'}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        <Input
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
        />
        <Input
          label="Phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
        />
        <Input
          label="Website"
          name="website"
          value={formData.website}
          onChange={handleChange}
        />
        <Input
          label="Company Name"
          name="company.name"
          value={formData.company?.name}
          onChange={handleChange}
        />
        <Input
          label="Company Catch Phrase"
          name="company.catchPhrase"
          value={formData.company?.catchPhrase}
          onChange={handleChange}
        />
        <div className="mt-5 flex justify-end gap-2">
          <Button 
          type="button" 
          variant="secondary" 
          onClick={onClose} 
          disabled={isLoading}
          className='cursor-pointer'
          >
            Cancel
          </Button>
          <Button 
          type="submit" 
          variant="primary" 
          isLoading={isLoading}
          className='cursor-pointer'
          >
            { user ? 'Update' : 'Create'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};