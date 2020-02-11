<template>
  <div>
    <div class="w-full" style="text-align:right">
      <vs-button color="primary" @click="addDashboard()">add dashboard</vs-button>
    </div>
    <list-chart />

    <vs-popup class title="Chart Description" :active.sync="popupActive">
      <form>
        <vs-input
          :warning="errors.has('chart_title')"
          :warning-text="$t('chart title is required')"
          :label-placeholder="$t('chart title')"
          val-icon-warning="warning"
          v-validate="'required'"
          name="chart_title"
          v-model="chart_title"
          class="w-full mt-5"
          icon-pack="feather"
          icon="icon-user"
          icon-no-border
        />
        <vs-input
          :warning="errors.has('chart_name')"
          :warning-text="$t('chart name is required')"
          :label-placeholder="$t('chart name')"
          val-icon-warning="warning"
          v-validate="'required'"
          name="chart_name"
          v-model="chart_name"
          class="w-full mt-5"
          icon-pack="feather"
          icon="icon-user"
          icon-no-border
        />
        <div class="mt-5">
            <label >please select the chart</label>
            <select
              name="chart_type"
              class="vs-inputx vs-input--input normal"
              v-validate="'required'"
              v-model="chart_type"
            >
              <option
              
                v-for="(item,index) in chart_types"
                :value="item.chart_type_id"
                :key="index"
              >{{item.chart_type_name}}</option>/>
              <!-- <vs-select-item :value="2" :text="$t('Bar Chart')" /> -->
            </select>

        </div>
        <div class="mt-5"></div>
        
        <div class="mt-5 vx-row pl-5 pr-5">
          <vs-button type="filled" @click.prevent="addSeries()" class="mt-5 block">Add Serie</vs-button>
          <vs-button type="filled" color="danger" @click.prevent="removeSerie()" class="mt-5 ml-5 block">remove one</vs-button>
        </div>
        <div v-for="(serie,index_serie) of list_series" :key="index_serie" class="pl-10 pr-10">
            <div class="mt-5">
            <label >Device</label>
            <select
              name="chart_type"
              class="vs-inputx vs-input--input normal"
              v-validate="'required'"
              v-model="serie.device_id"
              @change="onDeviceChange(index_serie)"
            >
              <option
              
                v-for="(item,index) in devices"
                :value="item.device_id"
                :key="index"
              >{{item.device_name}}({{item.device_id}})</option>/>
              <!-- <vs-select-item :value="2" :text="$t('Bar Chart')" /> -->
            </select>
          </div>
            <label >Column</label>
            <select
              name="chart_type"
              class="vs-inputx vs-input--input normal"
              v-validate="'required'"
              v-model="serie.column_name"
            >
              <option
              
                v-for="(item,index) in serie.columns"
                :value="item.column_name"
                :key="index"
              >{{item.column_name}}</option>/>
              <!-- <vs-select-item :value="2" :text="$t('Bar Chart')" /> -->
          </select>
        </div>
        <vs-button type="filled" @click.prevent="submitForm" class="mt-5 block">Submit</vs-button>
      </form>
    </vs-popup>
  </div>
</template>

<script>
import ListChart from "./ListChart";
import { Validator } from "vee-validate";
import service from "@/service/service";
import ChartOptions from '@/service/chartsOption'
const dict = {
  custom: {
    chart_title: {
      required: "Please enter chart name",
      alpha: "Your first name may only contain alphabetic characters"
    },
    chart_name: {
      required: "Please enter your last name",
      alpha: "Your last name may only contain alphabetic characters"
    }
  }
};
export default {
  components: {
    "list-chart": ListChart
  },
  data: function() {
    return {
      chart_name: "",
      chart_title: "",
      popupActive: false,
      chart_type:"",
      chart_types: [],
      devices:[],
      columns:[[]],
      select1:"",
      columns:[],
      device:"",
      column_name:"",
      list_series:[]
    };
  },
  computed: {},
  async created() {
    // var chartTypeResponse = await service.postData(
    //   "dashboard/getchart_type",
    //   {}
    // );
    console.log(ChartOptions);
    this.chart_types = ChartOptions.map((item,index)=>{
      return {chart_type_id:index,chart_type_name:item.type_name};
    });
    var deviceResponse=await service.postData('device/getDeviceTest',{});
    this.devices=deviceResponse.data;


  },
  methods: {
    addDashboard() {
      this.popupActive = true;

      // this.$store.dispatch("push_list_charts", { title: "Hello world" });
    },
    submitForm() {
      this.$validator.validateAll().then(result => {
        if (result) {
          // if form have no errors

          this.$store.dispatch("push_list_charts", {
            chart_title: this.chart_title,
            chart_name: this.chart_name,
            chart_type_id: this.chart_type,
             width:500,
             height:300,
             x:0,
             y:300,
            series:this.list_series.map((item)=>{
              return {
                device_id:item.device_id,
                column_name:item.column_name
               
              }
            })
          });
          this.popupActive = false;
        } else {
          // form have errors
        }
      });
    },
    removeSerie(){
      if(this.list_series.length>0){
        this.list_series.pop();
      }
    },
    async onDeviceChange(index){
      // alert(index)
      var columResponse=await service.postData('device/getFieldDevice',{device_id:this.list_series[index].device_id});
      this.list_series[index].columns=columResponse.data;
    },
    addSeries(){
      this.list_series.push({device_id:"",column_name:"",columns:[]})
    },
    // async onEquipmentChange(index){
    //   // alert(index)
    //   console.log(this.list_series[index]);
    //  var columResponse=await service.postData('equipment/getFieldEquipment',{device_id:this.list_series[index].equipment});
    //   this.list_series[index].columns=columResponse.data;
      
    // }
  },
  watch:{
    async equipment(val){
      
    }
  }
};
</script>

<style>
iframe {
  border: 1px solid black;
  width: 500px;
  height: 500px;
}

.output {
  background: #eee;
}
.span-text-validation-warning {
  color: rgba(255, 159, 67, 1) !important;
}
</style>
