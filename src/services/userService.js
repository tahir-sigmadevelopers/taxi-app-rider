import axios from 'axios';
import { API_BASE_URL } from '../config';

const userService = {
  // Create or update user after signup
  saveUserData: async (userData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/users/signup`, userData);
      return response.data;
    } catch (error) {
      console.error('Error saving user data:', error);
      throw error.response?.data || { message: 'Error saving user data' };
    }
  },

  // Get user profile by ID
  getUserById: async (id) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/users/id/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error getting user profile by ID:', error);
      throw error.response?.data || { message: 'Error getting user profile' };
    }
  },

  // Get user profile by Firebase UID
  getUserByFirebaseUid: async (firebaseUid) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/users/firebase/${firebaseUid}`);
      return response.data;
    } catch (error) {
      console.error('Error getting user profile by Firebase UID:', error);
      throw error.response?.data || { message: 'Error getting user profile' };
    }
  },

  // Update user profile
  updateUserProfile: async (firebaseUid, userData) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/users/firebase/${firebaseUid}`, userData);
      return response.data;
    } catch (error) {
      console.error('Error updating user profile:', error);
      throw error.response?.data || { message: 'Error updating user profile' };
    }
  },

  // Delete user
  deleteUser: async (firebaseUid) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/users/firebase/${firebaseUid}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error.response?.data || { message: 'Error deleting user' };
    }
  }
};

export default userService; 