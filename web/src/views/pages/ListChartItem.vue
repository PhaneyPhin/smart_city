<template>
  <vue-draggable-resizable
    :w="charts.width"
    :h="charts.height"
    @dragging="onDrag"
    @resizing="onResize"
    :resizeable="resize"
    :parent="false"
    :onResizeStart="onResizeStartCallback"
    :onDragStart="onDragStartCallback"
  >
    <div class="vx-card h-full">
      <highcharts ref="chart" :key='index' :options="chartOptions" v-if="rerendercomponent"></highcharts>
    </div>
  </vue-draggable-resizable>
</template>

<script>
// import * as Highcharts from "highcharts";
import service from "@/service/service";
import Highcharts from 'highcharts'
import stockInit from 'highcharts/modules/stock'
import ListCharts from '@/service/chartsOption'
// stockInit(Highcharts)

stockInit(Highcharts);
export default {
  props: {
    index: {
      type: Number,
      required: true
    }
  },
  data: function() {
    return {
      i: 0,
      width: 500,
      height: 400,
      disabled:false,
      x: 0,
      rerender:true,
      y: 300,
      title: this.$store.state.list_charts[this.index].chart_title,
      rerendercomponent: true,
      resize: false,
      array_event:[],
      chartOptions: {}
    };
  },
  computed: {
    styles() {
      return {
        card1: {
          height: this.height + "px"
        }
      };
    },
    charts() {
      
      return this.$store.state.list_charts[this.index];
    }
  },
  beforeMount(){
    var chart=this.$store.state.list_charts[this.index];
    this.width=chart.width;
    this.height=chart.height;
  },
  async created() {
      //console.log('compoent created');
      
  },
  async mounted() {
    this.chartOptions={};
    console.log(this.chartOptions);
    //console.log(this.$refs)
    var chart_type_id=this.charts.chart_type_id;
    this.chartOptions={...ListCharts[chart_type_id].option};
    this.rerendercomponent=false;
    this.$nextTick(() => {
        this.rerendercomponent = true;
      });
    var me=this;
    //console.log(chart_type_id)
   if(chart_type_id==0){
        //console.log(1111)
          var connection = new WebSocket(this.$service.socket_host);
          connection.onopen=function(){
                //console.log('connecting')
          }
              connection.onmessage =  (message)=> {
                var data=(JSON.parse(message.data));
                //console.log(data.device_id, data);
                this.charts.series.forEach((item,index)=>{
                  if(item.device_id=='data_test1'){
                    // //console.log(this.chartOptions.device0.series);
                    
                    // this.chartOptions.series[0].data= [[this.chartOptions.series[0].data[0][0]==3?4:3]]
                  }else{
                    //console.log(11);
                   
                  }
                  if(item.device_id==data.device_id){
                    this.chartOptions.series[0].data=[[data[item.column_name]]];
                    console.log('data',this.chartOptions.series[0].data)
                  }else{

                  }
                })
                // if(data.device_id==item.device_id){
                //   //console.log(item.column_name,data[item.column_name])
                //    me.chartOptions.series[0].data=[[data[item.column_name]]];
                // }
                
               
           
            }
        //  this.charts.series.forEach((item,index)=>{
        //     //console.log(this.$store.state.array_event.indexOf('add'+item.device_id+item.column_name))
        //     var connection = new WebSocket(`${this.$service.socket_host}?device_id=${item.device_id}&columns=${item.column_name}`);
        //       connection.onopen=function(){
        //         //console.log('connecting')
        //       }
        //       connection.onerror = function (error) {
        //         //console.log(`can't connnect to websocket server`);
        //       };
        //       connection.onmessage =  (message)=> {
        //         var data=(JSON.parse(message.data));
        //         //console.log(data.device_id,item.column_name);
        //         if(data.device_id==item.device_id){
        //           //console.log(item.column_name,data[item.column_name])
        //            me.chartOptions.series[0].data=[[data[item.column_name]]];
        //         }
                
               
        //         // point.update(newVal);
        //     }
        //  });

    }
    

  },
  beforeDestroy(){
    var array_event=this.array_event;

  
  },
  methods: {
    onResize: function(x, y, width, height) {
      //console.log({ x, y, width, height });
      if (this.chartOptions.chart == undefined) {
        this.chartOptions.chart = {};
      }
      this.chartOptions.chart.height = height;
      this.rerendercomponent = false;
       var chart={...this.$store.state.list_charts[this.index]};
       chart.width=width;
       chart.height=height;
       chart.x=x;
       chart.y=y;
      this.$store.dispatch('update_list_chart',{
        index:this.index,
        obj:chart
      })
      this.$nextTick(() => {
        this.rerendercomponent = true;
      });
    },
    onDrag: function(x, y) {
      //console.log(x, y);
    },
    onResizeStartCallback(handle, ev) {
      return !this.disabled;
    },
    onDragStartCallback(handle,ev){
      return !this.disabled;
    }
  }
};
</script>

<style>
.vdr {
  -ms-touch-action: none;
  touch-action: none;
  border: none;
}
</style>
