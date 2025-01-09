<template>
  <div class="min-h-screen flex top-0 left-0 w-full mt-2">
    <div
    v-if="visible"
    class="toast-notification fixed bottom-5 left-1/2 transform -translate-x-1/2 p-4 bg-green-500 text-white rounded-lg shadow-md transition-all duration-300"
    :style="{ opacity: opacity, transition: 'opacity 0.3s ease-in-out' }"
  >
    {{ message }}
  </div>
  
  <!-- Left Sidebar Navigation -->
  <div class="w-80 h-screen sticky top-0 right-0 overflow-y-auto ">
    <div class="p-0">
      <!-- User Profile Section -->
 <!-- User Profile Section -->
            <div v-if="currentUser" class="flex items-center space-x-4">
                 <!-- User Avatar -->
                 <img 
                    :src="currentUser.photoUrl || currentUser.photo || '/default-avatar.png'" 
                    alt="Profile Picture" 
                    class="w-12 h-12 rounded-full object-cover">
                 <!-- User Name -->
                 <h3 class="text-gray-800 font-semibold text-lg">{{ currentUser.username }}</h3>
              </div>
<br><br>
      <!-- Navigation Links -->
      <nav class="space-y-4">
        <!-- Friends -->
        <a href="#" class="flex items-center px-4 py-2 hover:bg-gray-200 rounded-lg transition">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
          </svg>
          <span class="ml-4 text-gray-800 font-medium">Friends</span>
        </a>

        <!-- Memories -->
        <a href="#" class="flex items-center px-4 py-2 hover:bg-gray-200 rounded-lg transition">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-green-500" fill="currentColor" viewBox="0 0 24 24">
            <path d="M13 7H7v6h6V7z" />
            <path fill-rule="evenodd" clip-rule="evenodd" d="M5 2a3 3 0 00-3 3v14a3 3 0 003 3h14a3 3 0 003-3V5a3 3 0 00-3-3H5zm0 2h14a1 1 0 011 1v14a1 1 0 01-1 1H5a1 1 0 01-1-1V5a1 1 0 011-1z" />
          </svg>
          <span class="ml-4 text-gray-800 font-medium">Memories</span>
        </a>

        <!-- Saved -->
        <a href="#" class="flex items-center px-4 py-2 hover:bg-gray-200 rounded-lg transition">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-pink-500" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 21l-7-5-7 5V5c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2v16z" />
          </svg>
          <span class="ml-4 text-gray-800 font-medium">Saved</span>
        </a>

        <!-- Groups -->
        <a href="#" class="flex items-center px-4 py-2 hover:bg-gray-200 rounded-lg transition">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-purple-500" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
          </svg>
          <span class="ml-4 text-gray-800 font-medium">Groups</span>
        </a>

        <!-- Marketplace -->
        <a href="#" class="flex items-center px-4 py-2 hover:bg-gray-200 rounded-lg transition">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1s-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm4 16H7v-2h10v2zm0-4H7v-2h10v2zm0-4H7V9h10v2z" />
          </svg>
          <span class="ml-4 text-gray-800 font-medium">Marketplace</span>
        </a>

        <!-- Feeds -->
        <a href="#" class="flex items-center px-4 py-2 hover:bg-gray-200 rounded-lg transition">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-orange-500" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1s-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm4 16H7v-2h10v2zm0-4H7v-2h10v2zm0-4H7V9h10v2z" />
          </svg>
          <span class="ml-4 text-gray-800 font-medium">Feeds</span>
        </a>
      

        <!-- See More -->
        <a href="#" class="flex items-center px-4 py-2 hover:bg-gray-200 rounded-lg transition">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
          <span class="ml-4 text-gray-800 font-medium">See More</span>
        </a>
      </nav>
    </div>
  </div>

     <div class="container max-w-l md:max-w-2xl lg:max-w-3xl ml-20">
        <!-- Sticky Create Post Section -->
        <div 
           v-if="currentUser" 
           class="top-0 right-50 z-20 bg-white rounded-lg shadow-md mb-6 p-4 transition-all duration-300"
           >
           <div class="flex items-start space-x-4">
              <!-- User Avatar -->
              <img 
                 :src="currentUser.photoUrl || currentUser.photo || '/default-avatar.png'" 
                 alt="Profile Picture" 
                 class="w-12 h-12 rounded-full object-cover ring-2 ring-blue-500/30">
                 <div class="flex-grow relative">
    <textarea
      v-model="newPostContent"
      placeholder="What's on your mind?"
      class="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 resize-none"
      rows="3"
      @focus="showPostOptions = true"
    ></textarea>
    
    <!-- Premium AI Button -->
    <button v-if="showPostOptions"
      @click="enhanceText"
      :disabled="isEnhancing || !newPostContent.trim()"
      class="button"
    >
      <div class="dots_border"></div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        class="sparkle"
      >
        <path
          class="path"
          stroke-linejoin="round"
          stroke-linecap="round"
          stroke="black"
          fill="black"
          d="M14.187 8.096L15 5.25L15.813 8.096C16.0231 8.83114 16.4171 9.50062 16.9577 10.0413C17.4984 10.5819 18.1679 10.9759 18.903 11.186L21.75 12L18.904 12.813C18.1689 13.0231 17.4994 13.4171 16.9587 13.9577C16.4181 14.4984 16.0241 15.1679 15.814 15.903L15 18.75L14.187 15.904C13.9769 15.1689 13.5829 14.4994 13.0423 13.9587C12.5016 13.4181 11.8321 13.0241 11.097 12.814L8.25 12L11.096 11.187C11.8311 10.9769 12.5006 10.5829 13.0413 10.0423C13.5819 9.50162 13.9759 8.83214 14.186 8.097L14.187 8.096Z"
        ></path>
        <path
          class="path"
          stroke-linejoin="round"
          stroke-linecap="round"
          stroke="black"
          fill="black"
          d="M6 14.25L5.741 15.285C5.59267 15.8785 5.28579 16.4206 4.85319 16.8532C4.42059 17.2858 3.87853 17.5927 3.285 17.741L2.25 18L3.285 18.259C3.87853 18.4073 4.42059 18.7142 4.85319 19.1468C5.28579 19.5794 5.59267 20.1215 5.741 20.715L6 21.75L6.259 20.715C6.40725 20.1216 6.71398 19.5796 7.14639 19.147C7.5788 18.7144 8.12065 18.4075 8.714 18.259L9.75 18L8.714 17.741C8.12065 17.5925 7.5788 17.2856 7.14639 16.853C6.71398 16.4204 6.40725 15.8784 6.259 15.285L6 14.25Z"
        ></path>
        <path
          class="path"
          stroke-linejoin="round"
          stroke-linecap="round"
          stroke="black"
          fill="black"
          d="M6.5 4L6.303 4.5915C6.24777 4.75718 6.15472 4.90774 6.03123 5.03123C5.90774 5.15472 5.75718 5.24777 5.5915 5.303L5 5.5L5.5915 5.697C5.75718 5.75223 5.90774 5.84528 6.03123 5.96877C6.15472 6.09226 6.24777 6.24282 6.303 6.4085L6.5 7L6.697 6.4085C6.75223 6.24282 6.84528 6.09226 6.96877 5.96877C7.09226 5.84528 7.24282 5.75223 7.4085 5.697L8 5.5L7.4085 5.303C7.24282 5.24777 7.09226 5.15472 6.96877 5.03123C6.84528 4.90774 6.75223 4.75718 6.697 4.5915L6.5 4Z"
        ></path>
      </svg>
    </button>


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
                 <!-- Post Options -->
                 <div 
                    v-if="showPostOptions" 
                    class="mt-4 space-y-4 md:space-y-0 md:flex md:justify-between md:items-center"
                    >
                    <div class="flex space-x-4">
                       <input 
                          type="file" 
                          ref="mediaUpload"
                          @change="handleFileChange"
                          accept="image/*,video/*" 
                          multiple 
                          class="hidden"
                          >
                       <button 
                          @click="openMediaUpload" 
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
                    <!-- Category Dropdown -->
                    <div class="relative w-1/2">
                       <span> Category : </span>
                       <select 
                          v-model="selectedCategory"
                          class="w-20 px-2 py-1 bg-white text-gray-700 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-sm shadow-sm hover:border-gray-400"
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
                    </div>
                    <!-- User Tag Modal -->
                    <div 
                       v-if="showUserTagModal" 
                       class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 "
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
                                   :src="user.photoUrl || user.photo" 
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
                                class="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg "
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
                    <div class="container mx-auto p-4">
                       <!-- Poll Creation Button -->
                       <div class="flex justify-center">
                          <button 
                             @click="showPollModal = true" 
                             class="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-all duration-300 transform hover:scale-105"
                             >
                          Poll
                          </button>
                       </div>
