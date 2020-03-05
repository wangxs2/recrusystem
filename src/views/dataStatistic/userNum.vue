<template>
  <div class="data-statistic">
    <div class="cur-menu-name">
        <span>统计/用户数量统计</span>
    </div>
    <div class="table-search-wrapper">
      <!-- <div class="search-wrapper">
        <div class="search-input search-btn" @click="handleDownloadExcel">导出</div>
      </div> -->
      <div class="table-wrapper table-wrapper-border">
        <el-table :data="tableData" border style="width: 100%" :height="curHeight-160">
          <el-table-column prop="date" label="日期"></el-table-column>
          <el-table-column label="我要用工">
            <el-table-column prop="name" label="机构数">
              <el-table-column prop="newNeed" label="新增"></el-table-column>
              <el-table-column prop="totalNeed" label="累计"></el-table-column>
            </el-table-column>
            <el-table-column prop="name" label="岗位数">
              <el-table-column prop="newNeedTh" label="新增"></el-table-column>
              <el-table-column prop="toatlNeedTh" label="累计"></el-table-column>
            </el-table-column>
          </el-table-column>
          <el-table-column label="我有工人">
            <el-table-column prop="name" label="机构数">
              <el-table-column prop="newSupport" label="新增"></el-table-column>
              <el-table-column prop="totalSupport" label="累计"></el-table-column>
            </el-table-column>
            <el-table-column prop="name" label="岗位数">
              <el-table-column prop="newSupportTh" label="新增"></el-table-column>
              <el-table-column prop="toatlSupportTh" label="累计"></el-table-column>
            </el-table-column>
          </el-table-column>
          <el-table-column label="我要出力">
            <el-table-column prop="name" label="机构数">
              <el-table-column prop="newService" label="新增"></el-table-column>
              <el-table-column prop="totalService" label="累计"></el-table-column>
            </el-table-column>
            <el-table-column prop="name" label="岗位数">
              <el-table-column prop="newServiceTh" label="新增"></el-table-column>
              <el-table-column prop="totatlServiceTh" label="累计"></el-table-column>
            </el-table-column>
          </el-table-column>
          <el-table-column label="平台影响力">
            <el-table-column prop="name" label="浏览量">
              <el-table-column prop="newVisit" label="新增"></el-table-column>
              <el-table-column prop="totalVisit" label="累计"></el-table-column>
            </el-table-column>
            <el-table-column prop="name" label="点赞数">
              <el-table-column prop="newLike" label="新增"></el-table-column>
              <el-table-column prop="totalLike" label="累计"></el-table-column>
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
       this.$fetchGet("count/userNum").then(res => {
          this.tableData=res.data
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
            '我有工人',
            '',
            '',
            '',
            '我要出力',
            '',
            '',
            '',
            '平台影响力',
            '',
            '',
            '',
            '备注说明'
          ]
        ];
        const multiHeader2 = [
          [
            '',
            '机构数',
            '',
            '岗位数',
            '',
            '机构数',
            '',
            '岗位数',
            '',
            '机构数',
            '',
            '岗位数',
            '',
            '浏览量',
            '',
            '点赞量',
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
          ''
        ];
        const filterVal = this.headVal;
        const data = this.formatJson(filterVal, this.tableDataExecl);
       //进行所有表头的单元格合并，建议一行一行来，不然容易整乱
        const merges = [
          "A1:A3",
          'B1:E1',
          'F1:I1',
          'J1:M1',
          'N1:Q1',
          'R1:R3',
          'B2:C2',
          'D2:E2',
          'F2:G2',
          'H2:I2',
          'J2:K2',
          'L2:M2',
          'N2:O2',
          'P2:Q2',
        ];
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
