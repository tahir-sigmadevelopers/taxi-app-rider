import { Alert } from 'react-native';
import { SOCKET_URL } from '../config';

class SocketService {
  constructor() {
    this.socket = null;
    this.connected = false;
    this.userId = null;
    this.callbacks = {};
  }

  // Initialize the socket connection
  initialize(userId) {
    if (this.socket) {
      this.disconnect();
    }

    this.userId = userId;
    
    try {
      this.socket = new WebSocket(SOCKET_URL);
      
      this.socket.onopen = () => {
        console.log('Socket connected');
        this.connected = true;
        this.sendMessage({
          type: 'connect',
          role: 'user',
          userId: this.userId
        });
        
        if (this.callbacks.onConnect) {
          this.callbacks.onConnect();
        }
      };
      
      this.socket.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          console.log('Socket received message:', data.type);
          
          // Handle different message types
          switch (data.type) {
            case 'nearbyDrivers':
              if (this.callbacks.onNearbyDrivers) {
                this.callbacks.onNearbyDrivers(data.drivers, data.rideId);
              }
              break;
              
            case 'driverRequest':
              if (this.callbacks.onDriverRequest) {
                this.callbacks.onDriverRequest(data.driverId, data.driver, data.rideId);
              }
              break;
              
            case 'rideAccepted':
              if (this.callbacks.onRideAccepted) {
                this.callbacks.onRideAccepted(data.driverId, data.driver, data.rideId);
              }
              break;
              
            case 'rideRejected':
              if (this.callbacks.onRideRejected) {
                this.callbacks.onRideRejected(data.driverId, data.rideId);
              }
              break;
              
            case 'rideCancelled':
              if (this.callbacks.onRideCancelled) {
                this.callbacks.onRideCancelled(data.cancelledBy, data.rideId);
              }
              break;
              
            case 'driverLocation':
              if (this.callbacks.onDriverLocation) {
                this.callbacks.onDriverLocation(data.driverId, data.location, data.rideId);
              }
              break;
              
            case 'rideStarted':
              if (this.callbacks.onRideStarted) {
                this.callbacks.onRideStarted(data.rideId);
              }
              break;
              
            case 'rideCompleted':
              if (this.callbacks.onRideCompleted) {
                this.callbacks.onRideCompleted(data.rideId);
              }
              break;
              
            case 'error':
              console.error('Socket error:', data.message);
              if (this.callbacks.onError) {
                this.callbacks.onError(data.message);
              }
              break;
          }
        } catch (error) {
          console.error('Error parsing socket message:', error);
        }
      };
      
      this.socket.onerror = (error) => {
        console.error('Socket error:', error);
        if (this.callbacks.onError) {
          this.callbacks.onError('Socket connection error');
        }
      };
      
      this.socket.onclose = () => {
        console.log('Socket disconnected');
        this.connected = false;
        if (this.callbacks.onDisconnect) {
          this.callbacks.onDisconnect();
        }
      };
      
      return true;
    } catch (error) {
      console.error('Failed to initialize socket:', error);
      return false;
    }
  }
  
  // Set callback functions
  on(event, callback) {
    this.callbacks[event] = callback;
  }
  
  // Disconnect socket
  disconnect() {
    if (this.socket) {
      this.socket.close();
      this.socket = null;
      this.connected = false;
    }
  }
  
  // Send message through socket
  sendMessage(data) {
    if (this.socket && this.connected) {
      try {
        this.socket.send(JSON.stringify(data));
        return true;
      } catch (error) {
        console.error('Error sending socket message:', error);
        return false;
      }
    } else {
      console.warn('Socket not connected, cannot send message');
      return false;
    }
  }
  
  // Request a ride
  requestRide(rideId, pickup, dropoff) {
    return this.sendMessage({
      type: 'requestRide',
      role: 'user',
      userId: this.userId,
      rideId,
      data: {
        pickup,
        dropoff
      }
    });
  }
  
  // Accept a driver request
  acceptDriverRequest(rideId, driverId) {
    return this.sendMessage({
      type: 'acceptDriver',
      role: 'user',
      userId: this.userId,
      rideId,
      driverId
    });
  }
  
  // Reject a driver request
  rejectDriverRequest(rideId, driverId) {
    return this.sendMessage({
      type: 'rejectDriver',
      role: 'user',
      userId: this.userId,
      rideId,
      driverId
    });
  }
  
  // Cancel a ride
  cancelRide(rideId) {
    return this.sendMessage({
      type: 'cancelRide',
      role: 'user',
      userId: this.userId,
      rideId
    });
  }
  
  // Rate a driver
  rateDriver(rideId, driverId, rating, comment) {
    return this.sendMessage({
      type: 'rateDriver',
      role: 'user',
      userId: this.userId,
      rideId,
      driverId,
      data: {
        rating,
        comment
      }
    });
  }
}

// Create singleton instance
const socketService = new SocketService();
export default socketService; 