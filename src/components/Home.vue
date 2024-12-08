<template>
  
  <div class="min-h-screen bg-gray-100 flex">
  <!-- Left Sidebar Navigation -->
  <div class="w-72 bg-white shadow-lg h-screen overflow-y-auto p-6 hidden md:block">
    <div class="mb-8">
      <h1 class="text-2xl font-bold text-gray-800 mb-6 flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 mr-2 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
        SocialHub
      </h1>
      
      <nav class="space-y-4">
        <!-- Pages Section -->
        <div class="space-y-2">
          <h3 class="text-sm font-semibold text-gray-600">Pages</h3>
          <div class="space-y-2">
            <div class="flex items-center space-x-4 px-4 py-3 rounded-lg hover:bg-blue-50 transition-colors cursor-pointer group">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-gray-500 group-hover:text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 12l5-5 5 5" />
              </svg>
              <span class="text-gray-800 font-medium group-hover:text-blue-600">Home</span>
            </div>
            <div class="flex items-center space-x-4 px-4 py-3 rounded-lg hover:bg-blue-50 transition-colors cursor-pointer group">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-gray-500 group-hover:text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 12l2 2 4-4M12 12l2 2 4-4M12 12l2 2 4-4M12 12l2 2 4-4" />
              </svg>
              <span class="text-gray-800 font-medium group-hover:text-blue-600">My Groups</span>
            </div>
          </div>
        </div>

        <!-- Messages Section -->
        <div class="space-y-2">
          <h3 class="text-sm font-semibold text-gray-600">Messages</h3>
          <div class="space-y-2">
            <div class="flex items-center space-x-4 px-4 py-3 rounded-lg hover:bg-blue-50 transition-colors cursor-pointer group">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-gray-500 group-hover:text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4h16M4 8h16M4 12h16M4 16h16" />
              </svg>
              <span class="text-gray-800 font-medium group-hover:text-blue-600">Inbox</span>
            </div>
            <div class="flex items-center space-x-4 px-4 py-3 rounded-lg hover:bg-blue-50 transition-colors cursor-pointer group">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-gray-500 group-hover:text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12c0 1.104-.896 2-2 2h-6V9h6c1.104 0 2 .896 2 2zM3 12c0-1.104.896-2 2-2h6v5H5c-1.104 0-2-.896-2-2z" />
              </svg>
              <span class="text-gray-800 font-medium group-hover:text-blue-600">Chats</span>
            </div>
          </div>
        </div>

        <!-- Groups Section -->
        <div class="space-y-2">
          <h3 class="text-sm font-semibold text-gray-600">Groups</h3>
          <div class="space-y-2">
            <div class="flex items-center space-x-4 px-4 py-3 rounded-lg hover:bg-blue-50 transition-colors cursor-pointer group">
              <span class="text-xl">👥</span>
              <span class="text-gray-800 font-medium group-hover:text-blue-600">Family</span>
            </div>
            <div class="flex items-center space-x-4 px-4 py-3 rounded-lg hover:bg-blue-50 transition-colors cursor-pointer group">
              <span class="text-xl">🎮</span>
              <span class="text-gray-800 font-medium group-hover:text-blue-600">Gaming</span>
            </div>
          </div>
        </div>
        
        <!-- Create New Group Button -->
        <div class="mt-4">
          <button class="w-full px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
            <span class="text-sm font-semibold">+ Create New Group</span>
          </button>
        </div>
      </nav>
    </div>
  </div>


    <div class="container mx-auto max-w-xl md:max-w-2xl lg:max-w-3xl px-4 py-6">
      <!-- Sticky Create Post Section -->
      <div 
        v-if="currentUser" 
        class="top-0 z-20 bg-white rounded-lg shadow-md mb-6 p-4 transition-all duration-300"
      >
        <div class="flex items-start space-x-4">
          <!-- User Avatar -->
          <img 
            :src="currentUser.photoUrl || currentUser.photo || '/default-avatar.png'" 
            alt="Profile Picture" 
            class="w-12 h-12 rounded-full object-cover ring-2 ring-blue-500/30">
            
        <div class="flex-grow">
         
            <textarea 
              v-model="newPostContent" 
              placeholder="What's on your mind?" 
              class="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 resize-none"
              rows="3"
              @focus="showPostOptions = true"
            ></textarea>
            
            <!-- Post Options -->
            <div 
              v-if="showPostOptions" 
              class="mt-4 space-y-4 md:space-y-0 md:flex md:justify-between md:items-center"
            >
            
              <!-- Media Upload Options -->
              <div class="flex space-x-4">
                <input 
                  type="file" 
                  ref="imageUpload" 
                  @change="handleImageUpload" 
                  accept="image/*" 
                  class="hidden"
                >
                <button 
                  @click="openImageUpload" 
                  class="flex items-center text-green-600 hover:bg-green-50 p-2 rounded-lg transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Photo/Video
                </button>
                

  <!-- Tag Friends Button -->
  <button 
  @click="openUserTagModal" 
  class="flex items-center text-blue-600 hover:bg-blue-50 p-2 rounded-lg transition-colors w-1/2"