<!-- Poll Modal -->
<div 
  v-if="showPollModal" 
  class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
>
  <div class="bg-white rounded-lg p-6 w-full max-w-md shadow-xl transform transition-all duration-300">
    <!-- Header -->
    <h3 class="text-xl font-semibold mb-4 text-gray-800">Create a Poll</h3>

    <!-- Poll Name Input -->
    <div class="mb-4">
      <label for="pollName" class="block text-sm font-medium text-gray-700 mb-1">Poll Name</label>
      <input 
        v-model="pollName" 
        id="pollName" 
        type="text" 
        placeholder="Enter question..." 
        class="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
    </div>

    <!-- Poll Options -->
    <div class="mb-4">
      <label class="block text-sm font-medium text-gray-700 mb-2">Options</label>
      <div v-for="(option, index) in pollOptions" :key="index" class="group relative mb-2">
        <div class="flex items-center gap-2">
          <div class="flex-shrink-0 w-6 h-6 bg-gray-50 rounded flex items-center justify-center text-gray-500 text-sm">
            {{index + 1}}
          </div>
          <input 
            v-model="pollOptions[index]" 
            type="text" 
            :placeholder="`Option ${index + 1}`"
            class="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button 
            v-if="pollOptions.length > 2" 
            @click="removeOption(index)" 
            class="opacity-0 group-hover:opacity-100 transition-opacity w-6 h-6 flex items-center justify-center text-red-500 rounded hover:bg-red-50"
          >
            ×
          </button>
        </div>
      </div>

      <!-- Add Option Button -->
      <button 
        @click="addOption" 
        class="w-full mt-2 py-2 px-3 text-sm border border-dashed border-gray-300 rounded-md text-gray-600 hover:border-blue-500 hover:text-blue-500 transition-all flex items-center justify-center gap-1"
      >
        <span>+</span>
        Add Option
      </button>
    </div>

    <!-- Footer Actions -->
    <div class="flex items-center justify-end gap-3 mt-6 pt-4 border-t border-gray-100">
      <button 
        @click="showPollModal = false" 
        class="px-4 py-2 text-sm bg-gray-50 text-gray-700 rounded-md hover:bg-gray-100 transition-all font-medium"
      >
        Cancel
      </button>
      <button 
        @click="submitPoll" 
        :disabled="!pollName || pollOptions.length < 2 || pollOptions.some(option => !option.trim())"
        class="px-4 py-2 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:hover:bg-blue-500 transition-all font-medium"
      >
        Create Poll
      </button>
    </div>
  </div>
</div>
                    </div>
                    <br>
                    <div class="flex space-x-4">
                       <button
                          @click="cancel()"
                          class="bg-red-500 text-white text-sm w-10 h-10 flex rounded-md items-center justify-center hover:bg-red-600 transition-colors"
                          >
                       ×
                       </button>
                       <button 
                          @click="isEditingPost ? confirmEditPost() : createPost()"
                          :disabled="!newPostContent.trim() && (selectedFiles.length == 0) && !pollName.trim() && pollOptions.some(option => !option.trim())"
                          class="w-full md:w-auto bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                          >
                       {{ isEditingPost ? 'Edit' : 'Post' }}
                       </button>
                    </div>
                 </div>
                 <!-- Poll Preview -->
                 <div v-if="showPollPreview" class="mt-4 bg-white rounded-lg p-4 border border-gray-200 max-w-xs ml-2 shadow-md">
                    <div class="flex justify-between items-center mb-3">
                       <h3 class="font-semibold text-gray-800 text-sm ">{{ pollName }}</h3>
                       <div class="flex items-center space-x-2">
                          <!-- Edit Button with Custom SVG -->
                          <button @click="showPollModal = true" class="text-blue-500 hover:text-blue-700 text-sm">
                             <!-- Custom SVG for Edit (Pen) -->
                             <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M21.2799 6.40005L11.7399 15.94C10.7899 16.89 7.96987 17.33 7.33987 16.7C6.70987 16.07 7.13987 13.25 8.08987 12.3L17.6399 2.75002C17.8754 2.49308 18.1605 2.28654 18.4781 2.14284C18.7956 1.99914 19.139 1.92124 19.4875 1.9139C19.8359 1.90657 20.1823 1.96991 20.5056 2.10012C20.8289 2.23033 21.1225 2.42473 21.3686 2.67153C21.6147 2.91833 21.8083 3.21243 21.9376 3.53609C22.0669 3.85976 22.1294 4.20626 22.1211 4.55471C22.1128 4.90316 22.0339 5.24635 21.8894 5.5635C21.7448 5.88065 21.5375 6.16524 21.2799 6.40005V6.40005Z" />
                                <path d="M11 4H6C4.93913 4 3.92178 4.42142 3.17163 5.17157C2.42149 5.92172 2 6.93913 2 8V18C2 19.0609 2.42149 20.0783 3.17163 20.8284C3.92178 21.5786 4.93913 22 6 22H17C19.21 22 20 20.2 20 18V13" />
                             </svg>
                          </button>
                          <!-- Close Button -->
                          <button @click="removePoll" class="text-gray-500 hover:text-red-500 transition-colors">
                             <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                             </svg>
                          </button>
                       </div>
                    </div>
                    <div class="space-y-2">
                       <div v-for="(option, index) in validPollOptions" :key="index" 
                          class="bg-gray-50 p-2 rounded-md border border-gray-300 text-gray-700 text-xs hover:bg-gray-200 transition-all cursor-pointer">
                          {{ option }}
                       </div>
                    </div>
                 </div>
                 <!-- Image Preview -->
                 <div class="file-previews" v-if="filePreviews.length > 0">
                    <div v-for="(file, index) in filePreviews" :key="index" class="file-preview">
                       <img v-if="file.type === 'image'" :src="file.previewUrl" class="image-preview" />
                       <video v-if="file.type === 'video'" :src="file.previewUrl" controls class="video-preview"></video>
                       <button @click="removeFile(index)" class="remove-file-btn">
                          <svg width="22px" height="22px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                             <path fill-rule="evenodd" clip-rule="evenodd" d="M5.29289 5.29289C5.68342 4.90237 6.31658 4.90237 6.70711 5.29289L12 10.5858L17.2929 5.29289C17.6834 4.90237 18.3166 4.90237 18.7071 5.29289C19.0976 5.68342 19.0976 6.31658 18.7071 6.70711L13.4142 12L18.7071 17.2929C19.0976 17.6834 19.0976 18.3166 18.7071 18.7071C18.3166 19.0976 17.6834 19.0976 17.2929 18.7071L12 13.4142L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L10.5858 12L5.29289 6.70711C4.90237 6.31658 4.90237 5.68342 5.29289 5.29289Z" fill="#0F1729"/>
                          </svg>
                       </button>
                    </div>
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
                       class="w-10 h-10 rounded-full mr-3 object-cover ring-2 ring-blue-500/30"
                       />
                    <div>
                            <div class="flex flex-col space-y-1">
                          <div class="flex items-center space-x-2">
                            <h3 class="font-bold text-lg text-gray-800">{{ formatUsername(post.user) }}</h3>
                            
                            <p v-if="post.category"  class="pl-1">
                            added new post in 
                            <span class="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                              {{ post.category }}
                            </span>
                          </p>
                          
                          </div>
                          
                        </div>
                        <p class="text-xs text-gray-500">{{ formatPostTime(post.createdAt) }}</p>
                    </div>
                    <div v-if="post.taggedUsers && post.taggedUsers.length > 0" class="text-xs text-gray-500 mb-2">
                       Tagged: 
                       <span v-for="user in post.taggedUsers" :key="user.username" class="text-blue-600 mr-2">
                       {{ user.username }}
                       </span>
                    </div>
                    <button v-if="currentUser.email == post.user.email"
                       @click="openPostOptions(post)" 
                       class="ml-auto text-gray-500 hover:bg-gray-100 p-2 rounded-full transition-colors"
                       >
                       <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                       </svg>
                    </button>
                    <div v-if="currentUser.email === post.user.email && showPostOptionsModal" 
                       class="fixed inset-0 z-50 flex items-center justify-center bg-black/10 backdrop-blur-sm transition-opacity"
                       @click.self="closeModal">
                       <div class="bg-white rounded-xl p-6 w-80 shadow-xl transform transition-all scale-100 hover:scale-[1.02]">
                          <div class="flex justify-between items-center mb-6">
                             <h3 class="text-lg font-bold text-gray-800">Post Options</h3>
                             <button @click="showPostOptionsModal = false" 
                                class="text-gray-500 hover:text-gray-700 transition-colors">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                   <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                             </button>
                          </div>
                          <div class="space-y-3">
                             <button @click="editPost" 
                                class="w-full flex items-center p-3 text-left rounded-lg hover:bg-blue-50 group transition-colors">
                                <svg class="w-5 h-5 text-blue-500 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                   <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                                <span class="ml-3 font-medium text-gray-700 group-hover:text-blue-600">Edit Post</span>
                             </button>
                             <button @click="deleteAllComments" 
                                class="w-full flex items-center p-3 text-left rounded-lg hover:bg-orange-50 group transition-colors">
                                <svg class="w-5 h-5 text-orange-500 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                   <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                                <span class="ml-3 font-medium text-gray-700 group-hover:text-orange-600">Clear Comments</span>
                             </button>
                             <button @click="deletePost" 
                                class="w-full flex items-center p-3 text-left rounded-lg hover:bg-red-50 group transition-colors">
                                <svg class="w-5 h-5 text-red-500 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                   <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                                <span class="ml-3 font-medium text-gray-700 group-hover:text-red-600">Delete Post</span>
                             </button>
                          </div>
                       </div>
                    </div>
                 </div>
                 <!-- Post Content -->
                 <div class="p-4">
               <p class="text-gray-800 mb-3 leading-relaxed text-left" v-html="highlightHashtags(post.content)"></p>

               <div v-if="post.poll" class="poll-section mt-4 bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-200 p-6">
  <!-- Poll Title -->
  <h4 class="font-semibold text-xl text-gray-800 mb-5">{{ post.poll.title }}</h4>

  <!-- Poll Options -->
  <ul class="space-y-3">
    <li
      v-for="option in post.poll.options"
      :key="option"
      class="relative"
    >
      <button
        @click="voteOnPoll(post.id, option)"
        :disabled="hasUserVoted(post.poll)"
        class="w-full rounded-lg border border-gray-200 transition-all duration-200"
        :class="{
          'hover:border-blue-300 hover:shadow-sm': !hasUserVoted(post.poll),
          'cursor-not-allowed': hasUserVoted(post.poll)
        }"
      >
        <!-- Container for content -->
        <div class="relative overflow-hidden rounded-lg">
          <!-- Progress Bar -->
          <div
            v-if="hasUserVoted(post.poll)"
            class="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-50 to-blue-100 transition-all duration-500"
            :style="{ width: calculatePollPercentages(post.poll)[option] + '%' }"
          ></div>

          <!-- Content -->
          <div class="relative z-10 flex items-center justify-between p-4">
            <span class="text-gray-700 font-medium">{{ option }}</span>
            
            <div class="flex items-center space-x-4">
              <!-- Vote Percentage -->
              <span v-if="hasUserVoted(post.poll)" 
                class="text-sm font-semibold"
                :class="{
                  'text-blue-600': calculatePollPercentages(post.poll)[option] > 0,
                  'text-gray-400': calculatePollPercentages(post.poll)[option] == 0
                }"
              >
                {{ calculatePollPercentages(post.poll)[option] }}%
              </span>

              <!-- Original Voters SVG -->
              <svg v-if="hasUserVoted(post.poll)"
                @click.stop="viewVoters(post.id, option)"
                class="w-8 h-8 text-gray-500 hover:text-gray-700 transition-all duration-200 cursor-pointer"
                aria-hidden="true"
                height="25px" width="25px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 196.338 196.338" xml:space="preserve">
                <g>
                  <path d="M195.767,66.465c-0.761-1.838-2.221-3.298-4.059-4.059L63.483,9.295c-3.824-1.583-8.214,0.232-9.799,4.059L0.571,141.58 c-0.762,1.838-0.762,3.902,0,5.74c0.761,1.838,2.221,3.298,4.059,4.059l86.104,35.665c0.919,0.38,1.895,0.571,2.87,0.571 c0.976,0,1.951-0.19,2.87-0.571l59.566-24.676c1.838-0.761,3.298-2.221,4.059-4.059l35.667-86.105 C196.528,70.368,196.528,68.303,195.767,66.465z"></path>
                </g>
              </svg>
            </div>
          </div>
        </div>
      </button>
    </li>
  </ul>

  <!-- Total Votes -->
  <div v-if="hasUserVoted(post.poll)" class="mt-5 flex justify-between items-center px-2">
    <span class="text-sm text-gray-500">
      Total votes: <strong class="text-gray-700">{{ totalVotes(post.poll) }}</strong>
    </span>
    <span class="text-xs text-gray-400">Click icon to view voters</span>
  </div>
