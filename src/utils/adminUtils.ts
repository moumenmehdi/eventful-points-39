import { supabase } from "@/integrations/supabase/client";

export const setAdminStatus = async (email: string, isAdmin: boolean = true) => {
  console.log('Setting admin status for email:', email);
  
  // First get the user's ID from their email
  const { data: { user }, error: userError } = await supabase.auth.getUser();
  
  if (userError) {
    console.error('Error fetching user:', userError);
    throw userError;
  }

  if (!user) {
    console.error('User not found');
    throw new Error('User not found');
  }

  // Update the user's admin status
  const { error: updateError } = await supabase
    .from('profiles')
    .update({ is_admin: isAdmin })
    .eq('id', user.id);

  if (updateError) {
    console.error('Error updating admin status:', updateError);
    throw updateError;
  }

  console.log('Successfully set admin status for user:', email);
  return true;
};

// Call this function to set the admin status
setAdminStatus('elmehdimoumen20@gmail.com')
  .then(() => console.log('Admin status set successfully'))
  .catch((error) => console.error('Error setting admin status:', error));