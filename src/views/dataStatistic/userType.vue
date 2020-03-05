<template>
  <div class="data-statistic">
    <div class="cur-menu-name">
        <span>统计/用户类型统计</span>
    </div>
    <div class="table-search-wrapper">
      <div class="table-wrapper table-wrapper-border">
        <el-table :data="tableData" border style="width: 100%" :height="curHeight-160">
          <el-table-column prop="date" label="日期"></el-table-column>
          <el-table-column label="我要用工">
            <el-table-column prop="name" label="民营企业">
              <el-table-column prop="zip" label="新增"></el-table-column>
              <el-table-column prop="zip" label="累计"></el-table-column>
            </el-table-column>
            <el-table-column prop="name" label="工商联执常委">
              <el-table-column prop="zip" label="新增"></el-table-column>
              <el-table-column prop="zip" label="累计"></el-table-column>
            </el-table-column>
            <el-table-column prop="name" label="央企/国企">
              <el-table-column prop="zip" label="新增"></el-table-column>
              <el-table-column prop="zip" label="累计"></el-table-column>
            </el-table-column>
            <el-table-column prop="name" label="个体工商户">
              <el-table-column prop="zip" label="新增"></el-table-column>
              <el-table-column prop="zip" label="累计"></el-table-column>
            </el-table-column>
            <el-table-column prop="name" label="政府或事业单位">
              <el-table-column prop="zip" label="新增"></el-table-column>
              <el-table-column prop="zip" label="累计"></el-table-column>
            </el-table-column>
            <el-table-column prop="name" label="社会组织">
              <el-table-column prop="zip" label="新增"></el-table-column>
              <el-table-column prop="zip" label="累计"></el-table-column>
            </el-table-column>
          </el-table-column>
          <el-table-column label="我有工人">
            <el-table-column prop="name" label="地方政府">
              <el-table-column prop="zip" label="新增"></el-table-column>
              <el-table-column prop="zip" label="累计"></el-table-column>
            </el-table-column>
            <el-table-column prop="name" label="工商联">
              <el-table-column prop="zip" label="新增"></el-table-column>
              <el-table-column prop="zip" label="累计"></el-table-column>
            </el-table-column>
            <el-table-column prop="name" label="社会组织">
              <el-table-column prop="zip" label="新增"></el-table-column>
              <el-table-column prop="zip" label="累计"></el-table-column>
            </el-table-column>
            <el-table-column prop="name" label="人才中介机构">
              <el-table-column prop="zip" label="新增"></el-table-column>
              <el-table-column prop="zip" label="累计"></el-table-column>
            </el-table-column>
            <el-table-column prop="name" label="其他">
              <el-table-column prop="zip" label="新增"></el-table-column>
              <el-table-column prop="zip" label="累计"></el-table-column>
            </el-table-column>
          </el-table-column>
          <el-table-column label="我要出力">
            <el-table-column prop="name" label="法律咨询">
              <el-table-column prop="zip" label="新增"></el-table-column>
              <el-table-column prop="zip" label="累计"></el-table-column>
            </el-table-column>
            <el-table-column prop="name" label="交通运输">
              <el-table-column prop="zip" label="新增"></el-table-column>
              <el-table-column prop="zip" label="累计"></el-table-column>
            </el-table-column>
            <el-table-column prop="name" label="健康体检">
              <el-table-column prop="zip" label="新增"></el-table-column>
              <el-table-column prop="zip" label="累计"></el-table-column>
            </el-table-column>
            <el-table-column prop="name" label="面试测评">
              <el-table-column prop="zip" label="新增"></el-table-column>
              <el-table-column prop="zip" label="累计"></el-table-column>
            </el-table-column>
            <el-table-column prop="name" label="劳务派遣">
              <el-table-column prop="zip" label="新增"></el-table-column>
              <el-table-column prop="zip" label="累计"></el-table-column>
            </el-table-column>
            <el-table-column prop="name" label="保险服务">
              <el-table-column prop="zip" label="新增"></el-table-column>
              <el-table-column prop="zip" label="累计"></el-table-column>
            </el-table-column>
            <el-table-column prop="name" label="优惠政策">
              <el-table-column prop="zip" label="新增"></el-table-column>
              <el-table-column prop="zip" label="累计"></el-table-column>
            </el-table-column>
            <el-table-column prop="name" label="其他">
              <el-table-column prop="zip" label="新增"></el-table-column>
              <el-table-column prop="zip" label="累计"></el-table-column>
            </el-table-column>
          </el-table-column>
          <el-table-column label="备注说明"></el-table-column>
        </el-table>

      </div>

      <!-- <div id="main" style="width: 100%;height: 200px;"></div> -->
    </div>

  </div>
