<template>
  <form>
    <h3>Create Post</h3>
    <div class="form-group">
      <label for="title">Title</label>
      <input type="text" id="title" required maxlength="20" />
    </div>
    <div class="form-group">
      <label for="authorId">Author</label>
      <select id="authorId" required>
        <option></option>
      </select>
    </div>
    <div class="form-group">
      <label for="content">Content</label>
      <textarea for="content" rows="8" maxlength="200"></textarea>
    </div>

    <button type="submit">Submit</button>
  </form>
</template>

<script setup lang="ts"></script>

<style scoped>
.form-group {
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-bottom: 0.3rem;
  font-weight: bold;
}

input[type="text"] {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

input.is-invalid {
  border-color: red;
  box-shadow: 0 0 0 0.1rem rgba(255, 0, 0, 0.25);
}

.error-message {
  color: red;
  font-size: 0.875em;
  margin-top: 0.25rem;
  display: block;
}

button[type="submit"] {
  padding: 0.75rem 1.5rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
}

button[type="submit"]:hover {
  background-color: #0056b3;
}
</style>
