<template>
  <div class="chart-container">
    <geo :height="'100%'" :width="'100%'" />
  </div>
</template>

<script>
import Geo from '@/components/Charts/GeoMap'

export default {
  name: 'GeoMap',
  components: { Geo }
}
</script>

<style scoped>
.chart-container{
  position: relative;
  width: 100%;
  height: calc(100vh - 84px);
}
</style>
