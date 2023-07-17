<template>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">
  <div>
    <div id="mySidebar" class="sidebar" :style="{ width: sidebarWidth }">
      <div class="d-flex justify-content-between align-items-center border-left">
        <div class="d-flex align-items-center">
          <img src="../assets/tasknav.png" alt="" class="sidebar-logo">
        </div>
        <button class="closebtn" @click="toggleNav()">
          <i :class="sidebarWidth === '0' ? 'fa fa-angle-double-right' : 'fa fa-angle-double-left'"
            aria-hidden="true"></i>
        </button>
      </div>
      <div class="sidebar-content">
        <router-link to="/">Home</router-link>    
        <a href="#" @click="toggleDropdownside('services')">
          Team Space
          <i :class="dropdowns.services ? 'fa fa-angle-down' : 'fa fa-angle-right'" aria-hidden="true"></i>
        </a>
        <div v-if="dropdowns.services" class="dropdown">
          <a href="#" @click="toggleDropdownside('projects')">
    Project
    <i :class="dropdowns.projects ? 'fa fa-angle-down' : 'fa fa-angle-right'" aria-hidden="true"></i>
  </a>
  <div v-if="dropdowns.projects" class="dropdown">
  <a href="#" @click="redirectToProject1Dropdown">Project 1</a>
  <a href="#">Project 2</a>
</div>
</div>

<a href="#" @click="toggleDropdownside('members')">
  Members
  <i :class="dropdowns.members ? 'fa fa-angle-down' : 'fa fa-angle-right'" aria-hidden="true"></i>
</a>
<div v-if="dropdowns.members" class="dropdown">
  <a href="#">Members 1</a>
  <a href="#">Members 2</a>
  <a href="#">Members 3</a>
</div>

        
        <div class="position-absolute bottom-0 start-0">
        <a href=""><i class="fa fa-cog" aria-hidden="true"></i> Setting</a>
        <a href="" @click="logout"> <i class="fa fa-sign-out-alt" aria-hidden="true"></i> Logout</a></div>
      </div>
    </div>

    <div :style="{ marginLeft: sidebarWidth }">
      <div id="main">
        <div class="d-flex align-items-center">
          <div class="openbtn-pad">
            <button v-if="sidebarWidth === '0'" class="openbtn" @click="toggleNav()">
              <i class="fa fa-angle-double-right" aria-hidden="true"></i>
            </button>
          </div>
          <!-- navbar component -->
          <div class="navbar-border">
            <nav class="navbar ml-3 flex-grow-1">
              <div class="container-fluid">
                <form class="d-flex" role="search">
                  <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
                  <button class="btn " type="submit">Search</button>
                </form>
              </div>
            </nav>
          </div>
        </div>
      </div>

      <!-- Body content with tasks -->
      <div>
  <div class="project-section  " style="margin: 25px; width: 35%;">
 
    <div class="column">
        <div class="card" style="background-color: #f4f4f4;" >
          <div class="card-header" style="  background-color: #f4f4f4; border-bottom: 3px solid #673dd1;    padding: 16px 10px;">
            <div class="header-title">
              <span>To Do</span>
              <button class="btn btn-link btn-add-task" @click="togglePopup" style="background-color: #b9afd9;">
                <i class="fas fa-plus"></i>
              </button>
            </div>
          </div>
          <div class="card-body">
            <div class="task-list" @dragover.prevent @drop="drop('todo')">
                <div
  class="task-card card text-center"
  v-for="task in todoTasks"
  :key="task.id"
  draggable="true"
  @dragstart="dragStart(task, 'todo')"
>
                <div class="card-body">
                    <div class="d-flex justify-content-between">
                  <!-- Display the Priority -->
                  <div :class="['card-priority', task.priority === 'high' ? 'high' : 'low']">{{ task.priority }}</div>
                  <!-- Display the Title -->
                  <div class="card-title d-flex justify-content-between">
  <div class="dropdown">
    <button class="btn" type="button" data-bs-toggle="dropdown" aria-expanded="false">
      <i class="fa fa-ellipsis-h"></i>
    </button>
    <ul class="dropdown-menu">
      <li><a class="dropdown-item" href="#" @click="openEditModal(task)">Edit</a></li>
      <li><a class="dropdown-item" href="#" @click="deleteTask(task)">Delete</a></li>
    </ul>
  </div>
