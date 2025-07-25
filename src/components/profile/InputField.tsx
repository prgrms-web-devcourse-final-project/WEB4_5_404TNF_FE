import { UseFormRegister } from 'react-hook-form';

export default function InputField({
  id,
  label,
  required = false,
  placeholder = '',
  register,
  type = 'text',
  className = '',
}: {
  id: 'name' | 'weight' | 'registNumber';
  label: string;
  required?: boolean;
  placeholder?: string;
  register: UseFormRegister<PetFormValues>;
  type?: string;
  className?: string;
}) {
  return (
    <div className="mb-7">
      <label className="mb-2 block" htmlFor={id}>
        {label}
        {required && <span className="text-[var(--color-red)]"> *</span>}
      </label>
      <input
        id={id}
        className={`profile-input-style ${className}`}
        type={type}
        placeholder={placeholder}
        autoComplete="off"
        step={0.1}
        {...register(id)}
      />
      {id === 'weight' && 'kg'}
    </div>
  );
}