</div>

<!-- Voters Modal -->
<div v-if="votersModalVisible" class="fixed inset-0 z-50 bg-black/50 flex items-center justify-center transition-opacity duration-300">
  <div class="bg-white rounded-lg p-6 w-96 shadow-lg">
    <!-- Close Button -->
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-xl font-semibold text-gray-800">Voters</h2>
      <button @click="closeVotersModal" class="bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-600 transition-colors">
        ×
      </button>
    </div>

    <div class="divide-y divide-gray-100">
      <ul v-if="voters.length > 0" class="space-y-2 max-h-64 overflow-y-auto">
        <li v-for="voter in voters" :key="voter.id" 
          class="flex items-center py-3 hover:bg-gray-50 rounded-lg transition-all">
          <img :src="voter.photo || voter.photoUrl || require('@/assets/user.png')" 
            class="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm" />
          <span class="ml-3 font-medium text-gray-700">{{ voter.username }}</span>
        </li>
      </ul>
      <p v-else class="text-center text-gray-500 py-6">No voters yet</p>
    </div>
  </div>
</div>

                    <!-- Media Container -->
                    <div class="media-container">
                       <!-- Case 1: Single Media Item (1 Image or 1 Video) -->
                       <div v-if="(post.imageUrls.length === 1 && post.videoUrls.length === 0) || (post.videoUrls.length === 1 && post.imageUrls.length === 0)" class="media-item w-full">
                          <img v-if="post.imageUrls.length === 1" 
                             :src="post.imageUrls[0]" 
                             :alt="'Post Image 1'"
                             class="w-full h-[500px] object-cover rounded-lg shadow-md"
                             @click="openFullImage(post.imageUrls[0])"
                             />
                          <video v-if="post.videoUrls.length === 1" 
                             :src="post.videoUrls[0]" 
                             class="w-full h-[400px] object-cover rounded-lg shadow-md"
                             controls
                             ></video>
                       </div>
                       <!-- Case 2: Two Media Items (1 Image + 1 Video, 2 Images, 2 Videos) -->
                       <div v-if="(post.imageUrls.length === 2 || (post.imageUrls.length === 1 && post.videoUrls.length === 1) || post.videoUrls.length === 2)" class="media-item grid grid-cols-2 gap-4">
                          <!-- Image 1 -->
                          <div v-if="post.imageUrls.length >= 1">
                             <img 
                                :src="post.imageUrls[0]" 
                                :alt="'Post Image 1'"
                                class="w-full h-[300px] object-cover rounded-lg shadow-md"
                                @click="openFullImage(post.imageUrls[0])"
                                />
                          </div>
                          <!-- Image 2 -->
                          <div v-if="post.imageUrls.length === 2">
                             <img 
                                :src="post.imageUrls[1]" 
                                :alt="'Post Image 2'"
                                class="w-full h-[300px] object-cover rounded-lg shadow-md"
                                @click="openFullImage(post.imageUrls[1])"
                                />
                          </div>
                          <!-- Video -->
                          <div v-if="post.videoUrls.length === 1">
                             <video 
                                :src="post.videoUrls[0]" 
                                class="w-full h-[300px] object-cover rounded-lg shadow-md"
                                controls
                                ></video>
                          </div>
                          <!-- Video 2 -->
                          <div v-if="post.videoUrls.length === 2">
                             <video 
                                :src="post.videoUrls[1]" 
                                class="w-full h-[300px] object-cover rounded-lg shadow-md"
                                controls
                                ></video>
                          </div>
                       </div>
                       <!-- Case 3: Three Media Items (Image + Image + Image, Video + Video + Image, etc.) -->
                       <div v-if="(post.imageUrls.length === 3 || post.videoUrls.length === 3 || (post.imageUrls.length === 2 && post.videoUrls.length === 1))" class="media-item grid grid-cols-3 gap-4">
                          <!-- Images -->
                          <div v-for="(imageUrl, index) in post.imageUrls.slice(0, 3)" :key="'image-' + index" class="media-item">
                             <img 
                                :src="imageUrl" 
                                :alt="'Post Image ' + index"
                                class="w-full h-[250px] object-cover rounded-lg shadow-md"
                                @click="openFullImage(imageUrl)"
                                />
                          </div>
                          <!-- Videos -->
                          <div v-for="(videoUrl, index) in post.videoUrls.slice(0, 3)" :key="'video-' + index" class="media-item">
                             <video 
                                :src="videoUrl" 
                                class="w-full h-[250px] object-cover rounded-lg shadow-md"
                                controls
                                ></video>
                          </div>
                       </div>
                       <!-- Case 4: More than 3 Media Items (4+ items) -->
                       <div v-if="(post.imageUrls.length > 3 || post.videoUrls.length > 3)" class="media-item grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                          <!-- Images -->
                          <div v-for="(imageUrl, index) in post.imageUrls" :key="'image-' + index" class="media-item">
                             <img 
                                :src="imageUrl" 
                                :alt="'Post Image ' + index"
                                class="w-full h-[200px] object-cover rounded-lg shadow-md"
                                @click="openFullImage(imageUrl)"
                                />
                          </div>
                          <!-- Videos -->
                          <div v-for="(videoUrl, index) in post.videoUrls" :key="'video-' + index" class="media-item">
                             <video 
                                :src="videoUrl" 
                                class="w-full h-[200px] object-cover rounded-lg shadow-md"
                                controls
                                ></video>
                          </div>
                       </div>
                    </div>
                    
                  
                    <button
    class="hover:underline flex items-center pt-2 pb-0" v-if="post.likeCount>0"
     @click="showLikedByModal = true && fetchLikedByUsers(post.id)"
  >
    <!-- SVG icon -->
    <svg
      width="20px"
      height="20px"
      viewBox="0 0 1024 1024"
      class="icon"
      xmlns="http://www.w3.org/2000/svg"
      style="margin-left: 5px; margin-right: 10px; margin-bottom: 0px;"
    >
      <path
        d="M192 938.7H87.9c-48.4 0-87.9-39.5-87.9-88V386.6c0-48.5 39.5-87.9 87.9-87.9h125.4c11.6 0 22.7 4.7 30.8 13.1 8 8.4 12.3 19.6 11.9 31.2l-21.3 554.7c-0.9 22.8-19.8 41-42.7 41zM87.9 384c-1.4 0-2.6 1.2-2.6 2.6v464.1c0 1.4 1.2 2.6 2.6 2.6h63L169 384H87.9z"
        fill="#5F6379"
      />
      <path
        d="M810.4 938.7H275.7l24.6-640H418l72-201.8C510.7 38.9 566 0 627.5 0c42.4 0 82.6 18.4 110.3 50.4S778 124.8 772 166.7l-18.9 132h142.6c70.7 0 128.2 57.5 128.2 128.2l-1 9.3-84.4 379.4c-2.6 68.3-59.1 123.1-128.1 123.1z m-446.1-85.4h446.1c23.6 0 42.9-19.2 42.9-42.9l1-9.3L938.5 423c-2-21.8-20.4-39-42.7-39h-241l32.8-229.4c2.5-17.7-2.5-34.8-14.2-48.3s-28-20.9-45.9-20.9c-25.6 0-48.5 16.2-57.1 40.3L478.1 384h-95.7l-18.1 469.3z"
        fill="#3688FF"
      />
    </svg>

   <p>
    <span v-if="likedByUsers.length > 0">{{ likedByUsers[0].username }}</span>
    <span v-if="likedByUsers.length > 1">, {{ likedByUsers[1].username }} </span>
    <span v-if="likedByUsers.length >= 3">   and {{ post.likeCount - 2 }} others</span>

    <!-- Like count -->
    <span v-if="likedByUsers < 2">{{ post.likeCount }} liked</span>
  </p>
  </button>
                 </div>
                 <!-- Post Interactions -->
                 <div class="flex justify-around p-3 border-t text-gray-600">


