<script setup lang="ts">
defineProps<{ file?: File }>()

import { ref } from "vue"

const sourceFileInput = ref<HTMLInputElement | null>(null)
const xliffFileInput = ref<HTMLInputElement | null>(null)
const sourceFile = ref()
const xliffFile = ref()

function handleSourceFileChange() {
  const input = sourceFileInput.value?.files
  if (input) {
    sourceFile.value = input[0]
  } else {
    sourceFile.value = null
  }
}

function handleXliffFileChange() {
  const input = xliffFileInput.value?.files
  if (input) {
    xliffFile.value = input[0]
  } else {
    xliffFile.value = null
  }
}

async function uploadFiles() {
  //TODO: allow specifying this in form
  const targetLang = "es"
  const formData = new FormData()
  formData.append(sourceFile.value.name, sourceFile.value)
  formData.append(xliffFile.value.name, xliffFile.value)
  formData.append("target", targetLang)

  const blob: Blob = await $fetch('/api/merge', {
    method: 'POST',
    body: formData,
    responseType: "blob"
  })

  let filenameParts = sourceFile.value.name.split(/\./);
  const [filename, fileSuffix] = [filenameParts.slice(0, -1).join('.'), filenameParts.pop()];

  const a = document.createElement("a")
  a.download = `${filename}.${targetLang}.${fileSuffix}`
  a.href = window.URL.createObjectURL(blob)
  a.click()
}
</script>

<template>
  <h1>Merge Translation</h1>
  <div style="display: inline-flex; flex-direction: column;">
    <label>File
      <input accept=".docx,.xlsx,.pptx" ref="sourceFileInput" type="file" @change="handleSourceFileChange" />
    </label>
    <label>XLIFF
      <input accept=".xlf" ref="xliffFileInput" type="file" @change="handleXliffFileChange" />
    </label>
    <button :disabled="!(sourceFile && xliffFile)" @click="uploadFiles">Merge Translation</button>
    </div>
</template>
