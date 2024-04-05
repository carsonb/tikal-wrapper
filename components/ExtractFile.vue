<script setup lang="ts">
defineProps<{ file?: File }>()

import { ref } from "vue"

const fileInput = ref<HTMLInputElement | null>(null)
const file = ref()

function handleFileChange() {
  const input = fileInput.value?.files
  if (input) {
    file.value = input[0]
  } else {
    file.value = null
  }
}

async function uploadFile() {
  const formData = new FormData()
  formData.append(file.value.name, file.value)
  //TODO: allow specifying this in form
  formData.append("target", "es")
  
  const blob: Blob = await $fetch('/api/extract', {
    method: 'POST',
    body: formData,
    responseType: "blob"
  })

  const a = document.createElement("a")
  a.download = `${file.value.name}.xlf`
  a.href = window.URL.createObjectURL(blob)
  a.click()
}
</script>

<template>
  <h1>Create XLIFF</h1>
  <div style="display: inline-flex; flex-direction: column;">
    <input accept=".docx,.xlsx,.pptx" ref="fileInput" type="file" @change="handleFileChange" />
    <button :disabled="!file" @click="uploadFile">Get XLIFF</button>
  </div>
</template>