</div>
</div>
<div class="d-flex flex-column justify-content-start" style="align-items: self-start;">
                  <h5 style="font-weight: bold;">{{ task.title }}</h5>

                  <p class="card-text" style="font-size: small;">{{ task.description }}</p></div>
                </div>
                <div class="card-footer text-body-secondary">
                  {{ task.date }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  
  </div>
</div>
<!-- Popup Window -->
<div name="fade">
  <div v-if="showModal" class="popup">
    <div class="popup-header">
      <button class="close-btn" @click="togglePopup">
        <i class="fa fa-times"></i>
      </button>
    </div>
    <div class="popup-content">
      <label for="title" >Title:</label>
      <input type="text" id="title" v-model="popupTitle" placeholder="Task">
      <label for="description">Description:</label>
      <textarea name="" id="description" v-model="popupDescription" cols="30" rows="5" placeholder="Task description"></textarea>
      <!-- New Priority Dropdown -->
      <label for="priority">Priority:</label>
      <select v-model="popupPriority" id="priority">
        <option value="low">Low</option>
        <option value="high">High</option>
      </select>
      <!-- End of New Priority Dropdown -->
      <button class="btn btn-primary mt-5" @click="addTask('todo'); closePopup()">Save</button>
    </div>
  </div>
</div>

<!-- Edit pop up window -->
<div v-if="showEditModal" class="popup">
  <div class="popup-header">
    <button class="close-btn" @click="closeEditModal">
      <i class="fa fa-times"></i>
    </button>
  </div>
  
  <div class="popup-content">
    <label for="editTitle">Title:</label>
    <input type="text" id="editTitle" v-model="editedTask.title" placeholder="Task">
    <label for="editDescription">Description:</label>
    <textarea name="" id="editDescription" v-model="editedTask.description" cols="30" rows="5"
      placeholder="Task description"></textarea>
    <!-- New Priority Dropdown -->
    <label for="editPriority">Priority:</label>
    <select v-model="editedTask.priority" id="editPriority">
      <option value="low">Low</option>
      <option value="high">High</option>
    </select><br>
    <!-- End of New Priority Dropdown -->
    <button class="btn btn-primary mt-5" @click="saveTask">Save</button>
  </div>
</div>

    </div>
  </div>
</template>



<script>
import axios from 'axios';

export default {
  name: 'home_comp',
  data() {
    return {
      sidebarWidth: '250px',
      dropdowns: {
        projects: false,
        members: false,
        contact: false,
      },
      todoTasks: [],
      inProgressTasks: [],
      doneTasks: [],
      showModal: false,
      showEditModal: false,
      popupTitle: '',
      popupDescription: '',
      popupPriority: 'low',
      editedTask: {},
    };
  },

  methods: {
    toggleNav() {
      this.sidebarWidth = this.sidebarWidth === '0' ? '250px' : '0';
    },
    redirectToProject1Dropdown() {
    // Programmatically navigate to Project 1 using the router
    this.$router.push('/project1');
  },

  toggleDropdownside(key) {
    // If the key is 'projects' and the dropdown is open, do nothing
    if (key === 'projects' && this.dropdowns.projects) {
      return;
    }

    // If the key is 'projects' and the dropdown is closed, redirect to 'project1' route
    if (key === 'projects' && !this.dropdowns.projects) {
      this.redirectToProject1Dropdown();
    } else {
      this.dropdowns[key] = !this.dropdowns[key];
    }
  },
  async fetchTasks() {
  try {
    // Use the token from localStorage for API requests
    const token = localStorage.getItem('token');

    // Check if the token exists and then set it in the "Authorization" header
    if (token) {
      // Set the base URL for your API
      axios.defaults.baseURL = 'http://172.16.4.18:8000';

      // Set the token in the "Authorization" header

      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      // If the token doesn't exist, you can handle it accordingly (e.g., redirect to the login page)
      console.warn('Token not found in localStorage. Redirect to login page.');
      // Handle the redirection to the login page or any other action as needed
      return;
    }

    // Log the API request payload before making the call
    console.log('API Request Payload:', {
      method: 'GET',
      url: 'http://172.16.4.18:8000/api/fetch-top-tasks/303',
      headers: axios.defaults.headers.common,
    });
console.log(token)
    // Make the API request to get tasks from the "tasks" endpoint
    // const response = await axios.get('http://172.16.4.18:8000/api/tasks', {
    const response = await axios.get('http://172.16.4.18:8000/api/fetch-top-tasks/303', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    // Process the response
    if (response.status === 200) {
      const allTasks = response.data;
      // Split the tasks into different columns based on their status
      console.log('Tasks fetched:', allTasks);

      return allTasks;
    } else {
      console.error('Failed to fetch tasks');
      // You can handle error scenarios here if needed
    }
  } catch (error) {
    console.error('Error fetching tasks:', error);
    // You can handle error scenarios here if needed
  }
},

    async logout() {
      try {
        // Make an API request to the logout endpoint
        const response = await axios.post('http://localhost:3000/logout');
        
        // Check if the logout was successful (You may need to adjust the response handling based on your backend implementation)
        if (response.status === 200) {
          console.log('Logout successful');
          // Redirect the user to the login page or perform any other necessary actions after logout
        } else {
          console.error('Logout failed');
        }
      } catch (error) {
        console.error('Error logging out:', error);
      }
    },
  
    async saveTask() {
    try {
      if (this.editedTask.title && this.editedTask.description) {
        const columnIndex = this.getColumnIndex(this.editedTask);
        let endpoint = '';
        let targetTasks = null;

        if (columnIndex === 'todo') {
          endpoint = `http://172.16.4.18:8000/api/tasks/${this.editedTask.id}`;
          targetTasks = this.todoTasks;
        } else if (columnIndex === 'inProgress') {
          endpoint = `http://localhost:3000/inprogress/${this.editedTask.id}`;
          targetTasks = this.inProgressTasks;
        } else if (columnIndex === 'done') {
          endpoint = `http://localhost:3000/done/${this.editedTask.id}`;
          targetTasks = this.doneTasks;
        }

        const response = await axios.put(endpoint, {
          title: this.editedTask.title,
          description: this.editedTask.description,
          date: this.editedTask.date,
          priority: this.editedTask.priority, // Add the priority field to the updated task
        });

        if (response.status === 200) {
          // Update the task in the corresponding task list
          if (targetTasks) {
            const updatedTaskIndex = targetTasks.findIndex((task) => task.id === this.editedTask.id);
            if (updatedTaskIndex !== -1) {
              targetTasks[updatedTaskIndex] = { ...this.editedTask };
            }
          }

          // Close the edit pop-up window after saving the task
          this.closeEditModal();

          console.log('Updated task:', this.editedTask);
        } else {
          console.error('Failed to update task');
        }
      } else {
        console.error('Title and description are required');
      }
    } catch (error) {
      console.error('Error updating task:', error);
    }
  },
    togglePopup() {
      this.showModal = !this.showModal;
    },
    closeEditModal() {
      this.showEditModal = false;
    },
    closePopup() {
      this.showModal = false;
    },
    async addTask(column) {
    const newTask = {
      id: Math.random().toString(36).substr(2, 9),
      title: this.popupTitle || 'New Task',
      description: this.popupDescription || 'New Task Description',
      date: 'Just now',
      priority: this.popupPriority, // New field for priority in the "Plus" button pop-up
      showDropdown: false,
    };

    try {
      const response = await axios.post(`http://localhost:3000/${column}`, newTask);
      if (response.status === 201) {
        // Add the new task to the corresponding task list
        this[column + 'Tasks'].push(response.data);

        // Clear the input fields after adding the task
        this.popupTitle = '';
        this.popupDescription = '';
        this.popupPriority = 'low'; // Reset the priority to 'low' for the next task

        console.log(`Added new task to "${column}" column:`, response.data);
      } else {
        console.error('Failed to add task');
      }
    } catch (error) {
      console.error('Error adding task:', error);
    }
  },
    dragStart(task, sourceColumn) {
      event.dataTransfer.setData('task', JSON.stringify(task));
      event.dataTransfer.setData('sourceColumn', sourceColumn);
    },
    async drop(targetColumn) {
      const task = JSON.parse(event.dataTransfer.getData('task'));
      const sourceColumn = event.dataTransfer.getData('sourceColumn');

      if (sourceColumn === targetColumn) {
        return;
      }

      // Remove the task from the source column
      const sourceTasks = this[sourceColumn + 'Tasks'];
      const updatedSourceTasks = sourceTasks.filter((t) => t.id !== task.id);
      this[sourceColumn + 'Tasks'] = updatedSourceTasks;

      // Update the task's status in the backend
      try {
        if (sourceColumn === 'todo') {
          await axios.delete(`http://172.16.4.18:8000/api/tasks/${task.id}`);
        } else if (sourceColumn === 'inProgress') {
          await axios.delete(`http://localhost:3000/inprogress/${task.id}`);
        } else if (sourceColumn === 'done') {
          await axios.delete(`http://localhost:3000/done/${task.id}`);
        }

        // Update the task's id and add it to the target column
        task.id = Date.now().toString(); // Generate a new id for the task
        if (targetColumn === 'todo') {
          await axios.post('http://172.16.4.18:8000/api/tasks', task);
        } else if (targetColumn === 'inProgress') {
          await axios.post('http://localhost:3000/inprogress', task);
        } else if (targetColumn === 'done') {
          await axios.post('http://localhost:3000/done', task);
        }

        console.log(`Moved task "${task.title}" from "${sourceColumn}" to "${targetColumn}"`);
      } catch (error) {
        console.error('Error updating task:', error);
      }

      // Fetch updated tasks from the backend
      this.fetchTasks();
    },
    openEditModal(task) {
      this.editedTask = { ...task };
      this.showEditModal = true;
    },
    deleteTask(task) {
      const columnIndex = this.getColumnIndex(task);
      if (columnIndex !== -1) {
        this[columnIndex + 'Tasks'] = this[columnIndex + 'Tasks'].filter((t) => t.id !== task.id);
      }
      console.log('Deleted task:', task);
    },
    getColumnIndex(task) {
      if (this.todoTasks.find((t) => t.id === task.id)) {
        return 'todo';
      } else if (this.inProgressTasks.find((t) => t.id === task.id)) {
        return 'inProgress';
      } else if (this.doneTasks.find((t) => t.id === task.id)) {
        return 'done';
      }
      return -1;
    },
  },
  mounted() {
    // Use the token from localStorage for API requests
    const token = localStorage.getItem('token');

    // Set the base URL for your API
    axios.defaults.baseURL = 'http://172.16.4.18:8000';

    // Check if the token exists and then set it in the "Authorization" header
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      // If the token doesn't exist, you can handle it accordingly (e.g., redirect to the login page)
      console.warn('Token not found in localStorage. Redirect to login page.');
      // Handle the redirection to the login page or any other action as needed
    }

 // Fetch tasks when the component is loaded

  this.fetchTasks()

      .then((allTasks) => {
        // Update the todoTasks data property with the fetched tasks
        // console.log(allTasks.tasks)
        console.log(allTasks)
        // this.todoTasks = allTasks.tasks;
      })
      .catch((error) => {
        console.error('Error fetching tasks:', error);
        // You can handle error scenarios here if needed
      });
    
 
  },

};
</script>


<style scoped>
body {
  font-family: 'Segoe UI';
  margin: 0;
  padding: 0;
}

.sidebar {
  height: 100%;
  width: 0;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  background-color: white;
  overflow-x: hidden;
  transition: 0.5s;
  border: 1px solid rgb(222, 220, 220);
}

.border-left {
  border-bottom: 1px solid rgb(222, 220, 220);
}

.navbar-border {
  border-bottom: 1px solid rgb(222, 220, 220);
  padding-bottom: 19px;
  width: 100%;
}

.sidebar-content {
  padding: 2px;
}

.sidebar a {
  padding: 8px 8px 8px 10px;
  text-decoration: none;
  font-size: 16px;
  color: black;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: 0.3s;
}

.sidebar a:hover {
  color: rgb(39, 39, 206);
}

.sidebar .closebtn {
  font-size: 20px;
  cursor: pointer;
  background-color: white;
  color: black;
  padding: 10px 15px;
  border: none;
  transition: transform 0.3s;
}

.sidebar .closebtn:hover {
  background-color: #bfbdbd;
  border-radius: 5px;
}

.sidebar .closebtn i {
  transition: transform 0.3s;
}

.sidebar .closebtn i.rotate180 {
  transform: rotate(180deg);
}

.openbtn {
  font-size: 20px;
  cursor: pointer;
  background-color: white;
  color: black;
  padding: 12px 15px;
  border: none;
  transition: transform 0.3s;
}

.openbtn-pad {
  padding-bottom: 19px;
  border-bottom: 1px solid rgb(222, 220, 220);
}

.openbtn:hover {
  background-color: #bfbdbd;
  border-radius: 5px;
}

.openbtn i {
  transition: transform 0.3s;
}

.openbtn.active i {
  transform: rotate(180deg);
}

#main {
  transition: margin-left 0.5s;
}

