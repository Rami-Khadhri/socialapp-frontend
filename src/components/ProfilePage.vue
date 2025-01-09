<template>
  <div class="min-h-screen bg-gray-100">
    <!-- Loading and Error States -->
    <div v-if="isLoading" class="flex items-center justify-center min-h-screen">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
    </div>

    <div v-else-if="errorMessage" class="flex items-center justify-center min-h-screen">
      <div class="bg-red-50 p-4 rounded-lg shadow">
        <p class="text-red-600">{{ errorMessage }}</p>
      </div>
    </div>

    <div v-else class="container mx-auto px-4 py-8">
      <!-- Cover Photo Section -->
      <div class="relative rounded-xl overflow-hidden bg-white shadow-lg">
        <div class="h-80 relative">
          <img 
            :src="user.coverPhoto || '/default-cover.jpg'" 
            alt="Cover Photo"
            class="w-full h-full object-cover"
          />
          <div class="absolute inset-0 bg-gradient-to-b from-transparent to-black/30"></div>
        </div>

        <!-- Profile Info Section -->
        <div class="relative px-6 pb-6">
          <!-- Profile Picture -->
          <div class="absolute -top-24 left-6">
            <img 
              :src="user.photoUrl || user.photo || '/default-avatar.png'" 
              alt="Profile Picture"
              class="w-40 h-40 rounded-full border-4 border-white shadow-lg object-cover"
            />
          </div>

          <!-- User Info -->
          <div class="ml-48 pt-4">
            <div class="flex items-center justify-between">
              <div>
                <h1 class="text-3xl font-bold text-gray-900">{{ user.username }}</h1>
                
                <div class="mt-2">
                  <span 
                    :class="[ 'px-3 py-1 rounded-full text-sm font-medium', user.role === 'ADMIN' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800' ]"
                  >
                    {{ user.role }}
                  </span>
                </div>
              </div>

              <!-- Friend Action Buttons -->
              <div class="space-x-3" v-if="user.id !== currentUserId">
                <button
                  v-if="!isFriend && !requestSent && !requestReceived"
                  @click="sendFriendRequest"
                  class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                >
                  Add Friend
                </button>

                <button
                  v-if="requestSent"
                  disabled
                  class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-400"
                >
                  Request Sent
                </button>

                <button
                  v-if="requestReceived"
                  @click="acceptFriendRequest"
                  class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700"
                >
                  Accept Request
                </button>

                <button
                  v-if="isFriend"
                  @click="showRemoveFriendModal = true"
                  class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  Remove Friend
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Sent Requests Section -->
<div v-if="sentRequests.length === 0" class="text-center">
  <p>No sent requests found.</p>
</div>

<div v-else>
  <ul class="list-none p-0">
    <li v-for="(request, index) in sentRequests" :key="index" class="border-b py-2 flex justify-between items-center">
      <span>{{ request.username }}</span>
      <button 
        :disabled="isRequestSent(request.id)"  
        @click="cancelRequest(request.id)"
        class="bg-red-500 text-white px-4 py-2 rounded disabled:bg-gray-400">
        Cancel Request
      </button>
    </li>
  </ul>
</div>

      <!-- Friends Section -->
      <div class="mt-8 bg-white rounded-xl shadow-lg p-6">
        <h2 class="text-2xl font-bold text-gray-900 mb-6">Friends</h2>

        <div v-if="user.friendIds && user.friendIds.length > 0" 
             class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="friend in user.friendIds" 
               :key="friend.id" 
               class="flex items-center space-x-4 p-4 rounded-lg border hover:bg-gray-50 transition-colors">
            <img 
              :src="friend.photoUrl || '/default-avatar.png'" 
              :alt="friend.username"
              class="w-12 h-12 rounded-full object-cover"
            />
            <div class="flex-1">
              <router-link 
                :to="'/profile/' + friend.id"
                class="font-medium text-gray-900 hover:text-blue-600"
              >
                {{ friend.username }}
              </router-link>
              <p class="text-sm text-gray-500">{{ friend.email }}</p>
            </div>
          </div>
        </div>

        <div v-else class="text-center py-12 text-gray-500">
          <p class="text-lg">No friends yet</p>
        </div>
      </div>

      <!-- Friend Requests Section -->
      <div class="mt-8 bg-white rounded-xl shadow-lg p-6">
        <h2 class="text-2xl font-bold text-gray-900 mb-6">Friend Requests</h2>
        
        <div v-if="friendRequests.length > 0" class="space-y-4">
          <div v-for="request in friendRequests" :key="request.id" class="flex items-center justify-between p-4 rounded-lg border hover:bg-gray-50 transition-colors">
            <div class="flex items-center space-x-4">
              <img 
                :src="request.photoUrl || '/default-avatar.png'" 
                :alt="request.username"
                class="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <router-link 
                  :to="'/profile/' + request.id"
                  class="font-medium text-gray-900 hover:text-blue-600"
                >
                  {{ request.username }}
                </router-link>
                <p class="text-sm text-gray-500">{{ request.email }}</p>
              </div>
            </div>
            <button 
              @click="acceptFriendRequest(request)"
              class="px-4 py-2 bg-green-600 text-white rounded-md"
            >
              Accept
            </button>
            <button 
              @click="declineFriendRequest(request)"
              class="px-4 py-2 bg-red-600 text-white rounded-md"
            >
              Decline
            </button>
          </div>
        </div>
        
        <div v-else class="text-center py-12 text-gray-500">
          <p class="text-lg">No friend requests</p>
        </div>
      </div>
    </div>

    <!-- Remove Friend Modal -->
    <div v-if="showRemoveFriendModal" class="fixed inset-0 bg-black bg-opacity-25 flex items-center justify-center">
      <div class="bg-white rounded-lg p-6 shadow-xl">
        <h3 class="text-lg font-medium leading-6 text-gray-900">Remove Friend</h3>
        <p class="text-sm text-gray-500 mt-2">
          Are you sure you want to remove {{ user.username }} from your friends list?
        </p>

        <div class="mt-4 flex space-x-3">
          <button
            type="button"
            class="inline-flex justify-center rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
            @click="removeFriend"
          >
            Remove
          </button>
          <button
            type="button"
            class="inline-flex justify-center rounded-md bg-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-400"
            @click="showRemoveFriendModal = false"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRoute } from 'vue-router';

