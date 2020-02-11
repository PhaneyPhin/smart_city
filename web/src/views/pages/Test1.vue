<template>
  <table>
    <thead>
      <tr>
        <th v-for="(header,index) in response.header" :key="index">{{header}}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(data,index1) in response.data" :key="index1">
        <td v-for="(header1,index2) in response.header" :key="index2">{{data[header1]}}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  data: function() {
    return {
      response: {
        header: ["field_1", "field_2", "field_3"],
        data: [
          {
            field_1: 1,
            field_2: 3,
            field_3: 2
          }
        ]
      }
    };
  }
};
</script>

<style>
</style>
