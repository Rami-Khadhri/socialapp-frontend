<template>
  <div class="chart-container">
    <router-link to="/users" class="button-chart">
      <svg width="8px" height="8px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M11.7071 4.29289C12.0976 4.68342 12.0976 5.31658 11.7071 5.70711L6.41421 11H20C20.5523 11 21 11.4477 21 12C21 12.5523 20.5523 13 20 13H6.41421L11.7071 18.2929C12.0976 18.6834 12.0976 19.3166 11.7071 19.7071C11.3166 20.0976 10.6834 20.0976 10.2929 19.7071L3.29289 12.7071C3.10536 12.5196 3 12.2652 3 12C3 11.7348 3.10536 11.4804 3.29289 11.2929L10.2929 4.29289C10.6834 3.90237 11.3166 3.90237 11.7071 4.29289Z" fill="#000000"/>
      </svg>
      Go back
    </router-link>
    <div class="card bg-white shadow rounded-lg overflow-hidden">
      <!-- Header -->
      <div class="px-4 py-5">
        <h3 class="text-lg font-medium text-gray-900">Posts per Month</h3>
        <p class="mt-1 text-sm text-gray-500">Monthly breakdown of posting activity</p>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="flex justify-center items-center h-[400px]">
        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="flex justify-center items-center h-[400px] text-red-500">
        {{ error }}
      </div>

      <!-- Chart -->
      <div v-else class="px-4 pb-6">
        <div class="h-[400px]">
          <canvas ref="chartCanvas"></canvas>
        </div>

        <!-- Stats Summary -->
        <div class="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div class="bg-blue-50 rounded-lg p-4">
            <p class="text-sm font-medium text-blue-600">Total Posts</p>
            <p class="mt-1 text-2xl font-semibold text-blue-900">{{ totalPosts }}</p>
          </div>
          <div class="bg-green-50 rounded-lg p-4">
            <p class="text-sm font-medium text-green-600">Busiest Month</p>
            <p class="mt-1 text-2xl font-semibold text-green-900">
              {{ busiestMonth.count }} posts
            </p>
            <p class="mt-1 text-sm text-green-500">{{ busiestMonth.month }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Chart from 'chart.js/auto'

export default {
  name: 'AveragePostsChart',
  data() {
    return {
      loading: true,
      error: null,
      chart: null,
      chartData: [],
      totalPosts: 0,
      busiestMonth: {
        month: '',
        count: 0
      }
    }
  },
  async created() {
    await this.fetchData()
  },
  mounted() {
    // Initialize chart only after the canvas element is available
    this.$nextTick(() => {
      if (!this.loading && !this.error && this.chartData.length > 0) {
        this.initChart()
      }
    })
  },
  beforeUnmount() {
    if (this.chart) {
      this.chart.destroy()
    }
  },
  methods: {
    async fetchData() {
      try {
        const response = await fetch('http://localhost:8081/api/posts/all')
        if (!response.ok) throw new Error('Failed to fetch data')
        
        const posts = await response.json()
        this.processData(posts)
        this.loading = false

        // Ensure chart is initialized after data is processed
        this.$nextTick(() => {
          if (!this.loading && !this.error && this.chartData.length > 0) {
            this.initChart()
          }
        })
      } catch (err) {
        this.error = err.message
        this.loading = false
      }
    },
    processData(posts) {
      // Group posts by month
      const monthlyGroups = posts.reduce((acc, post) => {
        const date = new Date(post.createdAt)
        const month = date.toLocaleString('default', { month: 'short' })
        
        if (!acc[month]) {
          acc[month] = 0
        }
        acc[month]++
        return acc
      }, {})

      // Find busiest month
      let maxCount = 0
      let busiestMonth = ''
      Object.entries(monthlyGroups).forEach(([month, count]) => {
        if (count > maxCount) {
          maxCount = count
          busiestMonth = month
        }
      })

      this.busiestMonth = {
        month: busiestMonth,
        count: maxCount
      }

      // Convert to array format for chart
      this.chartData = Object.entries(monthlyGroups).map(([month, count]) => ({
        month,
        count
      }))

      this.totalPosts = posts.length
    },
    initChart() {
      const ctx = this.$refs.chartCanvas?.getContext('2d') // Optional chaining to avoid null errors
      
      // Ensure canvas context is available before initializing chart
      if (ctx) {
        this.chart = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: this.chartData.map(item => item.month),
            datasets: [{
              label: 'Posts',
              data: this.chartData.map(item => item.count),
              backgroundColor: 'rgba(59, 130, 246, 0.8)', // Blue color
              borderColor: 'rgba(59, 130, 246, 1)',
              borderWidth: 1,
              borderRadius: 4,
              barThickness: 32
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: false
              },
              tooltip: {
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                titleColor: '#1F2937',
                bodyColor: '#1F2937',
                borderColor: '#E5E7EB',
                borderWidth: 1,
                padding: 12,
                callbacks: {
                  label: function(context) {
                    return `Posts: ${context.parsed.y}`
                  }
                }
              }
            },
            scales: {
              y: {
                beginAtZero: true,
                grid: {
                  color: 'rgba(243, 244, 246, 1)'
                }
              },
              x: {
                grid: {
                  display: false
                }
              }
            }
          }
        })
      }
    }
  }
}
</script>
<style scoped>
.chart-container {
  width: 100%;
  max-width: 64rem;
  margin: 0 auto;
}

.button-chart {
  position: absolute;
  width: 120px;
  top: 100px;
  left: 5px;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  color: white;
  background: linear-gradient(45deg, #6a11cb, #2575fc); /* Gradient background */
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  text-decoration: none; /* Remove underline */
  text-align: center;
  display: inline-block;
}

.button-chart:hover {
  background: linear-gradient(45deg, #2575fc, #6a11cb); /* Reverse gradient on hover */
  transform: scale(1.1); /* Slightly increase the size */
}

.button-chart:active {
  transform: scale(0.95); /* Slightly shrink on click */
}

.button-chart {
  animation: color-change 3s infinite alternate; /* Color-changing animation */
}

/* Keyframes for color change animation */
@keyframes color-change {
  0% {
    background: linear-gradient(45deg, #6a11cb, #2575fc);
  }
  50% {
    background: linear-gradient(45deg, #ff7e5f, #feb47b); /* Soft orange gradient */
  }
  100% {
    background: linear-gradient(45deg, #6a11cb, #2575fc);
  }
}
</style>