export default {
  setup() {
    const route = useRoute();
    const user = ref({});
    const isLoading = ref(true);
    const errorMessage = ref('');
    const isFriend = ref(false);
    const requestSent = ref(false);
    const requestReceived = ref(false);
    const friendRequests = ref([]);
    const showRemoveFriendModal = ref(false);
    const currentUserId = ref(localStorage.getItem('userId'));
    const sentRequests = ref([]);
    const friends = ref([]);

    const fetchUserProfile = async () => {
      try {
        const userId = route.params.id;
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:8081/api/users/userprofile/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        
        user.value = response.data;
        await fetchFriends();
        await checkFriendStatus();
        await fetchFriendRequests();
        await fetchSentRequests();
      } catch (error) {
        errorMessage.value = error.response?.data?.message || 'Error fetching profile';
      } finally {
        isLoading.value = false;
      }
    };

    const fetchFriends = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/api/friends/list/${user.value.id}`);
        friends.value = response.data;
      } catch (error) {
        console.error('Error fetching friends:', error);
      }
    };

    const checkFriendStatus = async () => {
      try {
        const userId = currentUserId.value;
        const friendsList = await axios.get(`http://localhost:8081/api/friends/list/${userId}`);
        const sentRequestsList = await axios.get(`http://localhost:8081/api/friends/requests/sent/${userId}`);
        const receivedRequestsList = await axios.get(`http://localhost:8081/api/friends/requests/received/${userId}`);

        isFriend.value = friendsList.data.some(friend => friend.id === user.value.id);
        requestSent.value = sentRequestsList.data.some(request => request.id === user.value.id);
        requestReceived.value = receivedRequestsList.data.some(request => request.id === user.value.id);
      } catch (error) {
        console.error('Error checking friend status:', error);
      }
    };

    const fetchFriendRequests = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8081/api/friends/requests/received/${currentUserId.value}`
        );
        friendRequests.value = response.data;
      } catch (error) {
        console.error('Error fetching friend requests:', error);
      }
    };

    const sendFriendRequest = async () => {
      try {
        const response = await axios.post('http://localhost:8081/api/friends/send', null, {
          params: {
            senderId: currentUserId.value,
            receiverId: user.value.id,
          },
        });
        if (response.data.success) {
          requestSent.value = true;
          await fetchSentRequests();
        }
      } catch (error) {
        console.error('Error sending friend request:', error);
      }
    };

    const acceptFriendRequest = async (request) => {
      try {
        const response = await axios.post('http://localhost:8081/api/friends/accept', null, {
          params: {
            userId: currentUserId.value,
            senderId: request.id,
          },
        });
        if (response.data.success) {
          await fetchUserProfile();
        }
      } catch (error) {
        console.error('Error accepting friend request:', error);
      }
    };

    const declineFriendRequest = async (request) => {
      try {
        const response = await axios.post('http://localhost:8081/api/friends/decline', null, {
          params: {
            userId: currentUserId.value,
            senderId: request.id,
          },
        });
        if (response.data.success) {
          await fetchFriendRequests();
        }
      } catch (error) {
        console.error('Error declining friend request:', error);
      }
    };

    const cancelRequest = async (receiverId) => {
      try {
        const response = await axios.post('http://localhost:8081/api/friends/cancel', null, {
          params: {
            senderId: currentUserId.value,
            receiverId: receiverId,
          },
        });
        if (response.data.success) {
          await fetchSentRequests();
          requestSent.value = false;
        }
      } catch (error) {
        console.error('Error canceling friend request:', error);
      }
    };

    const fetchSentRequests = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8081/api/friends/requests/sent/${currentUserId.value}`
        );
        sentRequests.value = response.data;
      } catch (error) {
        console.error('Error fetching sent requests:', error);
      }
    };

    const removeFriend = async () => {
      try {
        const response = await axios.post('http://localhost:8081/api/friends/remove', null, {
          params: {
            userId: currentUserId.value,
            friendId: user.value.id,
          },
        });
        if (response.data.success) {
          showRemoveFriendModal.value = false;
          isFriend.value = false;
          await fetchFriends();
        }
      } catch (error) {
        console.error('Error removing friend:', error);
      }
    };

    onMounted(() => {
      fetchUserProfile();
    });

    return {
      user,
      isLoading,
      errorMessage,
      isFriend,
      requestSent,
      requestReceived,
      friendRequests,
      showRemoveFriendModal,
      currentUserId,
      sentRequests,
      friends,
      sendFriendRequest,
      acceptFriendRequest,
      declineFriendRequest,
      cancelRequest,
      removeFriend,
    };
  },
};
</script>
<style>
</style>