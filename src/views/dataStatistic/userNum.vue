<template>
  <div class="data-statistic">
    <div class="cur-menu-name">
        <span>统计/用户数量统计</span>
    </div>
    <div class="table-search-wrapper">
      <div class="search-wrapper">
        <div class="search-input">
          <span>起始时间-结束时间:</span>
          <el-date-picker
            v-model="startEndTate"
            type="daterange"
            value-format="yyyy-MM-dd"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </div>
        <div class="search-input search-btn" @click="search">搜索</div>
        <div class="search-input search-btn" @click="handleDownloadExcel">导出</div>
      </div>
      <div class="table-wrapper table-wrapper-border">
        <el-table :data="tableData" ref="table" border style="width: 100%" :height="curHeight">
          <el-table-column prop="date" label="日期">
            <!-- <template slot-scope="scope">
              <div v-if="scope.row.date">{{scope.row.date.substring(0,10)}}</div>
            </template> -->

          </el-table-column>
          <el-table-column label="我要用工">
            <el-table-column prop="name" label="机构数">
              <el-table-column prop="newNeed" label="新增"></el-table-column>
              <el-table-column prop="totalNeed" label="累计"></el-table-column>
            </el-table-column>
            <el-table-column prop="name" label="岗位数">
              <el-table-column prop="newNeedTh" label="新增"></el-table-column>
              <el-table-column prop="totalNeedTh" label="累计"></el-table-column>
            </el-table-column>
          </el-table-column>
          <el-table-column label="我有工人">
            <el-table-column prop="name" label="机构数">
              <el-table-column prop="newSupport" label="新增"></el-table-column>
              <el-table-column prop="totalSupport" label="累计"></el-table-column>
            </el-table-column>
            <el-table-column prop="name" label="岗位数">
              <el-table-column prop="newSupportTh" label="新增"></el-table-column>
              <el-table-column prop="totalSupportTh" label="累计"></el-table-column>
            </el-table-column>
          </el-table-column>
          <el-table-column label="我要出力">
            <el-table-column prop="name" label="机构数">
              <el-table-column prop="newService" label="新增"></el-table-column>
              <el-table-column prop="totalService" label="累计"></el-table-column>
            </el-table-column>
            <el-table-column prop="name" label="项目数">
              <el-table-column prop="newServiceTh" label="新增"></el-table-column>
              <el-table-column prop="totalServiceTh" label="累计"></el-table-column>
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
import {screenHeight,formatDate,curDataTime,getCurrentMonthFirst,getCurrentMonthLast} from "../../utils/util"
export default {
  name: 'dataStatistic',
  components: {
  },
  data () {
    return {
      curHeight:null,
      startEndTate:[getCurrentMonthFirst(),getCurrentMonthLast()],
      params:{},
      myChart: '',
      tableData: [],
      tableDataExecl:[]
    }
  },
  mounted () {
      
    // this.curHeight=screenHeight()
    this.curHeight = window.innerHeight - this.$refs.table.$el.offsetTop - 30;
    let searchData = JSON.parse(sessionStorage.getItem("searchData"))
    if (searchData){
      this.params=searchData
      if (searchData.startDate&&searchData.endDate){

        this.startEndTate=[searchData.startDate,searchData.endDate]
      } else {
        this.startEndTate=[]
      }
      this.getTableData(this.params)
    } else {
      this.params={
        startDate:this.startEndTate[0],
        endDate:this.startEndTate[1],
      }
      this.getTableData(this.params)
    }
  },
  created () {
    // this.getTableData()
  },
  methods: {
    search(){
      this.tableData=[]
      if (this.startEndTate&&this.startEndTate.length>0){
        this.params.startDate=this.startEndTate[0]
        this.params.endDate=this.startEndTate[1]
      } else {
        this.params={}
      }
      
      this.getTableData(this.params)
      sessionStorage.setItem("searchData",JSON.stringify(this.params))
    },
    getTableData(params){
       this.$fetchGet("count/userNum",params).then(res => {
          this.tableData=res.data
          if (this.tableData&&this.tableData.length>0){
            this.tableData.forEach(item => {
              if (item.date){

                // item.date=formatDate(item.date)
                item.date=item.date.substring(5,10)
                item.date=item.date.split("-")
                var monthDete='',datyDete=''
                if (item.date[0]>=10){
                  monthDete=item.date[0]
                } else {
                  monthDete=item.date[0].substring(1,3)
                }
                if (item.date[1]>=10){
                  datyDete=item.date[1]
                } else {
                  datyDete=item.date[1].substring(1,3)
                }
                item.date=monthDete+'月'+datyDete+'日'
              }
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
        const filterVal = [ 'date',"newNeed", 'totalNeed', 'newNeedTh', 'totalNeedTh', 'newSupport', 'totalSupport', 'newSupportTh', 'totalSupportTh', 'newService','totalService','newServiceTh','totalServiceTh','newVisit','totalVisit','newLike','totalLike','remark']
        const data = this.formatJson(filterVal, this.tableData);
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
          if (j === 'date') {
            if (v[j]){
              v[j]=v[j].substring(0,10)
            }
            return v[j]
          }
          return v[j]
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