>
  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
  Tag Friends
</button>

  
</div>

<!-- Tagged Users Display -->
<div v-if="taggedUsers.length > 0" class="mt-2 flex space-x-2">
  <span 
    v-for="user in taggedUsers" 
    :key="user.username" 
    class="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs flex items-center"
  >
    @{{ user.username }}
    <button 
      @click="toggleUserTag(user)" 
      class="ml-1 text-blue-500 hover:text-blue-700"
    >
      ×
    </button>
  </span>
</div>
 <!-- Category Dropdown -->
 <div class="relative w-1/2">
    <span> Category : </span>
  <select 
    v-model="selectedCategory"
    class="w-30 px-2 py-1 bg-white text-gray-700 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-sm shadow-sm hover:border-gray-400"
  >
    <option value="" disabled>Select Category</option>
    <option 
      v-for="category in categories" 
      :key="category" 
      :value="category"
      class="bg-white text-gray-700 hover:bg-blue-100"
    >
      {{ category }}
    </option>
  </select>

<!-- User Tag Modal -->
<div 
  v-if="showUserTagModal" 
  class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
>
  <div class="bg-white rounded-lg p-6 max-w-md w-full">
    <h3 class="text-lg font-semibold mb-4">Tag Friends</h3>
    <div class="space-y-2 max-h-64 overflow-y-auto">
      <div 
        v-for="user in availableUsers" 
        :key="user.username"
        @click="toggleUserTag(user)"
        class="flex items-center p-2 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors"
        :class="{'bg-blue-50': taggedUsers.some((u) => u.username === user.username)}"
      >
        <img 
          :src="getUserPhoto(user)" 
          class="w-10 h-10 rounded-full mr-3 object-cover"
        />
        <span class="flex-grow">{{ user.username }}</span>
        <svg 
          v-if="taggedUsers.some((u) => u.username === user.username)"
          xmlns="http://www.w3.org/2000/svg" 
          class="h-6 w-6 text-blue-500" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>
    </div>
    <div class="mt-4 flex justify-end space-x-2">
      <button 
        @click="showUserTagModal = false" 
        class="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg"
      >
        Cancel
      </button>
      <button 
        @click="showUserTagModal = false" 
        class="px-4 py-2 bg-blue-500 text-white rounded-lg"
      >
        Done
      </button>
    </div>
  </div>
</div>

              </div>
              <button
      v-if="isEditingPost"
      @click="cancel()"
      class="w-full md:w-auto bg-gray-400 text-white px-6 py-2 rounded-lg hover:bg-gray-500 transition-colors"
    >
      Cancel
    </button>
              
<button 
  @click="isEditingPost ? confirmEditPost() : createPost()"
  :disabled="!newPostContent.trim() && !selectedImageFile"
  class="w-full md:w-auto bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
>
  {{ isEditingPost ? 'Update Post' : 'Post' }}
