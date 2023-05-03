<template>
  <div class="form-check">
    <input type="checkbox" class="form-check-input" :required="required" :value="value" :name="name" :id="name" :checked="checked">
    <label class="form-check-label" :for="name">
      {{ label }}
    </label>
  </div>
</template>

<script>
export default {
  name: 'CheckInput',
  props: ["label", "required", "name", "checked"],
}
</script>