<!-- Like Button -->
<button
      @click="likePost(post)"
      class="flex items-center hover:bg-gray-100 px-4 py-2 rounded-lg transition-colors duration-200"
      :class="{ 'text-blue-500': post.liked }"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5 mr-2 transition-colors duration-200"
        :fill="post.liked ? 'currentColor' : 'none'"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11H4v5h2.5l1.385 3.785A2 2 0 009.326 21h6.434c1.132 0 2.037-.892 2.096-2.021l.208-4.06c.034-.659-.236-1.293-.692-1.732L14 10z"
        />
      </svg>
      <span>{{ post.liked ? 'Dislike' : 'Like' }}</span>
    
    </button>

    <div v-if="showLikedByModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
  <div class="bg-white rounded-lg p-6 max-w-md w-full mx-4 max-h-[80vh] overflow-y-auto">
    <div class="flex justify-between items-center mb-4">
      <h3 class="text-lg font-semibold">Liked by</h3>
      <button @click="showLikedByModal = false" class="text-gray-500 hover:text-gray-700">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
    
    <div v-if="likedByUsers.length > 0" class="space-y-3">
      <div v-for="user in likedByUsers" :key="user.id" class="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg">
        <img 
          :src="user.photoUrl || user.photo" 
          :alt="user.username"
          class="w-10 h-10 rounded-full object-cover"
        >
        <div class="flex-1">
          <p class="font-medium">{{ user.username }}</p>
         
        </div>
      </div>
    </div>
    <div v-else class="text-center text-gray-500 py-4">
      No likes yet
    </div>
  </div>
</div>

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
                    <div 
                       v-for="comment in post.comments" 
                       :key="comment.id" 
                       class="flex items-start gap-0 mb-3 relative comment-item"
                       >
                       <img 
                          :src="comment.user.photoUrl || require('@/assets/user.png')" 
                          alt="users-photo" 
                          class="w-10 h-10 rounded-full object-cover user-avatar"
                          />
                       <div class="flex-grow">
                          <div class="bg-white p-2 rounded-2xl shadow-sm inline-block max-w-full min-w-[150px]">
                             <div class="flex justify-between items-start">
                                <p class="text-sm font-semibold">
                                   {{ comment.user ? comment.user.username : 'Unknown User' }}
                                </p>
                                <!-- Add dropdown menu for edit/delete -->
                                <div 
                                   class="relative" 
                                   v-if="comment.user && comment.user.username === currentUser.username"
                                   >
                                   <button 
                                      @click="toggleCommentMenu(comment.id)" 
                                      class="p-1 hover:bg-gray-100 rounded"
                                      >
                                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                         <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                                      </svg>
                                   </button>
                                   <div 
                                      v-if="activeCommentMenu === comment.id" 
                                      class="absolute right-0 mt-1 bg-white rounded-md shadow-lg z-10"
                                      >
                                      <button 
                                         @click="startEditComment(comment)" 
                                         class="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full"
                                         >
                                         <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                         </svg>
                                         Edit
                                      </button>
                                      <button 
                                         @click="deleteComment(post, comment)" 
                                         class="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full"
                                         >
                                         <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                            <path 
                                               fill-rule="evenodd" 
                                               d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" 
                                               clip-rule="evenodd" 
                                               />
                                         </svg>
                                         Delete
                                      </button>
                                   </div>
                                </div>
                             </div>
                             <div v-if="editingCommentId === comment.id">
                                <div class="flex items-center">
                                   <input 
                                      v-model="editCommentText" 
                                      @keyup.enter="saveCommentEdit(post, comment)"
                                      @keyup.esc="cancelCommentEdit"
                                      class="w-full p-2 border rounded"
                                      :ref="`editComment_${comment.id}`"
                                      />
                                   <button 
                                      @click="saveCommentEdit(post, comment)"
                                      class="ml-2 p-2 rounded-full bg-gray-100 text-white hover:bg-blue-600 transition-colors"
                                      >
                                      <svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="15px" height="15px" viewBox="0 0 512.000000 512.000000" preserveAspectRatio="xMidYMid meet">
                                         <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none">
                                            <path d="M394 4892 c-89 -31 -144 -89 -170 -181 -11 -36 -14 -70 -10 -105 4 -28 99 -417 210 -864 216 -863 213 -853 275 -867 14 -3 413 -48 886 -100 473 -52 872 -97 886 -100 14 -3 39 -20 55 -36 24 -25 29 -39 29 -79 0 -40 -5 -54 -29 -79 -16 -16 -41 -33 -55 -36 -14 -3 -413 -48 -886 -100 -473 -52 -872 -97 -886 -100 -62 -14 -59 -4 -275 -867 -111 -447 -206 -836 -210 -864 -21 -173 136 -329 300 -296 29 6 190 78 376 169 179 87 1119 546 2089 1018 1516 739 1771 867 1816 907 147 133 147 363 0 496 -45 40 -300 168 -1816 907 -970 472 -1910 930 -2088 1017 -384 188 -400 193 -497 160z"/>
                                         </g>
                                      </svg>
                                   </button>
                                </div>
                             </div>
                             <p v-else class="text-gray-800" v-html="highlightUsertag(comment.content, comment.user.id)"></p>

                          </div>
                          <p class="text-xs text-gray-500 mt-1">
                             {{ formatCommentTime(comment.createdAt) }}
                             <span 
                                v-if="comment.editedAt" 
                                class="edited-tooltip ml-2" 
                                :title="formatCommentTime(comment.editedAt)"
                                >
                             Edited
                             </span>
                             <button 
  @click="replyToComment(post, comment.user.username)" 
  class="text-xs text-blue-500 hover:underline ml-2"
