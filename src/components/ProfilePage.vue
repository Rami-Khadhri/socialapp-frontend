<template>
  <div class="bg-gray-100 min-h-screen">
    <!-- Navbar -->
    <header class="bg-gray-900 text-white p-4">
      <div class="max-w-6xl mx-auto flex justify-between items-center">
        <h1 class="text-xl font-bold">Facebook Clone</h1>
        <div class="flex items-center space-x-4">
          <input
            type="text"
            placeholder="Search Facebook"
            class="px-4 py-2 bg-gray-800 text-white rounded-md"
          />
          <button class="bg-blue-600 px-4 py-2 rounded-md hover:bg-blue-500">
            Login
          </button>
        </div>
      </div>
    </header>

    <!-- Profile Cover -->
    <div class="relative bg-gray-800 h-60">
      <div class="absolute bottom-[-50px] left-8 flex items-center space-x-4">
        <!-- Profile Picture -->
        <img
          src="https://via.placeholder.com/150"
          alt="Profile"
          class="w-28 h-28 rounded-full border-4 border-white"
        />
        <div>
          <h2 class="text-2xl font-bold text-white">Rami Khadhri</h2>
          <p class="text-gray-300">1.1K friends</p>
        </div>
      </div>
    </div>

    <!-- Action Buttons -->
    <div class="mt-16 px-8">
      <div class="flex justify-between items-center">
        <div class="flex space-x-4">
          <button class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-400">
            Add to story
          </button>
          <button class="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-200">
            Edit profile
          </button>
        </div>
        <button class="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-200">
          More
        </button>
      </div>
    </div>

    <!-- Tabs -->
    <div class="mt-4 border-b">
      <div class="flex space-x-8 px-8">
        <button class="text-blue-500 border-b-2 border-blue-500 py-2">Posts</button>
        <button class="text-gray-500 hover:text-blue-500 py-2">About</button>
        <button class="text-gray-500 hover:text-blue-500 py-2">Friends</button>
        <button class="text-gray-500 hover:text-blue-500 py-2">Photos</button>
        <button class="text-gray-500 hover:text-blue-500 py-2">Videos</button>
      </div>
    </div>

    <!-- Posts Section -->
    <div class="mt-8 px-8">
      <div class="bg-white rounded-lg shadow p-4 mb-4">
        <textarea
          placeholder="What's on your mind?"
          class="w-full bg-gray-100 p-2 rounded-md"
        ></textarea>
        <button class="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md">
          Post
        </button>
      </div>

      <!-- Sample Post -->
      <div class="bg-white rounded-lg shadow p-4">
        <div class="flex items-center space-x-4">
          <img
            src="https://via.placeholder.com/50"
            alt="Profile"
            class="w-12 h-12 rounded-full"
          />
          <div>
            <h3 class="font-bold">Rami Khadhri</h3>
            <p class="text-gray-500 text-sm">July 4</p>
          </div>
        </div>
        <p class="mt-4">
          This is a sample post to demonstrate the profile feed layout.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProfilePage",
};
</script>

<style scoped>
/* Add custom styles if necessary */
</style>