.sidebar-logo {
  width: 115px;
  margin-bottom: 19px;
  height: 53px;
}

.dropdown {
  padding-left: 40px;
}

.dropdown a {
  padding: 8px 8px 8px 32px;
}
.card-priority {
  font-size: 12px;
  font-weight: bold;
  text-transform: uppercase;
  padding: 3px 6px;
  border-radius: 3px;
  color: #fff;
}

.card-priority.high {
  background-color: #f8e1e1;
    width: 20%;
    height: 10%;
    color: #f14f4f;

}
.card-priority.low {

  background-color: #fff3df;
    color: rgba(255, 157, 0, 0.995);
  width: 20%;
  height: 10%;
}
.card-priority.completed {
  background-color: green;
}


.dropdown a:hover {
  color: rgb(39, 39, 206);
}

/* On smaller screens, where height is less than 450px, change the style of the sidenav (less padding and a smaller font size) */
@media screen and (max-height: 450px) {
  .sidebar {
    padding-top: 15px;
  }

  .sidebar a {
    font-size: 18px;
  }
}

.popup {
  /* Style for the popup window */
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 900px;
  height: 500px;
  background-color: #fff;
  border: 1px solid #ccc;
  z-index: 9999;
  border-radius: 10px;
  transition: transform 0.5s;
}
.title-pop label{
  display: block;
}
.title-pop input{
  display: block;
}
.title-pop label{
  display: block;
}
.title-pop input{
  display: block;
}