</button>
            </div>
            
            <!-- Image Preview -->
            <div v-if="selectedImageFile" class="mt-4 relative">
              <img 
                :src="imagePreviewUrl" 
                alt="Image Preview" 
                class="w-full h-48 object-cover rounded-lg"
              >
              <button 
                @click="clearImageUpload"
                class="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="bg-white rounded-lg shadow-md p-6 text-center">
        <p class="text-gray-700 mb-4">Please log in to create a post</p>
        <button 
          @click="redirectToLogin" 
          class="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Login
        </button>
      </div>

      <!-- Infinite Scroll Posts Feed -->
      <div 
        ref="postFeed"
        class="space-y-6"
        @scroll="handleScroll"
      >
        <transition-group name="fade">
          <div 
            v-for="post in posts" 
            :key="post.id" 
            class="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300"
          >
            <!-- Post Header -->
            <div class="flex items-center p-4 border-b border-gray-100">
              <img 
              :src="post.user.photoUrl || post.user.photo || require('@/assets/user.png')"
              class="w-10 h-10 rounded-full mr-3 object-cover ring-2 ring-blue-500/30"/>
              <div>
                <h3 class="font-semibold text-gray-800"> {{ formatUsername(post.user) }}  </h3> 
                
                <p class="text-xs text-gray-500">
                  {{ formatPostTime(post.createdAt) }}
                </p>
              </div>
              <div v-if="post.taggedUsers && post.taggedUsers.length > 0" class="text-xs text-gray-500 mb-2">
                Tagged: 
                <span 
                  v-for="user in post.taggedUsers" 
                  :key="user.username" 
                  class="text-blue-600 mr-2"
                >
                  @{{ user.username }}
                </span>
              </div>
                <div v-if="post.category" class="text-xs text-gray-500 mb-2 pl-10">
                <span class="bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                {{ post.category }}
              </span>
              </div>
              <button 
                @click="openPostOptions(post)" 
                class="ml-auto text-gray-500 hover:bg-gray-100 p-2 rounded-full transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                </svg>
              </button>
              
              <div 
  v-if=" currentUser.username == post.user.username &&showPostOptionsModal && editingPost" 
  class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-10"
> 
  <div class="bg-white rounded-lg p-6 max-w-sm w-full">
    <h3 class="text-lg font-semibold mb-4">Post Options</h3>
    <div class="space-y-4">
      <button 
        @click="editPost" 
        class="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
      >
        Edit Post
      </button>
      <button 
        @click="deletePost" 
        class="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition-colors"
      >
        Delete Post
      </button>
      <button 
        @click="showPostOptionsModal = false" 
        class="w-full bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300 transition-colors"
      >
        Cancel
      </button>
    </div>
  </div>
</div>
            </div>
              
            <!-- Post Content -->
            <div class="p-4">
              <p 
  class="text-gray-800 mb-3 leading-relaxed text-left"
  v-html="highlightHashtags(post.content)"
></p>
              <img 
  v-if="post.imageUrl" 
  :src="post.imageUrl" 
  class="w-full h-auto object-cover rounded-lg cursor-pointer"
  @click="openFullImage(post.imageUrl)"
>
            </div>

            <!-- Post Interactions -->
            <div class="flex justify-around p-3 border-t text-gray-600">
              <button 
                @click="likePost(post)" 
                class="flex items-center hover:bg-gray-100 px-4 py-2 rounded-lg transition-colors"
                :class="{'text-blue-500': post.liked}"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11H4v5h2.5l1.385 3.785A2 2 0 009.326 21h6.434c1.132 0 2.037-.892 2.096-2.021l.208-4.06c.034-.659-.236-1.293-.692-1.732L14 10z" />
                </svg>
                {{ post.likeCount }} Likes
              </button>

              <button 
                @click="post && openComments(post)" 
                class="flex items-center hover:bg-gray-100 px-4 py-2 rounded-lg transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.963C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                {{ post.commentCount }} Comments
              </button>
          
              <button 
                @click="sharePost(post)" 
                class="flex items-center hover:bg-gray-100 px-4 py-2 rounded-lg transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
                {{ post.shareCount }} Shares
              </button>
              
            </div>
            <div 
  v-if="expandedCommentsPosts.includes(post.id)" 
  class="border-t p-4 bg-gray-50"
