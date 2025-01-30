import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";

export const Profile = () => {
  // This will be replaced with actual user data from Supabase
  const user = {
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    phone: "+1234567890"
  };

  const handleDeleteAccount = () => {
    // Will be implemented with Supabase
    console.log("Delete account");
  };

  const handleChangePassword = () => {
    // Will be implemented with Supabase
    console.log("Change password");
  };

  return (
    <div className="min-h-screen bg-dark">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto bg-dark-secondary rounded-lg p-6 shadow-lg">
          <h2 className="text-2xl font-bold text-white mb-6">Profile Information</h2>
          
          <div className="space-y-4 mb-8">
            <div className="flex justify-between items-center border-b border-gray-700 pb-3">
              <span className="text-gray-400">First Name</span>
              <span className="text-white">{user.firstName}</span>
            </div>
            <div className="flex justify-between items-center border-b border-gray-700 pb-3">
              <span className="text-gray-400">Last Name</span>
              <span className="text-white">{user.lastName}</span>
            </div>
            <div className="flex justify-between items-center border-b border-gray-700 pb-3">
              <span className="text-gray-400">Email</span>
              <span className="text-white">{user.email}</span>
            </div>
            <div className="flex justify-between items-center border-b border-gray-700 pb-3">
              <span className="text-gray-400">Phone</span>
              <span className="text-white">{user.phone}</span>
            </div>
          </div>

          <div className="space-y-4">
            <Button
              variant="outline"
              className="w-full border-accent text-accent hover:bg-accent hover:text-white"
              onClick={handleChangePassword}
            >
              Change Password
            </Button>
            <Button
              variant="destructive"
              className="w-full"
              onClick={handleDeleteAccount}
            >
              Delete Account
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;