>
  Reply
</button>

                          </p>
                       </div>
                    </div>
                    <!-- No Comments Message -->
                    <p v-if="post.comments && post.comments.length === 0" class="text-gray-500 text-sm text-center pb-3">
                       No comments yet
                    </p>
                    <hr>
                    <!-- Comment Input -->
                    <div class="flex items-center space-x-3 pt-3">
                       <img 
                          :src="getUserPhoto(currentUser)" 
                          class="w-10 h-10 rounded-full object-cover"
                          />
                       <div class="flex-grow relative">
                        <input 
  v-model="commentInputs[post.id]"
  @keyup.enter="addComment(post)"
  placeholder="Write a comment..." 
  class="w-full p-2 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
  :ref="`commentInput_${post.id}`"
/>


                          <!-- Emoji Button -->
                          <button 
                             @click="toggleEmojiPicker(post)"
                             class="absolute right-0 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-gray-200 hover:bg-gray-300"
                             >
                             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                <path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm5.507 13.941c-1.512 1.195-3.174 1.931-5.506 1.931-2.334 0-3.996-.736-5.508-1.931l-.493.493c1.127 1.72 3.2 3.566 6.001 3.566 2.8 0 4.872-1.846 5.999-3.566l-.493-.493zm-9.007-5.941c-.828 0-1.5.671-1.5 1.5s.672 1.5 1.5 1.5 1.5-.671 1.5-1.5-.672-1.5-1.5-1.5zm7 0c-.828 0-1.5.671-1.5 1.5s.672 1.5 1.5 1.5 1.5-.671 1.5-1.5-.672-1.5-1.5-1.5z"/>
                             </svg>
                          </button>
                          <!-- Emoji Picker -->
                          <div v-if="emojiPickerVisible" class="absolute right-0 bottom-full mb-2 bg-white shadow-lg rounded-lg p-2 grid grid-cols-8 gap-2">
                             <button v-for="emoji in emojis" :key="emoji" @click="insertEmoji(post, emoji)" class="text-xl cursor-pointer">
                             {{ emoji }}
                             </button>
                          </div>
                       </div>
                       <button 
                          @click="addComment(post)"
                          :disabled="!commentInputs[post.id]"
                          class="text-blue-500 hover:bg-blue-100 p-2 rounded-full disabled:opacity-50"
                          >
                          <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
                             width="25px" height="25px" viewBox="0 0 512.000000 512.000000"
                             preserveAspectRatio="xMidYMid meet">
                             <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
                                fill="#000000" stroke="none">
                                <path d="M394 4892 c-89 -31 -144 -89 -170 -181 -11 -36 -14 -70 -10 -105 4
                                   -28 99 -417 210 -864 216 -863 213 -853 275 -867 14 -3 413 -48 886 -100 473
                                   -52 872 -97 886 -100 14 -3 39 -20 55 -36 24 -25 29 -39 29 -79 0 -40 -5 -54
                                   -29 -79 -16 -16 -41 -33 -55 -36 -14 -3 -413 -48 -886 -100 -473 -52 -872 -97
                                   -886 -100 -62 -14 -59 -4 -275 -867 -111 -447 -206 -836 -210 -864 -21 -173
                                   136 -329 300 -296 29 6 190 78 376 169 179 87 1119 546 2089 1018 1516 739
                                   1771 867 1816 907 147 133 147 363 0 496 -45 40 -300 168 -1816 907 -970 472
                                   -1910 930 -2088 1017 -384 188 -400 193 -497 160z"/>
                             </g>
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
     <!-- Right Sidebar for Active Users List -->
     <div class="w-80 ml-6 hidden lg:block">
        <div class="sticky top-0 h-screen">
           <div class="bg-white rounded-2xl overflow-hidden">
              <div class="p-4 border-b border-gray-100">
                 <h3 class="text-xl font-semibold text-gray-800">Contacts</h3>
              </div>
              <div class="p-2 overflow-y-auto max-h-[calc(100vh-120px)]">
                 <div class="space-y-4">
                    <!-- Display each active user -->
                    <div v-if="activeUsers.length === 0" class="text-center text-gray-500">
                       No active users {{ activeUsers }}
                    </div>
                    <div 
                       v-for="user in activeUsers" 
                       :key="user.username"
                       class="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer group"
                       >
                       <router-link :to="{ name: 'ProfilePage', params: { id: user.id } }" class="flex items-center space-x-3 w-full underline">

                       <div class="relative" >
                          <!-- User's Profile Photo -->
                          <img
                             :src="user.photoUrl  || user.photo|| require('@/assets/user.png')" 
                             :alt="user.username"
                             class="w-12 h-12 rounded-full object-cover ring-2 ring-blue-500/30"
                             />
                          <!-- User's Online Status Indicator -->
                          <div 
                             class="absolute bottom-0 right-0 w-3 h-3 border-2 border-white rounded-full"
                             :class="user ? 'bg-green-500' : 'bg-gray-400'"
                             ></div>
                       </div>
                       <div class="flex-grow min-w-0">
                          <!-- User's Username -->
                          <h4 class="text-sm font-medium text-gray-800 truncate group-hover:text-blue-600">
                             {{ user.username }}
                          </h4>
                          <!-- User's Last Active Time -->
                          <p class="text-xs text-gray-500">
                             <!-- You can add last active time if available -->
                          </p>
                       </div>
                       </router-link>
                    </div>
                 </div>
              </div>
           </div>
        </div>
     </div>
  </div>