>

  <!-- Comments List -->
  <div v-if="post.comments && Array.isArray(post.comments) && post.comments.length > 0" 
    class="space-y-3 max-h-60 overflow-y-auto mb-4">
    <div v-for="comment in post.comments" :key="comment.id" class="flex items-start space-x-3">
  <img :src="getUserPhoto(comment.user)" class="w-8 h-8 rounded-full object-cover"/>
  <div>
    <div class="bg-white p-2 rounded-lg shadow-sm">
      <p class="text-sm font-semibold">{{ comment.user ? comment.user.username : 'Unknown User' }}</p>
      <p class="text-gray-800">{{ comment.content }}</p>
    </div>
    <p class="text-xs text-gray-500 mt-1">
      {{ formatCommentTime(comment.createdAt) }}
    </p>
  </div>
</div>
  </div>

  <!-- No Comments Message -->
  <p v-else-if="post.comments && post.comments.length === 0" class="text-gray-500 text-sm text-center">
  No comments yet
</p>
<br>


  <!-- Comment Input -->
  <div class="flex items-center space-x-3">
    <img 
      :src="getUserPhoto(currentUser)" 
      class="w-10 h-10 rounded-full object-cover"
    />
    <div class="flex-grow">
      <input 
        v-model="commentInputs[post.id]"
        @keyup.enter="addComment(post)"
        placeholder="Write a comment..." 
        class="w-full p-2 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
    <button 
      @click="addComment(post)"
      :disabled="!commentInputs[post.id]"
      class="text-blue-500 hover:bg-blue-50 p-2 rounded-full disabled:opacity-50"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
      </svg>
    </button>
  </div>
</div>
          </div>

        </transition-group>

        <!-- Loading Indicator -->
        <div v-if="loading" class="flex justify-center items-center py-6">
          <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>

        <!-- No More Posts Message -->
        <div v-if="!loading && noMorePosts" class="text-center text-gray-500 py-6">
          No more posts to load
        </div>
      </div>
    </div>

    <!-- Full Image Modal -->
    <div 
      v-if="fullImageUrl" 
      @click="closeFullImage"
      class="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center cursor-zoom-out"
    >
      <img 
        :src="fullImageUrl" 
        class="max-w-full max-h-full object-contain"
      />
    </div>
  </div>
