import { ProfileForm } from '../components/ProfileForm';

export default function ProfilePage() {
  return (
    <div className="py-10 px-4">
      <h1 className="text-2xl font-bold mb-6">Профиль</h1> //#TODO finish Put request since the API is not implemented
      <ProfileForm />
    </div>
  );
}
