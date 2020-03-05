<template>
  <div class="data-statistic">
    <div class="cur-menu-name">
        <span>统计/用户类型统计</span>
    </div>
    <div class="table-search-wrapper">
      <!-- <div class="search-wrapper">
        <div class="search-input search-btn" @click="handleDownloadExcel">导出</div>
      </div> -->
      <div class="table-wrapper table-wrapper-border">
        <el-table :data="tableData" border style="width: 100%" :height="curHeight-160">
          <el-table-column prop="date" label="日期"></el-table-column>
          <el-table-column label="我要用工">
            <el-table-column prop="name" label="民营企业">
              <el-table-column prop="newEntAMy" label="新增"></el-table-column>
              <el-table-column prop="totalEntAMy" label="累计"></el-table-column>
            </el-table-column>
            <el-table-column prop="name" label="工商联执常委">
              <el-table-column prop="newEntAGsl" label="新增"></el-table-column>
              <el-table-column prop="totalEntAGsl" label="累计"></el-table-column>
            </el-table-column>
            <el-table-column prop="name" label="央企/国企">
              <el-table-column prop="newEntAGq" label="新增"></el-table-column>
              <el-table-column prop="totalEntAGq" label="累计"></el-table-column>
            </el-table-column>
            <el-table-column prop="name" label="个体工商户">
              <el-table-column prop="newEntAGt" label="新增"></el-table-column>
              <el-table-column prop="totalEntAGt" label="累计"></el-table-column>
            </el-table-column>
            <el-table-column prop="name" label="政府或事业单位">
              <el-table-column prop="newEntAZf" label="新增"></el-table-column>
              <el-table-column prop="totalEntAZf" label="累计"></el-table-column>
            </el-table-column>
            <el-table-column prop="name" label="社会组织">
              <el-table-column prop="newEntASh" label="新增"></el-table-column>
              <el-table-column prop="totalEntASh" label="累计"></el-table-column>
            </el-table-column>
          </el-table-column>
          <el-table-column label="我有工人">
            <el-table-column prop="name" label="地方政府">
              <el-table-column prop="newEntBDf" label="新增"></el-table-column>
              <el-table-column prop="totalEntBDf" label="累计"></el-table-column>
            </el-table-column>
            <el-table-column prop="name" label="工商联">
              <el-table-column prop="newEntBGsl" label="新增"></el-table-column>
              <el-table-column prop="totalEntBGsl" label="累计"></el-table-column>
            </el-table-column>
            <el-table-column prop="name" label="社会组织">
              <el-table-column prop="newEntBSh" label="新增"></el-table-column>
              <el-table-column prop="totalEntBSh" label="累计"></el-table-column>
            </el-table-column>
            <el-table-column prop="name" label="人才中介机构">
              <el-table-column prop="newEntBRc" label="新增"></el-table-column>
              <el-table-column prop="totalEntBRc" label="累计"></el-table-column>
            </el-table-column>
            <el-table-column prop="name" label="其他">
              <el-table-column prop="newEntBQt" label="新增"></el-table-column>
              <el-table-column prop="totalEntBQt" label="累计"></el-table-column>
            </el-table-column>
          </el-table-column>
          <el-table-column label="我要出力">
            <el-table-column prop="name" label="法律咨询">
              <el-table-column prop="newEntCFl" label="新增"></el-table-column>
              <el-table-column prop="totalEntCFl" label="累计"></el-table-column>
            </el-table-column>
            <el-table-column prop="name" label="交通运输">
              <el-table-column prop="newEntCJt" label="新增"></el-table-column>
              <el-table-column prop="totalEntCJt" label="累计"></el-table-column>
            </el-table-column>
            <el-table-column prop="name" label="健康体检">
              <el-table-column prop="newEntCJk" label="新增"></el-table-column>
              <el-table-column prop="totalEntCJk" label="累计"></el-table-column>
            </el-table-column>
            <el-table-column prop="name" label="面试测评">
              <el-table-column prop="newEntCMs" label="新增"></el-table-column>
              <el-table-column prop="totalEntCMs" label="累计"></el-table-column>
            </el-table-column>
            <el-table-column prop="name" label="劳务派遣">
              <el-table-column prop="newEntCLw" label="新增"></el-table-column>
              <el-table-column prop="totalEntCLw" label="累计"></el-table-column>
            </el-table-column>
            <el-table-column prop="name" label="保险服务">
              <el-table-column prop="newEntCBx" label="新增"></el-table-column>
              <el-table-column prop="totalEntCBx" label="累计"></el-table-column>
            </el-table-column>
            <el-table-column prop="name" label="优惠政策">
              <el-table-column prop="newEntCYh" label="新增"></el-table-column>
              <el-table-column prop="totalEntCYh" label="累计"></el-table-column>
            </el-table-column>
            <el-table-column prop="name" label="其他">
              <el-table-column prop="newEntCQt" label="新增"></el-table-column>
              <el-table-column prop="totalEntCQt" label="累计"></el-table-column>
            </el-table-column>
          </el-table-column>
          <el-table-column label="备注说明" prop="remark"></el-table-column>
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
      tableData: [],
      tableDataExecl:[]
    }
  },
  mounted () {
      
    this.curHeight=screenHeight()

  },
  created () {
    this.getTableData()
  },
  methods: {
    getTableData(){
       this.$fetchGet("count/specificType").then(res => {
          this.tableData=res
          if (this.tableData&&this.tableData.length>0){
            this.tableData.forEach(item => {
              item.date=formatDate(item.date)
            })
          }
      })
    },
    handleDownloadExcel() {
      // this.downloadLoading = true
      import("@/vendor/Export2Excel1").then(excel => {
        const multiHeader = [
          [
            '日期',
            '我要用工',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '我有工人',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '我要出力',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '备注说明'
          ]
        ];
        const multiHeader2 = [
          [
            '',
            '民营企业',
            '',
            '工商联执常委',
            '',
            '央企/国企',
            '',
            '个体工商户',
            '',
            '政府或事业单位',
            '',
            '社会组织',
            '',
            '地方政府',
            '',
            '工商联',
            '',
            '社会组织',
            '',
            '人才中介机构',
            '',
            '其他',
            '',
            '法律咨询',
            '',
            '交通运输',
            '',
            '健康体检',
            '',
            '面试测评',
            '',
            '劳务派遣',
            '',
            '保险服务',
            '',
            '优惠政策',
            '',
            '其他',
            '',
            '',
          ]
        ];
        const tHeader = [
          "",
          "新增",
          "累计",
          "新增",
          "累计",
          "新增",
          "累计",
          "新增",
          "累计",
          "新增",
          "累计",
          "新增",
          "累计",
          "新增",
          "累计",
          "新增",
          "累计",
          "新增",
          "累计",
          "新增",
          "累计",
          "新增",
          "累计",
          "新增",
          "累计",
          "新增",
          "累计",
          "新增",
          "累计",
          "新增",
          "累计",
          "新增",
          "累计",
          "新增",
          "累计",
          "新增",
          "累计",
          "新增",
          "累计",
          ''
        ];
        const filterVal = this.headVal;
        const data = this.formatJson(filterVal, this.tableDataExecl);
       //进行所有表头的单元格合并，建议一行一行来，不然容易整乱
        const merges = [
          "A1:A3",
          'B1:M1',
          'N1:W1',
          'X1:AM1',
          'AN1:AN3',
          'B2:C2',
          'D2:E2',
          'F2:G2',
          'H2:I2',
          'J2:K2',
          'L2:M2',
          'N2:O2',
          'P2:Q2',
          'R2:S2',
          'T2:U2',
          'V2:W2',
          'X2:Y2',
          'Z2:AA2',
          'AB2:AC2',
          'AD2:AE2',
          'AF2:AG2',
          'AH2:AI2',
          'AJ2:AK2',
          'AL2:AM2',
        ]
        //  const merges = ['A1:A2', 'B1:B2', 'C1:I2','J1:P2']
 
        excel.export_json_to_excel({
          multiHeader,//这里是第一行的表头
          multiHeader2,//这里是第二行的表头
          header: tHeader,//这里应该是算第三行的表头
          data,
          merges,
          filename: curDataTime()+"导出记录",
            autoWidth: true,
        });
      });
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v =>
        filterVal.map(j => {
          if (j === "timestamp") {
            return parseTime(v[j]);
          } else {
            return v[j];
          }
        })
      );
    },


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