</template>
<script>import axios from 'axios';
export default {
  name: 'HomePage',
  data() {
    return {
      posts: [],
      newPostContent: '',
      showPostOptions: false,
      showPostOptionsModal: false,
       editingPost: null,
       isEditingPost: false,
      currentUser: null,
      selectedImageFile: null,
      imagePreviewUrl: null,
      fullImageUrl: null,
      page: 0,
      loading: false,
      noMorePosts: false,
      expandedCommentsPosts: [],
      commentInputs: {},
      categories: [
        'Sports', 
        'Music', 
        'Study', 
        'Fun', 
        'Technology', 
        'Food', 
        'Travel', 
        'Fitness'
      ],
      selectedCategory: null,
      availableUsers: [],
      taggedUsers: [],
      showUserTagModal: false,

      postOptionsModal: null,
      backendUrl: process.env.VUE_APP_BACKEND_URL,
    }
  },
  mounted() {
    this.initializePage();
  },
  computed: {
    // Computed property to highlight hashtags
    highlightHashtags() {
      return (text) => {
        const regex = /#(\w+)/g;
        return text.replace(regex, (match) => {
          return `<span class="text-blue-600 font-bold">${match}</span>`;
        });
      };
    },
  },
  methods: {
    async initializePage() {
      try {
        await this.fetchCurrentUser();
        await this.fetchPosts();
        window.addEventListener('scroll', this.handleScroll);
      } catch (error) {
        console.error('Initialization error:', error);
        this.logout();
      }
    },
    async fetchAvailableUsers() {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${this.backendUrl}/api/users/all`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    // Filter out the current user
    this.availableUsers = response.data.filter(
      (user) => user.username !== this.currentUser.username
    );

    console.log('Available users:', this.availableUsers); // Debugging log
  } catch (error) {
    console.error('Error fetching available users:', error);
  }
},
openUserTagModal() {
    this.fetchAvailableUsers(); // Fetch users dynamically
    this.showUserTagModal = true; // Show the modal
  },
  toggleUserTag(user) {
  const index = this.taggedUsers.findIndex((u) => u.username === user.username);
  if (index > -1) {
    // Remove the user if already tagged
    this.taggedUsers.splice(index, 1);
  } else {
    // Add the user if not tagged
    this.taggedUsers.push(user);
  }
  console.log('Tagged users:', this.taggedUsers); // Debugging log
},

    async fetchCurrentUser() {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          this.$router.push('/login');
          return;
        }

        const response = await axios.get('http://localhost:8081/api/auth/verify-token', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        let photoData = null;
        if (!response.data.googleUser) {
          try {
            const photoResponse = await axios.get('http://localhost:8081/api/users/photo', {
              headers: {
                'Authorization': `Bearer ${token}`
              }
            });
            photoData = photoResponse.data.photo ? `data:image/jpeg;base64,${photoResponse.data.photo}` : null;
          } catch (error) {
            console.error('Error fetching photo:', error);
          }
        }

        this.currentUser = {
          username: response.data.username,
          email: response.data.email,
          role: response.data.role,
          verified: response.data.verified,
          enabled: response.data.enabled,
          photo: photoData,
          photoUrl: response.data.googleUser ? response.data.photoUrl : null,
          isGoogleUser: response.data.googleUser,
        };
      } catch (error) {
        console.error('Error fetching user data:', error);
        this.logout();
      }
    },

async fetchPosts() {
  if (this.loading || this.noMorePosts) return;

  this.loading = true;
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      this.$router.push('/login');
      return;
    }

    const response = await axios.get('http://localhost:8081/api/posts/all', {
      headers: {
        'Authorization': `Bearer ${token}`
      },
      params: {
        page: this.page,
        size: 10
      }
    });
    const postsData = Array.isArray(response.data) ? response.data : [];
    const fetchUserPhoto = async (user) => {
      if (user.photoUrl) return user.photoUrl;
      
      try {
        const photoResponse = await axios.get(`http://localhost:8081/api/users/photo/${user.username}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        return photoResponse.data.photo 
          ? `data:image/jpeg;base64,${photoResponse.data.photo}` 
          : '/default-avatar.png';
      } catch (error) {
        console.error(`Error fetching photo for user ${user.username}:`, error);
        return '/default-avatar.png';
      }
    };

    const fetchComments = async (postId) => {
      try {
        const response = await axios.get(`http://localhost:8081/api/posts/${postId}/comments`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        return response.data || [];
      } catch (error) {
        console.error(`Error fetching comments for post ${postId}:`, error);
        return [];
      }
    };

    const newPosts = await Promise.all(postsData.map(async (post) => {
      const photoUrl = await fetchUserPhoto(post.user);
      const comments = await fetchComments(post.id);
      return {
        ...post,
        imageUrl: post.imageUrl ? `http://localhost:8081/uploads/${post.imageUrl}` : null,
        user: {
          ...post.user,
          photoUrl: photoUrl
        },
        liked: false,
        likeCount: post.likeCount || 0,
        commentCount: post.commentCount || 0,
        comments: comments,
        shareCount: post.shareCount || 0
      };
    }));

    if (newPosts.length === 0) {
      this.noMorePosts = true;
    } else {
      this.posts = [...this.posts, ...newPosts];
      this.page++;
    }
  } catch (error) {
    console.error('Error fetching posts:', error.response ? error.response.data : error);
    if (error.response && error.response.status === 401) {
      this.logout();
    }
  } finally {
    this.loading = false;
  }
},
async likePost(post) {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post(`http://localhost:8081/api/posts/${post.id}/like`, {}, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    const index = this.posts.findIndex(p => p.id === post.id);
    if (index !== -1) {
      this.posts[index].liked = response.data.liked;
      this.posts[index].likeCount = response.data.likeCount;
    }
  } catch (error) {
    console.error('Error liking post:', error);
  }
},

