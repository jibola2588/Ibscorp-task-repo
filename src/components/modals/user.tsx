import React, { useEffect } from 'react';
import { User } from '../../types';
import { Modal } from './index';
import { Input } from '../input';
import { Button } from '../button';

interface UserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Partial<User>) => void;
  user?: User;
}

export const UserModal: React.FC<UserModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  user,
}) => {
  const [formData, setFormData] = React.useState<Partial<User>>(
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
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
    //   setFormData(prev => ({
    //     ...prev,
    //     [parent]: {
    //       ...prev[parent as keyof User],
    //       [child]: value,
    //     },
    //   }));
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
          required
        />
        <Input
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <Input
          label="Phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
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
          required
        />
        <Input
          label="Company Catch Phrase"
          name="company.catchPhrase"
          value={formData.company?.catchPhrase}
          onChange={handleChange}
        />
        <div className="mt-5 flex justify-end gap-2">
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="primary">
            {user ? 'Update' : 'Create'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};