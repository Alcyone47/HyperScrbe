import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://geodxnyvvnbxegvubbbj.supabase.co/'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdlb2R4bnl2dm5ieGVndnViYmJqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjYxNjEzNzgsImV4cCI6MjA0MTczNzM3OH0.Oh2uzDkGcgQsWkIqhTKOF17hPHP2x7nyeD7Fu2yCXfw'

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})

const uploadImage = async (imageUri) => {
  try {
    const { data, error } = await supabase.storage
      .from('user-images')
      .upload(`public/${Date.now()}.jpg`, {
        uri: imageUri,
        type: 'image/jpeg',
        name: 'upload.jpg',
      });

    if (error) {
      throw error;
    }
    return data;
  } catch (error) {
    console.error('Error uploading image:', error);
    Alert.alert('Upload Failed', 'Could not upload the image.');
  }
};