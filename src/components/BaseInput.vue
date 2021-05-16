<template>
  <label>{{ label }}</label>
  <input
    v-bind="$attrs"
    :placeholder="label"
    class="field"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
  />
  <div>{{ modelValue }} = this is text inside BaseInput component</div>
</template>

<script>
export default {
  name: 'BaseInput',
  props: {
    label: {
      type: String,
      default: 'Type here...',
    },
    modelValue: {
      type: [String, Number],
      default: '',
    },
  },
}
</script>

<style scoped></style>