</template>
<script>import axios from 'axios';
  export default {
    name: 'HomePage',
    data() {
      return {
        visible: false,
      message: '',
      opacity: 1,
        posts: [],
        newPostContent: '',
        showPostOptions: false,
        showPostOptionsModal: false,
         editingPost: null,
         isEditingPost: false,
        currentUser: null,
        filePreviews: [],
        selectedFiles: [],
        imagePreviewUrl: null,
        fullImageUrl: null,
        page: 0,
        loading: false,
        noMorePosts: false,
        expandedCommentsPosts: [],
        commentInputs: {},
        activeUsers: [],
        uploadProgress: 0,
        activeCommentMenu: null,
        editingCommentId: null,
        editCommentText: '',
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
        isEnhancing: false,
        showLikedByModal: false,
         likedByUsers: [],
         currentLikedPost: null,  
        selectedCategory: null,
        availableUsers: [],
        currentUserId: null,
        pollPercentages: [],
        taggedUsers: [],
        showUserTagModal: false,
        postOptionsModal: null,
        backendUrl: process.env.VUE_APP_BACKEND_URL,
        emojiPickerVisible: false, // Control the visibility of the emoji picker
        showPollModal: false, // To toggle the poll modal visibility
        pollName: '', // Poll name input value
        pollOptions: ['', ''], // Initial options (at least two)
        pollData: {},
        unreadNotifications: [], // Stores unread notifications
        showNotificationsDropdown: false, // Controls dropdown visibility
        voters: [], // List of voters for a poll option
        votersModalVisible: false, // Controls voters modal visibility
        originalText:'',
        emojis: [
    "❤️", "😊", "😂", "😍", "😢", "👍", "🙏", "😎", "🔥", "✨", "💯", "💥", "🎉", "🥳", "💪", "🤔", "🤩", "💀", "👀", "🌟",
    "💖", "💘", "💝", "💗", "💓", "💙", "💚", "💛", "💜", "🧡", "🖤", "🤍", "🤎", "💌", "🌸", "💐", "🌺", "🍀", "🍁", "🍂",
    "🌻", "🌷", "🌼", "🍃", "🍄", "🍑", "🍒", "🍓", "🍉", "🍌", "🍎", "🍏", "🥭", "🥑", "🥒", "🥦","🍲", "🍜", "🍳", 
    "🥚", "🍖", "🍗", "🥩", "🥓", "🧀", "🍕",  "🌯", "🥙", "🍣", "🍙", "🍪", "🍫"]
      }
    },
    mounted() {
      this.initializePage();
      this.fetchLikedByUsers();
   
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
    validPollOptions() {
      return this.pollOptions.filter(option => option.trim() !== '');
    },
    
    showPollPreview() {
      return this.pollName && this.validPollOptions.length > 0;
    }
  },
    methods: {
      async initializePage() {
        try {
          await this.fetchCurrentUser();
          await this.fetchPosts();
          await this.fetchActiveUsers();
          window.addEventListener('scroll', this.handleScroll);
        } catch (error) {
          console.error('Initialization error:', error);
          this.logout();
        }
      },
    
      highlightUsertag(text, userId) {
    if (!text) return ''; // Handle cases where text might be null or undefined
    const regex = /@(\w+)/g;
    return text.replace(regex, (match) => {
      return `<a href="/userprofile/${userId}" class="text-blue-600 font-bold hover:underline">${match}</a>`;
    });
  },

      replyToComment(post, username) {
    if (!post || !username) return; // Ensure post and username exist

    // Update the input field's value with the reply
    this.commentInputs[post.id] = `@${username}, `;

    // Use $nextTick to ensure the DOM is updated before focusing
    this.$nextTick(() => {
      const inputField = this.$refs[`commentInput_${post.id}`];
      if (inputField && inputField.focus) {
        inputField.focus(); // Focus on the input field
      } else {
        console.error("Input field not found or focus is not a function");
      }
    });
  },

      async enhanceText() {
      if (!this.newPostContent.trim() || this.isEnhancing) return
      
      this.isEnhancing = true
       this.originalText = this.newPostContent

      try {
        const response = await fetch('http://localhost:8081/api/enhance', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            text: this.newPostContent
          })
        })

        const data = await response.json()
        
        if (data.error) {
          console.error(data.error)
          return
        }

        // Improved text transition
        await this.animateTextReplacement(data.enhancedText)
      } catch (err) {
        console.error('Failed to enhance text:', err)
      } finally {
        this.isEnhancing = false
      }
    },

    async animateTextReplacement(newText) {
      const originalText = this.newPostContent
      const duration = 190 // 2 seconds animation
      const steps = originalText.length
      
      // Fade in animation character by character
      for (let i = 0; i <= newText.length; i++) {
        this.newPostContent = newText.slice(0, i) + '|' + ' '.repeat(newText.length - i)
        await new Promise(resolve => setTimeout(resolve, duration / steps))
      }

      this.newPostContent = newText
    },

      async fetchActiveUsers() {
        try {
          const token = localStorage.getItem('token');
          
          // Fetch all users
          const response = await axios.get("http://localhost:8081/api/users/all", {
            headers: { Authorization: `Bearer ${token}` },
          });
  
          // Filter out the current user and map additional photo URLs
          this.activeUsers = await Promise.all(
            response.data
              .filter((user) => user.username !== this.currentUser.username)
              .map(async (user) => {
  
                const photo = await this.fetchUserPhoto(user.username);
                return {
                  ...user,
                  photo, 
                };
              })
          );
  
          console.log('Available users:', this.activeUsers);
        } catch (error) {
          console.error('Error fetching available users:', error);
        }
      },
      totalVotes(poll) {
    if (!poll || !poll.votes) return 0; // Handle undefined or invalid poll
    return Object.values(poll.votes).reduce((acc, count) => acc + count, 0);
  },
      async fetchUserPhoto(username) {
        try {
          const token = localStorage.getItem('token');
          const photoResponse = await axios.get(
            `http://localhost:8081/api/users/photo/${username}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          return photoResponse.data.photo
            ? `data:image/jpeg;base64,${photoResponse.data.photo}`
            : '/default-avatar.png';
        } catch (error) {
          console.error(`Error fetching photo for user ${username}:`, error);
          return '/default-avatar.png';
        }
      },
  
      async fetchAvailableUsers() {
        try {
          const token = localStorage.getItem('token');
          
          // Fetch all users
          const response = await axios.get("http://localhost:8081/api/users/all", {
            headers: { Authorization: `Bearer ${token}` },
          });
  
          // Filter out the current user and map additional photo URLs
          this.availableUsers = await Promise.all(
            response.data
              .filter((user) => user.username !== this.currentUser.username)
              .map(async (user) => {
  
                const photo = await this.fetchUserPhoto(user.username);
                return {
                  ...user,
                  photo, 
                };
              })
          );
  
          console.log('Available users:', this.activeUsers);
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
            id: response.data.id,
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
  toggleEmojiPicker() {
        this.emojiPickerVisible = !this.emojiPickerVisible;
      },
      insertEmoji(post, emoji) {
    // Ensure the comment input is initialized if undefined
    if (!this.commentInputs[post.id]) {
      this.commentInputs[post.id] = ''; // Initialize as an empty string
    }
    this.commentInputs[post.id] += emoji; // Append the emoji to the comment input
    this.emojiPickerVisible = false; // Hide the emoji picker after selection
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
  
          // Process each comment to include user photo
          const comments = await Promise.all((response.data || []).map(async (comment) => {
            const userPhotoUrl = await fetchUserPhoto(comment.user);
            return {
              ...comment,
              user: {
                ...comment.user,
                photoUrl: userPhotoUrl
              }
            };
          }));
  
          return comments;
        } catch (error) {
          console.error(`Error fetching comments for post ${postId}:`, error);
          return [];
        }
      };
  
      const newPosts = await Promise.all(postsData.map(async (post) => {
        const photoUrl = await fetchUserPhoto(post.user);
        const comments = await fetchComments(post.id);
  
        // Ensure imageUrls and videoUrls are correctly handled
        const imageUrls = (post.imageUrls || []).map(url => `http://localhost:8081/uploads/${url}`);
        const videoUrls = (post.videoUrls || []).map(url => `http://localhost:8081/uploads/${url}`);
  
        return {
          ...post,
          imageUrls, // array of image URLs
          videoUrls, // array of video URLs
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

  
  async deleteAllComments() {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.delete(`http://localhost:8081/api/posts/comments/delete/all/${this.editingPost.id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
  
      if (response.status === 200) {
        console.log('All comments deleted');
        // Update the comment list and count immediately
        this.editingPost.comments = []; // Clear the comments list
        this.editingPost.commentCount = 0; // Set comment count to 0
        this.showPostOptionsModal = false;
        // Optionally, you could refetch other post details if necessary
        this.fetchPostDetails();
      }
    } catch (error) {
      console.error('Error deleting comments:', error);
      // Handle error (e.g., show error message to the user)
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
        this.commentInputs[post.id] = '';
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
  openImageUpload() {
    if (this.$refs.mediaUpload) {
      this.$refs.mediaUpload.click();
    } else {
      console.error("Media upload reference is undefined.");
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
  
  
  clearImageUpload() {
    this.selectedImageFile = null;
    this.imagePreviewUrl = null;
    if (this.$refs.imageUpload) {
      this.$refs.imageUpload.value = '';
    }
  },
  
      removeFile(index) {
        this.filePreviews.splice(index, 1);
        this.selectedFiles.splice(index, 1);
      },
  
  
      openFileUpload() {
        this.$refs.fileUpload.click();
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
      handleOutsideClick(event) {
      // Check if the click is outside of the dropdown
      const menu = this.$refs.postMenu;
      if (!menu.some((ref) => ref.contains(event.target))) {
        this.currentOpenPostId = null;
      }
    },
      toggleCommentMenu(commentId) {
        this.activeCommentMenu = this.activeCommentMenu === commentId ? null : commentId;
      },
      
      async deleteComment(post, comment) {
        try {
          const token = localStorage.getItem('token');
          await axios.delete(`http://localhost:8081/api/posts/comments/delete/${comment.id}`, {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          
          const postIndex = this.posts.findIndex(p => p.id === post.id);
          if (postIndex !== -1) {
            const commentIndex = this.posts[postIndex].comments.findIndex(c => c.id === comment.id);
            this.posts[postIndex].comments.splice(commentIndex, 1);
            this.posts[postIndex].commentCount--;
          }
        } catch (error) {
          console.error('Error deleting comment:', error);
        }
        this.activeCommentMenu = null;
      },
  
      startEditComment(comment) {
    this.editingCommentId = comment.id;
    this.editCommentText = comment.content;
    this.activeCommentMenu = null;
    this.$nextTick(() => {
      if (this.$refs.editCommentInput && this.$refs.editCommentInput[0]) {
        this.$refs.editCommentInput[0].focus();
      }
    });
  },
  
      async saveCommentEdit(post, comment) {
        try {
          const token = localStorage.getItem('token');
          const response = await axios.put(
            `http://localhost:8081/api/posts/comments/edit/${comment.id}`,
            { content: this.editCommentText },
            { headers: { 'Authorization': `Bearer ${token}` }}
          );
          
          const postIndex = this.posts.findIndex(p => p.id === post.id);
          if (postIndex !== -1) {
            const commentIndex = this.posts[postIndex].comments.findIndex(c => c.id === comment.id);
            this.posts[postIndex].comments[commentIndex] = {
              ...response.data,
              user: comment.user
            };
          }
          this.editingCommentId = null;
          this.editCommentText = '';
        } catch (error) {
          console.error('Error editing comment:', error);
        }
      },
  
      cancelCommentEdit() {
        this.editingCommentId = null;
        this.editCommentText = '';
      },
      async createPost() {
    try {
      const formData = new FormData();
      formData.append("content", this.newPostContent);
      if (this.selectedCategory) {
        formData.append("category", this.selectedCategory);
      }
  
      // Fix poll data submission
      if (this.pollName && this.pollOptions.some(option => option.trim() !== '')) {
        const pollData = {
          title: this.pollName,
          options: this.pollOptions.filter(option => option.trim() !== '')
        };
        formData.append("pollData", JSON.stringify(pollData));
      }
  
      // Handle files
      this.selectedFiles.forEach((file) => {
        if (file.type.startsWith("image/")) {
          formData.append("images", file);
        } else if (file.type.startsWith("video/")) {
          formData.append("videos", file);
        }
      });
  
      const response = await axios.post("http://localhost:8081/api/posts/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        onUploadProgress: (progressEvent) => {
          this.uploadProgress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        },
      });
  
      // Update local posts array with the new post
      this.posts.unshift(response.data);
      this.resetPostForm();
 
    } catch (error) {
      console.error("Error creating post:", error);
    }
  },
  
      openMediaUpload() {
      this.$refs.mediaUpload.click();
    },
    async editPost() {
  // Initialize data for editing the post
  this.newPostContent = this.editingPost.content;
  this.selectedCategory = this.editingPost.category;
  this.selectedFiles = [];
  this.filePreviews = [];
  this.pollName = this.editingPost.poll?.title || '';  // Initialize poll name if exists
  this.pollOptions = this.editingPost.poll?.options || ['', ''];  // Initialize poll options if exists
  
  // Prepare poll data if it exists
  if (this.editingPost.poll) {
    // Set poll visibility and data
    this.showPollModal = false;
    this.pollName = this.editingPost.poll.title || '';
    this.pollOptions = this.editingPost.poll.options || ['', '']; // Ensure there are at least two options
  } else {
    this.showPollModal = false;  // Hide poll modal if no poll exists
  }

  // Load existing media previews
  if (this.editingPost.imageUrls) {
    this.editingPost.imageUrls.forEach(url => {
      this.filePreviews.push({
        type: 'image',
        previewUrl: url.startsWith('http') ? url : `http://localhost:8081/uploads/${url}`
      });
    });
  }

  if (this.editingPost.videoUrls) {
    this.editingPost.videoUrls.forEach(url => {
      this.filePreviews.push({
        type: 'video',
        previewUrl: url.startsWith('http') ? url : `http://localhost:8081/uploads/${url}`
      });
    });
  }

  this.isEditingPost = true;
  this.showPostOptionsModal = false;
  this.showPostOptions = true;
},

async confirmEditPost() {
  try {
    const formData = new FormData();

    // Add content
    formData.append("content", this.newPostContent.trim());

    // Add category
    if (this.selectedCategory) {
      formData.append("category", this.selectedCategory);
    }

    // Add poll data if available
    if (this.pollName && this.pollOptions.length >= 2) {
      formData.append(
        "pollData",
        JSON.stringify({
          title: this.pollName,
          options: this.pollOptions.filter(option => option.trim() !== ""),
        })
      );
    } else if (!this.pollName) {
      formData.append("pollData", null); // Indicate poll removal
    }

    // Add new files (images and videos)
    this.selectedFiles.forEach(file => {
      if (file.type.startsWith("image/")) {
        formData.append("images", file);
      } else if (file.type.startsWith("video/")) {
        formData.append("videos", file);
      }
    });

    // Signal removal of existing files if no previews remain
    if (!this.filePreviews.length) {
      formData.append("images", "");
      formData.append("videos", "");
    }

    // Send request to backend
    const response = await axios.put(
      `http://localhost:8081/api/posts/edit/${this.editingPost.id}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    // Update post in local array with the new data
    const index = this.posts.findIndex(post => post.id === this.editingPost.id);
    if (index !== -1) {
      this.posts[index] = {
        ...this.posts[index],
        content: response.data.content,
        imageUrls: response.data.imageUrls?.map(
          url => `http://localhost:8081/uploads/${url}`
        ) || [],
        videoUrls: response.data.videoUrls?.map(
          url => `http://localhost:8081/uploads/${url}`
        ) || [],
        poll: response.data.poll || null,
      };
    }

    // Reset form
    this.resetPostForm();

  } catch (error) {
    console.error("Error editing post:", error);
  }
},
  resetPostForm() {
    // Clear content and category
    this.newPostContent = "";
    this.selectedCategory = null;
  
    // Clear file-related states
    this.selectedFiles = [];
    this.filePreviews = [];
    this.imagePreviewUrl = null;
    this.uploadProgress = 0;
  
    // Reset editing states
    this.isEditingPost = false;
    this.editingPost = null;
    this.showPostOptions = false;
    this.showPostOptionsModal = false;
  
    // Clear tagged users
    this.taggedUsers = [];
    this.showUserTagModal = false;
    
    this.showPollModal = false;
    this.removePoll()
    // Reset any file input elements
    if (this.$refs.mediaUpload) {
      this.$refs.mediaUpload.value = '';
    }
  },
  async voteOnPoll(postId, option) {
  this.isLoading = true;
  try {
    const token = localStorage.getItem('token');
    const response = await axios.put(
      `http://localhost:8081/api/posts/${postId}/vote`,
      null,
      {
        params: { option },
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const updatedPoll = response.data;
    window.location.reload();
    // Find the post and update the poll directly in the posts array
    const post = this.posts.find(post => post.id === postId);
    if (post) {
      // Use Vue's reactivity system to update the poll
      this.$set(post, 'poll', updatedPoll);
      // Update the poll percentages after voting
      this.pollPercentages[postId] = this.calculatePollPercentages(updatedPoll);
    }
  } catch (error) {
    console.error('Error voting:', error);
  } finally {
    this.isLoading = false;
  }
},

calculatePollPercentages(poll) {
  const totalVotes = poll.options.reduce((sum, option) => sum + poll.votes[option], 0);
  const percentages = {};

  poll.options.forEach(option => {
    const votes = poll.votes[option] || 0;
    percentages[option] = totalVotes > 0 ? ((votes / totalVotes) * 100).toFixed(2) : 0;
  });

  return percentages;
}
,

async viewVoters(postId, option) {
  this.isLoading = true;
  try {
    const response = await axios.get(
      `http://localhost:8081/api/posts/${postId}/poll/${option}/voters`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    const voters = response.data; // This now contains user details (name, avatar, etc.)
    
    // Fetch the user photo for each voter if the photoUrl is not available
    for (let voter of voters) {
      if (!voter.googleUser) {
        voter.photo = await this.fetchUserPhoto(voter.username); // Fetch photo if not available
      }
    }

    this.voters = voters; // Store voter details for display
    this.votersModalVisible = true; // Show the modal
  } catch (error) {
    console.error("Error fetching voters:", error);
  } finally {
    this.isLoading = false;
  }
},

closeVotersModal() {
  this.votersModalVisible = false;
  this.voters = [];
}
,
    handleFileUpload(event) {
      const files = Array.from(event.target.files);
      
      files.forEach(file => {
        // Validate file size (100MB limit)
        if (file.size > 100 * 1024 * 1024) {
          alert(`${file.name} is too large. Maximum size is 100MB`);
          return;
        }
  
        const reader = new FileReader();
        reader.onload = (e) => {
          this.filePreviews.push({
            type: file.type.startsWith('image/') ? 'image' : 'video',
            previewUrl: e.target.result,
            name: file.name
          });
        };
        reader.readAsDataURL(file);
        
        this.selectedFiles.push(file);
      });
  
      event.target.value = '';
    },
    handleFileChange(event) {
    const files = Array.from(event.target.files);
    
    // Append new files to the existing selected files
    this.selectedFiles = [...this.selectedFiles, ...files];
  
    // Generate previews for each new file (images and videos)
    const newPreviews = files.map(file => {
      const previewUrl = URL.createObjectURL(file);  // Create preview URL
      return { type: file.type.startsWith('image') ? 'image' : 'video', previewUrl };
    });
  
    // Append new previews to the existing previews
    this.filePreviews = [...this.filePreviews, ...newPreviews];
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
    if (diffInSeconds < 7 * 86400) return `${Math.floor(diffInSeconds / 86400)}d ago`;
    if (diffInSeconds < 30 * 86400) return `${Math.floor(diffInSeconds / (7 * 86400))}w ago`;
    // If more than a year, return the locale date string
    return date.toLocaleDateString();
  },
  cancel() {
        // Reset editing state
        this.isEditingPost = false
        
        // Clear post content
    this.resetPostForm();
        
        // Optional: Additional cleanup or navigation
         this.$emit('cancel-editing')
      },
      hasUserVoted(poll) {
  if (!this.currentUser || !poll.voters) return false;
  return Object.keys(poll.voters).includes(this.currentUser.id);
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
        localStorage.removeItem('role');
        localStorage.removeItem('username');
        this.$router.push('/login');
      },
      addOption() {
      if (this.pollOptions.length < 10) { // Limit to 10 options
        this.pollOptions.push('');
      }
    },
  
    removeOption(index) {
      if (this.pollOptions.length > 2) {
        this.pollOptions.splice(index, 1);
      }
    },
  
    removePoll() {
      this.pollName = '';
      this.pollOptions = ['', '']; // Reset to two empty options
      this.showPollModal = false;
    },
    async likePost(post) {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post(
      `${this.backendUrl}/api/posts/${post.id}/like`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // Update the post's liked and likeCount states based on the response
    post.liked = response.data.liked;
    post.likeCount = response.data.likeCount;
  } catch (error) {
    console.error('Error toggling like:', error);
  }
},

  async fetchLikedByUsers(postId) {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `${this.backendUrl}/api/posts/${postId}/likes`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // Process each user to include their photo
      this.likedByUsers = await Promise.all(
        response.data.map(async (user) => {
          try {
            const photoResponse = await axios.get(
              `${this.backendUrl}/api/users/photo/${user.username}`,
              {
                headers: { Authorization: `Bearer ${token}` },
              }
            );
            return {
              ...user,
              photoUrl: photoResponse.data.photoUrl,
              photo: photoResponse.data.photo
                ? `data:image/jpeg;base64,${photoResponse.data.photo}`
                : '/default-avatar.png'
            };
          } catch (error) {
            return {
              ...user,
            
            };
          }
        })
      );
    } catch (error) {
      console.error('Error fetching liked by users:', error);
      this.likedByUsers = [];
    }
  },
  showMessage(message) {
      this.message = message;
      this.visible = true;
      this.opacity = 1;
      setTimeout(() => {
        this.opacity = 0;
      }, 2000); // Wait for 2 seconds before fading out
      setTimeout(() => {
        this.visible = false;
      }, 2500); // Hide after fading out
    },
    async submitPoll() {
      if (!this.pollName || this.pollOptions.length < 2 || this.pollOptions.some(option => !option.trim())) {
        alert("Please fill out the poll name and add at least two valid options.");
        return;
      }
      this.showPollPreview = true;
      this.showPollModal = false;
  
  }}}
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
  .comment-container {
  display: flex;
  flex-direction: column;
  gap: 10px; /* Consistent spacing between comments */
  }
  .comment-item {
  display: flex;
  align-items: flex-start; /* Align items at the top */
  gap: 10px; /* Space between avatar and content */
  }
  .comment-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%; /* Ensures the avatar is circular */
  object-fit: cover; /* Ensures image scales correctly */
  }
  .comment-content {
  background-color: #f9f9f9; /* Subtle background for comment */
  padding: 10px; /* Consistent padding */
  border-radius: 10px; /* Rounded corners for modern look */
  flex-grow: 1; /* Expands to fill available space */
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1); /* Subtle shadow for depth */
  }
  .emoji-picker {
  position: absolute;
  top: 100%; /* Position picker below the button */
  left: 0; /* Align to the left of the button */
  background-color: white;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1); /* Elevation for visibility */
  border-radius: 8px; /* Smooth corners */
  padding: 10px; /* Comfortable padding for content */
  z-index: 1000; /* Ensure it appears above other elements */
  }
  .emoji-picker::before {
  content: "";
  position: absolute;
  top: -5px;
  left: 10px; /* Adjust based on button position */
  border-width: 5px;
  border-style: solid;
  border-color: transparent transparent white transparent; /* Triangle pointer */
  }
  .edited-tooltip {
  cursor: pointer;
  text-decoration: underline dotted; /* Modern underline style */
  color: #888; /* Subtle color for the tooltip text */
  font-size: 0.85rem; /* Slightly smaller font size */
  }
  .edited-tooltip:hover {
  text-decoration: underline solid; /* Stronger underline on hover */
  color: #555; /* Slightly darker on hover for emphasis */
  }
  .file-previews {
  margin-top: 1rem;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  }
  @media (min-width: 768px) {
  .file-previews {
  grid-template-columns: repeat(3, 1fr);
  }
  }
  .file-preview {
  position: relative;
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  }
  .file-preview:hover {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  }
  .remove-file-btn {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background-color: #f56565;
  color: white;
  padding: 0.375rem;
  border-radius: 9999px;
  opacity: 0;
  transition: opacity 0.2s ease;
  }
  .file-preview:hover .remove-file-btn {
  opacity: 1;
  }
  .image-preview, .video-preview {
  width: 100%;
  height: 12rem;
  object-fit: cover;
  }

  .poll-section h4 {
  font-size: 1.25rem;
  }
  .poll-modal,
