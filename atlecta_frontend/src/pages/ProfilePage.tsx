// src/pages/ProfilePage.tsx
import { ProfileForm } from '../components/ProfileForm';

export default function ProfilePage() {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-gray-50 to-gray-100 overflow-y-auto">
      <div className="min-h-full flex items-center justify-center p-4">
        <div className="w-full max-w-4xl my-8">
          <ProfileForm />
        </div>
      </div>
    </div>
  );
}