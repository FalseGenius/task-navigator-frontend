<template>
  <div>
    <div class="sidebar" :class="{ 'sidebar-open': isOpen }">
      <!-- Sidebar content -->
    </div>

    <button class="sidebar-toggle" @click="toggleSidebar">
      <i class="fa" :class="isOpen ? 'fa-chevron-left' : 'fa-chevron-right'"></i>
    </button>
  </div>
</template>

<script>
export default {
  name: "sidebar_comp",
  data() {
    return {
      isOpen: false
    };
  },
  methods: {
    toggleSidebar() {
      this.isOpen = !this.isOpen;
    }
  }
};
</script>

<style scoped>
.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  width: 200px;
  height: 100vh;
  background-color: #f1f1f1;
  transition: transform 0.3s ease-in-out;
  transform: translateX(-100%);
}

.sidebar-open {
  transform: translateX(0);
}

.sidebar-toggle {
  position: fixed;
  top: 20px;
  left: 20px; /* Adjust the value according to your needs */
  background-color: #f1f1f1;
  border: none;
  outline: none;
  padding: 12px; /* Increase the padding for a larger button */
  cursor: pointer;
}

.fa {
  font-size: 18px;
}
</style>