.voters-modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
}

.input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.poll-section {
  background: #f9f9f9;
  padding: 15px;
  border-radius: 10px;
  margin-top: 10px;
}

.poll-title {
  font-weight: bold;
}

.poll-option-button {
  width: 100%;
  text-align: left;
  padding: 10px;
  margin: 5px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.view-voters-link {
  color: #007bff;
  text-decoration: underline;
  font-size: 12px;
  cursor: pointer;
}

.voter-avatar {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-right: 10px;
}
.toast-notification {
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #48bb78; /* Green color for success */
  color: white;
  padding: 12px 20px;
  border-radius: 5px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  font-size: 14px;
}
.button {
  --black-700: hsla(0 0% 12% / 1);
  --border_radius: 9999px;
  --transtion: 0.3s ease-in-out;
  cursor: pointer;
  position: absolute;
  top:60px;
  right:0px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transform-origin: center;
  padding: 0.5rem 1rem;
  background-color: transparent;
  border: none;
  border-radius: var(--border_radius);
  transform: scale(calc(1 + (var(--active, 0) * 0.1)));
  transition: transform var(--transtion);
  scale: 0.8;
}

.button::before {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  background-color: var(--black-700);
  border-radius: var(--border_radius);
  box-shadow: inset 0 0.5px hsl(0, 0%, 100%), inset 0 -1px 2px 0 hsl(0, 0%, 0%),
    0px 4px 10px -4px hsla(0 0% 0% / calc(1 - var(--active, 0))),
    0 0 0 calc(var(--active, 0) * 0.375rem) hsl(260 97% 50% / 0.75);
  transition: all var(--transtion);
  z-index: 0;
}

.button::after {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  background-color: hsla(260 97% 61% / 0.75);
  background-image: radial-gradient(
      at 51% 89%,
      hsla(266, 45%, 74%, 1) 0px,
      transparent 50%
    ),
    radial-gradient(at 100% 100%, hsla(266, 36%, 60%, 1) 0px, transparent 50%),
    radial-gradient(at 22% 91%, hsla(266, 36%, 60%, 1) 0px, transparent 50%);
  background-position: top;
  opacity: var(--active, 0);
  border-radius: var(--border_radius);
  transition: opacity var(--transtion);
  z-index: 2;
}

.button:is(:hover, :focus-visible) {
  --active: 1;
}

.button:active {
  transform: scale(1);
}

.button .dots_border {
  --size_border: calc(100% + 2px);
  overflow: hidden;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: var(--size_border);
  height: var(--size_border);
  background-color: transparent;
  border-radius: var(--border_radius);
  z-index: -10;
}

.button .dots_border::before {
  content: "";
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
  transform-origin: left;
  transform: rotate(0deg);
  width: 100%;
  height: 2rem;
  background-color: white;
  mask: linear-gradient(transparent 0%, white 120%);
  animation: rotate 2s linear infinite;
}

@keyframes rotate {
  to {
    transform: rotate(360deg);
  }
}

.button .sparkle {
  position: relative;
  z-index: 10;
  width: 1.75rem;
}

.button .sparkle .path {
  fill: currentColor;
  stroke: currentColor;
  transform-origin: center;
  color: hsl(0, 0%, 100%);
}

.button:is(:hover, :focus) .sparkle .path {
  animation: path 1.5s linear 0.5s infinite;
}

.button .sparkle .path:nth-child(1) {
  --scale_path_1: 1.2;
}

.button .sparkle .path:nth-child(2) {
  --scale_path_2: 1.2;
}

.button .sparkle .path:nth-child(3) {
  --scale_path_3: 1.2;
}

@keyframes path {
  0%, 34%, 71%, 100% {
    transform: scale(1);
  }
  17% {
    transform: scale(var(--scale_path_1, 1));
  }
  49% {
    transform: scale(var(--scale_path_2, 1));
  }
  83% {
    transform: scale(var(--scale_path_3, 1));
  }
}

.button .text_button {
  position: relative;
  z-index: 10;
  background-image: linear-gradient(
    90deg,
    hsla(0 0% 100% / 1) 0%,
    hsla(0 0% 100% / var(--active, 0)) 120%
  );
  background-clip: text;
  font-size: 1rem;
  color: transparent;
  -webkit-background-clip: text;
}

.button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  --active: 0;
}
</style>
