<template>
  <div class="w-full" style="height:5000px;position:relative">
    <v-template v-for="(item, index) of $store.state.list_charts" :key="index">
      <list-chart-item :index="index" />
    </v-template>
  </div>
</template>

<script>
import ListChartItem from "./ListChartItem";
export default {
  components: {
    "list-chart-item": ListChartItem
  },
  data: function() {
    return {
      i: 0,
      width: 300,
      height: 300,
      x: 0,
      y: 300
    };
  },
  computed: {
    styles() {
      return {
        card1: {
          height: this.height + "px"
        }
      };
    }
  },
  methods: {
    onResize: function(e) {
      console.log(e);
    },
    onDrag: function() {
      // console.log(this.i);
      // this.x = x;
      // this.y = y;
      console.log(e);
    },
    addDashboard() {
      this.list_charts.push({ title: "Hello world" });
    }
  }
};
</script>

<style></style>