async openComments(post) {
  const postIndex = this.expandedCommentsPosts.indexOf(post.id);
  if (postIndex > -1) {
    this.expandedCommentsPosts.splice(postIndex, 1);
  } else {
    this.expandedCommentsPosts.push(post.id);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://localhost:8081/api/posts/${post.id}/comments`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      // Ensure comments are correctly set
      this.$set(post, 'comments', Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  }
},
    async addComment(post) {
  const commentText = this.commentInputs[post.id];
  if (!commentText || !commentText.trim()) return;

  try {
    const token = localStorage.getItem('token');
    const response = await axios.post(
      `http://localhost:8081/api/posts/${post.id}/comment`, 
      { content: commentText },
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );

    // Find the post and update its comments
    const postIndex = this.posts.findIndex(p => p.id === post.id);
    if (postIndex !== -1) {
      // Ensure comments array exists
      if (!this.posts[postIndex].comments) {
        this.$set(this.posts[postIndex], 'comments', []);
      }
      
      // Add new comment with current user's details
      this.posts[postIndex].comments.push({
        ...response.data,
        user: {
          username: this.currentUser.username,
          photoUrl: this.getUserPhoto(this.currentUser)
        }
      });
      
      // Increment comment count
      this.posts[postIndex].commentCount++;
      
      // Clear the comment input
      this.$set(this.commentInputs, post.id, ''),
      this.fetchComments()
    }
  } catch (error) {
    console.error('Error adding comment:', error);
  }
},

formatCommentTime(timestamp) {
  const date = new Date(timestamp);
  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);
  
  if (diffInSeconds < 60) return 'Just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  
  // For dates older than a day, show full date
  return date.toLocaleDateString();
},
openPostOptions(post) {
    this.editingPost = post;
    // Create a modal or dropdown for edit/delete options
    this.showPostOptionsModal = true;
  },
  editPost() {
  // Prefill the create post form with existing post data
  this.newPostContent = this.editingPost.content;
  this.selectedImageFile = this.editingPost.imageUrl;
  this.imagePreviewUrl = this.editingPost.imageUrl;
  this.isEditingPost = true;
  this.showPostOptionsModal = false;
  this.showPostOptions = true;
},