.popup-enter-active,
.popup-leave-active {
  transition: transform 0.5s;
}

.popup-enter {
  transform: translate(-50%, -50%) scale(0.9);
  opacity: 0;
}

.popup-leave-to {
  transform: translate(-50%, -50%) scale(0.9);
  opacity: 0;
}

.popup-header {
  display: flex;
  justify-content: flex-end;
}

.close-btn {
  background: none;
  border: none;
  padding: 5px;
  cursor: pointer;
}

.close-btn i {
  color: #999;
  font-size: 16px;
}

.popup-content {
  padding: 20px;
  width: 60%;
  margin: auto;
}
.popup-content input[type="text"],
.popup-content textarea,
.popup-content select
 {
  border-radius: 10px; 
  padding: 5px; 
  border: 1px solid black; 
  width: 70%;
}

.btn-primary {
  --bs-btn-font-weight: 600;
  --bs-btn-color: var(--bs-white);
  --bs-btn-bg: var(--bd-violet-bg);
  --bs-btn-border-color: var(--bd-violet-bg);
  --bs-btn-hover-color: var(--bs-black);
  --bs-btn-hover-bg: #6528e0;
  --bs-btn-hover-border-color: #6528e0;
  --bs-btn-focus-shadow-rgb: var(--bd-violet-rgb);
  --bs-btn-active-color: var(--bs-btn-hover-color);
  --bs-btn-active-bg: #5a23c8;
  --bs-btn-active-border-color: #5a23c8;
  background: linear-gradient(90deg, #2689EB 0.1%, #47E2FF 100.1%);
  box-shadow: 0px 10px 25px rgba(151, 195, 227, 0.5);
  border-radius: 9px;
  width: 70%;
}

.popup-content label {
  display: block; 
  margin-bottom: 5px; 
}

.popup-content textarea {
  resize: vertical; 
}



.project-section {
  display: flex;
  gap: 10px;
}

.column {
  flex: 1;
}

.card {
  background-color: #f4f4f4;
  border-radius: 4px;
  padding: 10px;
}

.task-list {
  min-height: 100px;
}

.task-card {
  padding: 8px;
  margin-bottom: 8px;
  background-color: #fff;
  border-radius: 10px;
  cursor: move;
}

.btn-add-task {
  color: #673dd1;
  font-size: 16px;
  padding: 0;
  cursor: pointer;
  width: 10%;
}

.fa-plus {
  vertical-align: middle;
  color: #673dd1;
}

.header-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>

