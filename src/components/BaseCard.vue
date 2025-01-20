<template>
    <div class="base-card">
      <slot></slot>  <!-- Hier kann benutzerdefinierter HTML-Code eingefügt werden -->
    </div>
  </template>
  
  <script>
  export default {
    name: 'BaseCard',
  }
  </script>
  
  <style scoped>
  .base-card {
    background-color: #011F35;
    border-radius: 16px;
    padding: 24px 32px;
  }
  </style>
  