</template>

<script>
import {screenHeight,formatDate} from "../../utils/util"
export default {
  name: 'dataStatistic',
  components: {
  },
  data () {
    return {
      curHeight:0,
      myChart: '',
        tableData: [{
          date: '2016-05-03',
          name1: '',
          name1: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-07',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }],
      opinionData:
      [{"count":1,"province":"海南省"},{"count":1,"province":"云南省"},{"count":3,"province":"宁夏回族自治区"},{"count":5,"province":"吉林省"},{"count":5,"province":"黑龙江省"},{"count":6,"province":"甘肃省"},{"count":7,"province":"山西省"},{"count":12,"province":"贵州省"},{"count":12,"province":"陕西省"},{"count":12,"province":"广西壮族自治区"},{"count":13,"province":"湖北省"},{"count":14,"province":"福建省"},{"count":15,"province":"四川省"},{"count":21,"province":"浙江省"},{"count":23,"province":"内蒙古自治区"},{"count":24,"province":"天津市"},{"count":27,"province":"上海市"},{"count":30,"province":"河南省"},{"count":30,"province":"湖南省"},{"count":31,"province":"北京市"},{"count":31,"province":"辽宁省"},{"count":32,"province":"江西省"},{"count":32,"province":"重庆市"},{"count":34,"province":"广东省"},{"count":38,"province":"河北省"},{"count":39,"province":"安徽省"},{"count":72,"province":"山东省"},{"count":73,"province":"江苏省"}
      ]
    }
  },
  mounted () {
      
    this.curHeight=screenHeight()
    // this.init()
    
    // window.addEventListener('resize', () => {
    //   // 自动渲染echarts
    //   this.myChart.resize();
    // })

  },
  created () {
  },
  methods: {
    // init:function(){
    //   setTimeout(()=>{
    //         this.drawPie();
    //     })
    // },
    // drawPie(){
    //   this.myChart=this.echarts.init(document.getElementById('main'));
    //   let x=[],y=[]
    //   this.opinionData.forEach(item => {
    //     x.push(item.province)
    //     y.push(item.count)

    //   })
      
    //     var option = {
    //         title: {
    //             // text: 'ECharts 入门示例'
    //         },
    //         tooltip:{
    //             show: true,
    //             trigger: 'axis',
    //             axisPointer: {
    //                 type:'shadow',
    //             },
    //             backgroundColor: '#fff',
    //         },
    //         legend: {
    //             data:['省份']
    //         },
    //         xAxis: {
    //             data: x,
    //             axisLabel:{  
    //             interval:0,//横轴信息全部显示  
    //             rotate:-15,//-15度角倾斜显示  
    //             },
    //         },
    //         yAxis: {},
    //         series: [{
    //             name: '企业数',
    //             type: 'bar',
    //             data: y
    //         }]
    //     };

    //     // 使用刚指定的配置项和数据显示图表。
    //     this.myChart.setOption(option);
    // }

  }
	
}
</script>

<style lang="scss">
.data-statistic{
  .cur-menu-name{
    height:56px;
    padding:0 17px;
    background:rgba(255,255,255,1);
    span{
      font-size:18px;
      font-family:Microsoft YaHei;
      font-weight:400;
      color:rgba(38,38,38,1);
      line-height:56px;
      padding-left:10px;
      border-left:3px solid #0177D5
    }
  }
  
}

</style>