clearImageUpload() {
  this.selectedImageFile = null;
  this.imagePreviewUrl = null;
  if (this.$refs.imageUpload) {
    this.$refs.imageUpload.value = '';
  }
},
async confirmEditPost() {
  try {
    const formData = new FormData();
    formData.append('content', this.newPostContent);

    // If selectedImageFile exists, add it
    if (this.selectedImageFile && this.imagePreviewUrl) {
      console.log('Adding image file...');
      formData.append('image', this.selectedImageFile);
    } 
    // If no image file and no preview, explicitly indicate no image
    else if (!this.imagePreviewUrl && !this.selectedImageFile) {
      console.log('No image selected, signaling deletion...');
      formData.append('image', this.selectedImageFile);  // Signal backend to delete the image
    }

    const response = await axios.put(`http://localhost:8081/api/posts/edit/${this.editingPost.id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });

    // Update the post in the posts array
    const index = this.posts.findIndex(p => p.id === this.editingPost.id);
    if (index !== -1) {
      this.posts[index] = {
        ...this.posts[index],
        content: response.data.content,
        imageUrl: response.data.imageUrl 
          ? `http://localhost:8081/uploads/${response.data.imageUrl}` 
          : null
      };
    }

    // Reset form
    this.newPostContent = '';
    this.selectedImageFile = null;
    this.imagePreviewUrl = null;
    this.isEditingPost = false;
    this.showPostOptions = false;
  } catch (error) {
    console.error('Error editing post:', error);
  }
},
  async deletePost() {
    try {
      await axios.delete(`http://localhost:8081/api/posts/delete/${this.editingPost.id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      // Remove the post from the posts array
      this.posts = this.posts.filter(p => p.id !== this.editingPost.id);
      this.showPostOptionsModal = false;
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  },

    sharePost(post) {
      // Implement share functionality
      // This could open a share modal or copy a link to clipboard
      console.log('Share post:', post);
    },

    openFullImage(imageUrl) {
      this.fullImageUrl = imageUrl;
    },

    closeFullImage() {
      this.fullImageUrl = null;
    },

    handleScroll() {
      const scrollThreshold = 200;
      const bottomOfWindow = document.documentElement.scrollTop + window.innerHeight;
      const totalHeight = document.documentElement.scrollHeight;

      if (bottomOfWindow >= totalHeight - scrollThreshold) {
        this.fetchPosts();
      }
    },

    openImageUpload() {
      this.$refs.imageUpload.click();
    },

    handleImageUpload(event) {
      const file = event.target.files[0];
      if (file) {
        this.selectedImageFile = file;
        const reader = new FileReader();
        reader.onload = (e) => {
          this.imagePreviewUrl = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    },


    async createPost() {
  try {
    // Fetch all users and populate taggedUsers except currentUser
    await this.fetchAvailableUsers();
    
    const formData = new FormData();
    formData.append('content', this.newPostContent);

    // Add tagged users
    if (this.taggedUsers.length > 0) {
      formData.append(
        'taggedUsers',
        JSON.stringify(this.taggedUsers.map((user) => user.username))
      );
    }

    // Add category if selected
    if (this.selectedCategory) {
      formData.append('category', this.selectedCategory);
      console.log(this.selectedCategory);
    }

    // Add image if selected
    if (this.selectedImageFile) {
      formData.append('image', this.selectedImageFile);
    }

    const response = await axios.post(`${this.backendUrl}/api/posts/create`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    // Add new post to posts list
    const newPost = {
      ...response.data,
      user: {
        ...this.currentUser,
        photoUrl: this.getUserPhoto(this.currentUser),
      },
      taggedUsers: this.taggedUsers,
      liked: false,
      likeCount: 0,
      commentCount: 0,
      shareCount: 0,
      category:this.selectedCategory

    };

    this.posts.unshift(newPost);

    // Reset form state
    this.newPostContent = '';
    this.selectedCategory = null;
    this.taggedUsers = [];
    this.showPostOptions = false;
    this.clearImageUpload();
  } catch (error) {
    console.error('Error creating post:', error);
  }
},
    redirectToLogin() {
      this.$router.push('/login');
    },

    formatUsername(user) {
      return user && user.username ? user.username : 'Anonymous User';
    },

    formatPostTime(timestamp) {
      const date = new Date(timestamp);
      const now = new Date();
      const diffInSeconds = Math.floor((now - date) / 1000);

      if (diffInSeconds < 60) return 'Just now';
      if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
      if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
      return date.toLocaleDateString();
    },
 cancel() {
      // Reset editing state
      this.isEditingPost = false
      
      // Clear post content
      this.newPostContent = ''
      this.selectedImageFile = null
      
      // Optional: Additional cleanup or navigation
      // this.$emit('cancel-editing')
    },
    getUserPhoto(user) {
      if (!user) return '/default-avatar.png';

      if (user.photoUrl) return user.photoUrl;

      if (typeof user.photo === 'string') {
        if (user.photo.startsWith('data:image')) {
          return user.photo;
        } else if (user.photo) {
          return `data:image/jpeg;base64,${user.photo}`;
        }
      }

      return '/default-avatar.png';
    },

    logout() {
      localStorage.removeItem('token');
      this.$router.push('/login');
    }
  }
}
</script>


<style scoped>
/* Fade transition for posts */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

/* Hover effects */
.post-item {
  transition: all 0.4s ease;
}
.post-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0,0,0,0.1);
}

/* Responsive adjustments */
@media (max-width: 640px) {
  .container {
    padding-left: 0.5rem;
    padding-right: 0.5rem;
  }
}
.text-blue-600 {
  color: #2563eb;
}

.font-bold {
  font-weight: 700;
}
</style>