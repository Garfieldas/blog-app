<template>
  <main class="main">
        <form @submit.prevent="emit('submit')">
        <h1>Login</h1>
        <div class="form-group">
            <label for="email">Email</label>
            <input type="email" id="email" v-model="email">
        </div>
        <div class="form-group">
            <label for="password">Password</label>
            <input type="password" id="password" v-model="password">
        </div>
        <button type="submit">Submit</button>
    </form>
    
  </main>
</template>

<script setup lang="ts">

const email = defineModel('email');
const password = defineModel('password');
const emit = defineEmits(['submit'])
</script>

<style scoped>

.main {
  background-color: var(--gray);
  grid-column: 2 / 3;
  grid-row: 2 / 3;
  color: black;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 300px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

label {
  margin-bottom: 0.3rem;
  font-weight: 500;
  color: black;
}

input {
  padding: 0.6rem 0.8rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 0.9rem;
}

button {
  padding: 0.7rem;
  background-color: var(--blue);
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: var(--border);
}

@media (max-width: 925px) {

  .sidebar {
    position: fixed;
    top: 0;
    left: 0;
    width: 220px;
    height: 100vh;
    z-index: 1000;
    transform: translateX(-100%);
    transition: transform 0.3s ease;
  }

  .sidebar.show {
    transform: translateX(0);
  }

  .sidebar.hidden {
    transform: translateX(-100%);
  }

  .header {
    grid-column: 1 / 3;
    justify-content: space-between;
    align-items: center;
    padding: 0 1rem;
    position: fixed;
    padding: 1rem;
    width: 100%;
  }

  .header-right img {
    display: none;
  }

  .nav-button {
    display: block;
  }

  #search {
    width: clamp(175px, 50%, 300px)
  }

  .header-left {
    margin: 0 auto;
    text-align: center;
  }
  .main {
    grid-column: 1 / 3;
  }
}
</style>